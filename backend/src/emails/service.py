from fastapi_mail import FastMail, MessageSchema, MessageType

from src.core.config import settings


def generate_email(subject: str, recipients: list, template_body: dict,
                   subtype: MessageType = MessageType.html) -> MessageSchema:
    message = MessageSchema(
        subject=subject,
        recipients=recipients,
        template_body=template_body,
        subtype=subtype)
    return message


async def send_email(message: MessageSchema, template_name: str) -> None:
    fm = FastMail(settings.MAIL_CONNECTION_CONF)
    await fm.send_message(message, template_name=template_name)


def generate_user_verification_email(email_to: str, token: str, expires_at: int) -> MessageSchema:
    subject = f"Verify email for {settings.APP_NAME}"
    recipients = [email_to]
    link = f"{settings.server_host}/api/v1/auth/verify-user?token={token}"
    template_body = {"email": email_to, "link": link, "expires_at": expires_at}
    return generate_email(subject, recipients, template_body)
