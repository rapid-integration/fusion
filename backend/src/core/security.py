from datetime import datetime, timedelta, timezone

import jwt
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext

from src.api.v1.auth.schemas import JWTPayload
from src.core.config import settings

__crypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(subject: int | str, expire=settings.ACCESS_TOKEN_EXPIRE_MINUTES) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=expire)
    to_encode = JWTPayload(exp=expires_at, sub=subject)
    encoded_jwt = jwt.encode(to_encode.model_dump(), settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str):
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
        return str(decoded_token["sub"])
    except InvalidTokenError:
        return None


def is_valid_password(plain_password: str, hashed_password: str) -> bool:
    return __crypt_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return __crypt_context.hash(password)
