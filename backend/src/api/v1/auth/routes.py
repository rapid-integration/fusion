from typing import Any

from fastapi import APIRouter, HTTPException, status

from src.api.deps import OAuth2Form, TransactionalSession
from src.api.v1.auth.emails import send_user_verification_message, send_reset_password_message
from src.api.v1.auth.schemas import TokenPayload, UserCreate, UserEmail, VerifyUser, SuccessVerifyMessage, NewPassword
from src.api.v1.auth.service import (
    create_user,
    get_user_by_email,
    is_email_registered, verify_user, reset_password,
)
from src.api.v1.auth.verify_codes import check_verify_code
from src.core.security import create_access_token, is_valid_password

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
def verify(schema: VerifyUser) -> Any:
    accept_code = check_verify_code(schema.email, schema.code)

    if accept_code is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Code for this email not found")
    if not accept_code:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "The code isn't accepted")

    return SuccessVerifyMessage()


@router.post("/verify-email")
async def request_email_verification(schema: UserEmail, session: TransactionalSession) -> Any:
    user = get_user_by_email(session, schema.email)

    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if not user.is_active:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "User isn't active")
    if user.is_verified:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "Email already verified")

    await send_user_verification_message(schema.email)
    return {"detail": "Email has been sent"}


@router.patch("/verify-email")
def verify_email(schema: VerifyUser, session: TransactionalSession) -> Any:
    email = schema.email

    if not email:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Invalid email")
    user = get_user_by_email(session, email)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")

    res = verify(schema)
    if isinstance(res, SuccessVerifyMessage):
        verify_user(session, user)
        return {"detail": "Email verified"}

    return res


@router.post("/reset-password")
async def recovery_password(schema: UserEmail, session: TransactionalSession) -> Any:
    user = get_user_by_email(session, schema.email)

    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if not user.is_active:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "User isn't active")

    await send_reset_password_message(schema.email)
    return {"detail": "Email has been sent"}


@router.patch("/reset-password")
async def password_reset(schema: NewPassword, session: TransactionalSession) -> Any:
    email = schema.email

    if not email:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Invalid token")
    user = get_user_by_email(session, email)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")

    res = verify(schema)
    if isinstance(res, SuccessVerifyMessage):
        reset_password(session, user, schema.new_password)
        return {"detail": "Password reset successful"}

    return res
