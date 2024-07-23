from datetime import datetime, timedelta, timezone

from fastapi_mail import MessageSchema

from src.api.v1.verification.service import set_code
from src.core.config import settings
from src.emails.service import generate_message, send_message

__VERIFICATION_TEMPLATE_FILENAME = "verification.jinja"


async def send_verification_message(recipient: str) -> datetime:
    code = set_code(recipient)
    expires_at = generate_code_expiration_timestamp()
    message = generate_verification_message(recipient, code, expires_at)

    await send_message(message, __VERIFICATION_TEMPLATE_FILENAME)

    return expires_at


def generate_code_expiration_timestamp() -> datetime:
    return datetime.now(timezone.utc) + timedelta(minutes=settings.VERIFICATION_CODE_EXPIRE_MINUTES)


def generate_verification_message(recipient: str, code: int, expires_at: datetime) -> MessageSchema:
    subject = "Verification request for your account"

    template_body = {
        "recipient": recipient,
        "code": code,
        "expires_at": expires_at,
    }

    return generate_message(subject, [recipient], template_body)
