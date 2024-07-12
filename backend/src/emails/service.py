from typing import Any

from fastapi_mail import FastMail, MessageSchema, MessageType

from src.core.config import settings

__fm = FastMail(settings.MAIL_CONNECTION_CONF)


async def send_message(message: MessageSchema, template_name: str) -> None:
    await __fm.send_message(message, template_name=template_name)


def generate_message(
    subject: str,
    recipients: list[str],
    template_body: dict[str, Any],
    subtype: MessageType = MessageType.html,
) -> MessageSchema:
    return MessageSchema(subject=subject, recipients=recipients, template_body=template_body, subtype=subtype)
