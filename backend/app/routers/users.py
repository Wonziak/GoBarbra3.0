from backend.app.models.user import User, User_Pydantic, UserIn_Pydantic
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends
from passlib.hash import bcrypt
from backend.app.middleware.jwt_authenticate import authenticate_and_generate_token
from backend.app.middleware.user_authentication import get_current_user

router = APIRouter(tags=['User'])


@router.post('/user/create', response_model=User_Pydantic)
async def create_user(user: UserIn_Pydantic):
    user_obj = User(username=user.username, password_hash=bcrypt.hash(user.password_hash), email=user.email)
    await user_obj.save()
    return await User_Pydantic.from_tortoise_orm(user_obj)


@router.post('/login')
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return await authenticate_and_generate_token(form_data.username, form_data.password)


@router.get('/user/me', response_model=User_Pydantic)
async def get_user(user: User_Pydantic = Depends(get_current_user)):
    return user
