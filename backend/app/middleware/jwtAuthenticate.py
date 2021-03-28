import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from backend.app.models.user import User, User_Pydantic

JWT_SECRET = 'myjwtsecret'


async def authenticate_and_generate_token(username, password):
    user = await authenticate_user(username, password)
    if not user:
        return {'error': 'invalid credentials'}
    user_obj = await User_Pydantic.from_tortoise_orm(user)
    token = jwt.encode(user_obj.dict(), JWT_SECRET)
    return {'access token': token, 'token_type': 'bearer'}


async def authenticate_user(username: str, password: str):
    user = await User.get(username=username)
    if not user:
        return False
    if not user.verify_password(password):
        return False
    return user
