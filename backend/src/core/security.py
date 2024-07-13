from datetime import datetime, timedelta, timezone

import jwt
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext

from src.api.v1.auth.schemas import JWTPayload, TokenPayload
from src.core.config import settings

__crypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(subject: int | str, minutes: int = settings.ACCESS_TOKEN_EXPIRE_MINUTES) -> TokenPayload:
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=minutes)
    to_encode = JWTPayload(exp=expires_at, sub=subject)
    encoded_jwt = jwt.encode(to_encode.model_dump(), settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return TokenPayload(access_token=encoded_jwt, expires_at=expires_at)


def decode_access_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        data = JWTPayload(**payload)
        return str(data.sub)
    except InvalidTokenError:
        return None


def is_valid_password(plain_password: str, hashed_password: str) -> bool:
    return __crypt_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return __crypt_context.hash(password)
