from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status

from src.api.deps import Session
from src.api.v1.auth.deps import PasswordBearer
from src.api.v1.auth.schemas import JWT
from src.api.v1.users.models import User
from src.core.config import settings


def __get_current_user(session: Session, raw: PasswordBearer) -> User:
    try:
        data = JWT(**jwt.decode(raw, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]))
    except Exception:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Failed to verify credentials")

    user = session.get(User, data.sub)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if not user.is_active:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Inactive user")
    return user


CurrentUser = Annotated[User, Depends(__get_current_user)]
