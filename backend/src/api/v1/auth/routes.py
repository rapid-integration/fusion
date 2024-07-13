from typing import Any

from fastapi import APIRouter, HTTPException, status

from src.api.deps import OAuth2Form, TransactionalSession
from src.api.v1.auth.emails import send_user_verification_message
from src.api.v1.auth.schemas import TokenPayload, UserCreate, UserEmail
from src.api.v1.auth.service import (
    create_user,
    get_user_by_email,
    is_email_registered,
    verify_user,
)
from src.core.security import create_access_token, decode_access_token, is_valid_password

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=TokenPayload)
async def register(user_create_model: UserCreate, session: TransactionalSession) -> Any:
    if is_email_registered(session, user_create_model.email):
        raise HTTPException(status.HTTP_409_CONFLICT, "Email already registered")

    user = create_user(session, user_create_model)
    access_token = create_access_token(user.id)
    return access_token


@router.post("/login", response_model=TokenPayload)
async def login(form: OAuth2Form, session: TransactionalSession) -> Any:
    email = form.username  # The OAuth2 spec requires the exact field name `username`.
    user = get_user_by_email(session, email)

    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if not is_valid_password(form.password, user.password):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect password")
    if not user.is_active:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Inactive user")

    access_token = create_access_token(user.id)
    return access_token


@router.post("/verify")
async def request_user_verification(schema: UserEmail, session: TransactionalSession) -> Any:
    user = get_user_by_email(session, schema.email)

    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if user.is_verified:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "Email already verified")

    await send_user_verification_message(schema.email)

    return {"detail": "Email has been sent"}


@router.get("/verify")
async def confirm_user_verification(token: str, session: TransactionalSession) -> Any:
    email = decode_access_token(token)
    if not email:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Invalid token")
    user = get_user_by_email(session, email)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")

    verify_user(session, user)

    return {"detail": "Email verified"}
