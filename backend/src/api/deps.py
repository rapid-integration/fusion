from typing import Annotated, Generator

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from src.api.v1.auth.models import User
from src.api.v1.auth.schemas import JWTPayload
from src.core.config import settings
from src.core.db import ENGINE

oauth2_bearer = OAuth2PasswordBearer("api/v1/auth/login/")


def get_session() -> Generator[Session, None, None]:
    session = Session(ENGINE)
    try:
        yield session
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


TransactionalSession = Annotated[Session, Depends(get_session)]
OAuth2Token = Annotated[str, Depends(oauth2_bearer)]
OAuth2Form = Annotated[OAuth2PasswordRequestForm, Depends()]


def get_current_user(session: TransactionalSession, token: OAuth2Token) -> User:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        data = JWTPayload(**payload)
    except Exception:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Could not validate credentials")

    user = session.get(User, data.sub)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if not user.is_active:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Inactive user")
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
