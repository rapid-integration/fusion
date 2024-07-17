from fastapi_mail import MessageSchema

from src.api.v1.auth.verify_codes import generate_verify_code
from src.core.config import settings
from src.emails.service import generate_message, send_message

VERIFY_TEMPLATE_PATH = "auth/verify.jinja"
RESET_PASSWORD_TEMPLATE_PATH = "auth/reset_password.jinja"


async def send_user_verification_message(email: str) -> None:
    code = generate_verify_code(email)
    message = generate_user_verification_message(email, code, settings.EMAIL_VERIFY_CODE_EXPIRE_MINUTES)

    await send_message(message, VERIFY_TEMPLATE_PATH)


async def send_reset_password_message(email: str) -> None:
    code = generate_verify_code(email)
    message = generate_reset_password_message(email, code, settings.EMAIL_VERIFY_CODE_EXPIRE_MINUTES)

    await send_message(message, RESET_PASSWORD_TEMPLATE_PATH)


def generate_user_verification_message(email: str, code: int, expires_at: int) -> MessageSchema:
    subject = f"Email address verification for {settings.APP_NAME} account"
    recipients = [email]

    template_body = {"email": email, "code": code, "expires_at": expires_at}

    return generate_message(subject, recipients, template_body)


def generate_reset_password_message(email: str, code: int, expires_at: int) -> MessageSchema:
    subject = f"Reset password for {settings.APP_NAME} account"
    recipients = [email]

    template_body = {"email": email, "code": code, "expires_at": expires_at}

    return generate_message(subject, recipients, template_body)
