import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import HTTPException, status
from backend.app.models.user import User, User_Pydantic
from datetime import datetime, timedelta

JWT_SECRET = 'myjwtsecret'


async def authenticate_and_generate_token(username, password):
    user = await authenticate_user(username, password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='invalid username or password')
    user_obj = await User_Pydantic.from_tortoise_orm(user)
    payload = {
        'id': user_obj.id,
        'email': user_obj.email,
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow()
    }
    token = jwt.encode(payload, JWT_SECRET)
    return {'access token': token, 'token_type': 'bearer'}


async def authenticate_user(username: str, password: str):
    try:
        user = await User.get(username=username)
        if not user:
            raise Exception
        if not user.verify_password(password):
            raise Exception
        return user
    except Exception:
        return False

# async def get_user_from_header(*,authorization: str = Header(None)) -> User: