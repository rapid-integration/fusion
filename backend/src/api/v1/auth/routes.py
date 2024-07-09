from typing import Any

from fastapi import APIRouter, HTTPException, status

from src.api.deps import OAuth2Form, TransactionalSession
from src.api.v1.auth.schemas import TokenPayload, UserCreate
from src.api.v1.auth.service import (
    create_user,
    get_user_by_email,
    is_email_registered,
)
from src.core.config import settings
from src.core.security import create_access_token, decode_access_token, is_valid_password
from src.email.service import generate_verify_user_email_email, send_email

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=TokenPayload)
def register(user_create_model: UserCreate, session: TransactionalSession) -> Any:
    if is_email_registered(session, user_create_model.email):
        raise HTTPException(status.HTTP_409_CONFLICT, "Email already registered")

    user = create_user(session, user_create_model)
    access_token = create_access_token(user.id)
    return TokenPayload(access_token=access_token)


@router.post("/login", response_model=TokenPayload)
def login(form: OAuth2Form, session: TransactionalSession) -> Any:
    email = form.username  # The OAuth2 spec requires the exact field name `username`.
    user = get_user_by_email(session, email)

    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if not is_valid_password(form.password, user.password):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect password")
    if not user.is_active:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Inactive user")

    access_token = create_access_token(user.id)
    return TokenPayload(access_token=access_token)


@router.post("/verify-email")
async def verify_email(email: str, session: TransactionalSession) -> Any:
    email = str(email)
    user = get_user_by_email(session, email)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if user.is_verified:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "Email already verified")
    token = create_access_token(email, expire=settings.EMAIL_RESET_TOKEN_EXPIRE_MINUTES)
    message = generate_verify_user_email_email(email, token, settings.EMAIL_RESET_TOKEN_EXPIRE_MINUTES)
    ans = await send_email(message, "verify_email.html")
    return ans


@router.get("/verify-user")
async def verify_user(token: str, session: TransactionalSession):
    email = decode_access_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    user = get_user_by_email(session, email)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    user.is_verified = True
    session.commit()
    return {"detail": "Email verified"}