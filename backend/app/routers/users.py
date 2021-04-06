import jwt
from backend.app.models.user import User, User_Pydantic, UserIn_Pydantic
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends
from tortoise.contrib.fastapi import HTTPNotFoundError
from passlib.hash import bcrypt
from backend.app.middleware.jwtAuthenticate import authenticate_and_generate_token

router = APIRouter(tags=['User'])


@router.post('/user/create', response_model=User_Pydantic)
async def create_user(user: UserIn_Pydantic):
    user_obj = User(username=user.username, password_hash=bcrypt.hash(user.password_hash), email=user.email)
    await user_obj.save()
    return await User_Pydantic.from_tortoise_orm(user_obj)


@router.post('/login')
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return await authenticate_and_generate_token(form_data.username, form_data.password)
