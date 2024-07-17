from typing import Any

from fastapi import APIRouter, HTTPException, status

from src.api.deps import TransactionalSession
from src.api.v1.auth.service import is_email_registered
from src.api.v1.verify.emails import (
    send_reset_email_message,
    send_reset_password_message,
    send_user_verification_message,
)
from src.api.v1.verify.schemas import NewEmail, NewPassword, SuccessVerifyMessage, UserEmail, VerifyUser
from src.api.v1.verify.service import check_verify_code, get_user_by_email, reset_email, reset_password, verify_email

router = APIRouter(prefix="/verify", tags=["Verification"])


@router.post("")
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
def verification_email(schema: VerifyUser, session: TransactionalSession) -> Any:
    user = get_user_by_email(session, schema.email)

    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")

    res = verify(schema)
    if isinstance(res, SuccessVerifyMessage):
        verify_email(session, user)
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
def password_reset(schema: NewPassword, session: TransactionalSession) -> Any:
    user = get_user_by_email(session, schema.email)

    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")

    res = verify(schema)
    if isinstance(res, SuccessVerifyMessage):
        reset_password(session, user, schema.new_password)
        return {"detail": "Password reset successful"}

    return res


@router.post("/reset-email")
async def recovery_email(schema: UserEmail, session: TransactionalSession) -> Any:
    user = get_user_by_email(session, schema.email)

    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if not user.is_active:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "User isn't active")

    await send_reset_email_message(schema.email)
    return {"detail": "Email has been sent"}


@router.patch("/reset-email")
def email_reset(schema: NewEmail, session: TransactionalSession) -> Any:
    user = get_user_by_email(session, schema.email)

    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if is_email_registered(session, schema.new_email):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Email already taken")

    res = verify(schema)
    if isinstance(res, SuccessVerifyMessage):
        reset_email(session, user, schema.new_email)
        return {"detail": "Email reset successful. Please verify new email"}

    return res
