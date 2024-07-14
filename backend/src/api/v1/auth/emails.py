from fastapi_mail import MessageSchema

from src.core.config import settings
from src.core.security import create_access_token
from src.emails.service import generate_message, send_message

VERIFY_TEMPLATE_PATH = "auth/verify.jinja"


async def send_user_verification_message(email: str) -> None:
    token = create_access_token(email, minutes=settings.EMAIL_RESET_TOKEN_EXPIRE_MINUTES)
    message = generate_user_verification_message(email, token.access_token, settings.EMAIL_RESET_TOKEN_EXPIRE_MINUTES)

    await send_message(message, VERIFY_TEMPLATE_PATH)


def generate_user_verification_message(email: str, token: str, expires_at: int) -> MessageSchema:
    subject = f"Email address verification for {settings.APP_NAME} account"
    recipients = [email]

    verification_url = get_verification_url(token)
    template_body = {"email": email, "url": verification_url, "expires_at": expires_at}

    return generate_message(subject, recipients, template_body)


def get_verification_url(token: str) -> str:
    return f"{settings.SERVER_HOST}/api/v1/auth/verify?token={token}"
