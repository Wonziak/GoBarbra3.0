import jwt
from backend.app.models.user import User, User_Pydantic, UserIn_Pydantic
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import HTTPException, APIRouter, Depends
from tortoise.contrib.fastapi import HTTPNotFoundError
from passlib.hash import bcrypt
from backend.app.middleware.jwtAuthenticate import authenticate_and_generate_token

router = APIRouter()


async def authenticate_user(username: str, password: str):
    user = await User.get(username=username)
    if not user:
        return False
    if not user.verify_password(password):
        return False
    return user


@router.post('/user/create', response_model=User_Pydantic)
async def create_user(user: UserIn_Pydantic):
    user_obj = User(username=user.username, password_hash=bcrypt.hash(user.password_hash), email=user.email)
    await user_obj.save()
    return await User_Pydantic.from_tortoise_orm(user_obj)


@router.post('/token')
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends()):
    return await authenticate_and_generate_token(form_data.username, form_data.password)
