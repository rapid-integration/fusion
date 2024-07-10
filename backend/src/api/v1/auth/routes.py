from typing import Any

from fastapi import APIRouter, HTTPException, status
from starlette.responses import JSONResponse

from src.api.deps import OAuth2Form, TransactionalSession
from src.api.v1.auth.schemas import TokenPayload, UserCreate
from src.api.v1.auth.service import (
    create_user,
    get_user_by_email,
    is_email_registered,
)
from src.core.config import settings
from src.core.security import create_access_token, decode_access_token, is_valid_password
from src.emails.service import generate_user_verification_email, send_email

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


@router.post("/verify-user")
async def send_email_to_verify_user(email_to: str, session: TransactionalSession) -> Any:
    user = get_user_by_email(session, email_to)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if user.is_verified:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "Email already verified")
    token = create_access_token(email_to, expire=settings.EMAIL_RESET_TOKEN_EXPIRE_MINUTES)
    message = generate_user_verification_email(email_to, token, settings.EMAIL_RESET_TOKEN_EXPIRE_MINUTES)
    await send_email(message, "verification-email.html")
    return {"detail": "Email has been sent"}


@router.get("/verify-user")
async def verify_user_by_token(token: str, session: TransactionalSession) -> dict:
    email = decode_access_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    user = get_user_by_email(session, email)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    user.is_verified = True
    session.commit()
    return {"detail": "Email verified"}