from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict

import emails  # type: ignore
from jinja2 import Template

from src.core.config import settings


@dataclass
class EmailData:
    html_content: str
    subject: str


def render_email_template(*, template_name: str, context: dict[str, Any]) -> str:
    template_str = (
            Path(__file__).parent / "templates" / "build_email" / template_name
    ).read_text()
    html_content = Template(template_str).render(context)
    return html_content


def send_email(
        *,
        email_to: str,
        subject: str = "",
        html_content: str = "",
) -> dict[str, Any]:
    message = emails.Message(
        subject=subject,
        html=html_content,
        mail_from=(settings.EMAILS_FROM_NAME, settings.EMAILS_FROM_EMAIL),
    )
    smtp_options = {"host": settings.SMTP_HOST, "port": settings.SMTP_PORT}
    if settings.SMTP_TLS:
        smtp_options["tls"] = True
    elif settings.SMTP_SSL:
        smtp_options["ssl"] = True
    if settings.SMTP_USER:
        smtp_options["user"] = settings.SMTP_USER
    if settings.SMTP_PASSWORD:
        smtp_options["password"] = settings.SMTP_PASSWORD
    response = message.send(to=email_to, smtp=smtp_options)
    return {"status": response.status_code}


def generate_test_email(email_to: str) -> EmailData:
    app_name = settings.APP_NAME
    subject = f"{app_name} - Test email"
    html_content = render_email_template(
        template_name="test_email.html",
        context={"project_name": settings.APP_NAME, "email": email_to},
    )
    return EmailData(html_content=html_content, subject=subject)
