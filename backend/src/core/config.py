import secrets

from fastapi_mail import ConnectionConfig
from pydantic import PostgresDsn, computed_field
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_ignore_empty=True, extra="ignore")

    DEBUG: bool = True

    APP_NAME: str
    APP_VERSION: str

    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    ALGORITHM: str = "HS256"

    POSTGRES_USERNAME: str
    POSTGRES_PASSWORD: str
    POSTGRES_PORT: int = 5432
    POSTGRES_HOST: str
    POSTGRES_PATH: str

    @computed_field
    @property
    def DATABASE_URI(self) -> PostgresDsn:
        return MultiHostUrl.build(
            scheme="postgresql+psycopg",
            username=self.POSTGRES_USERNAME,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_HOST,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_PATH,
        )

    UPLOADS_PATH: str

    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_PORT: int
    MAIL_SERVER: str
    MAIL_STARTTLS: bool
    MAIL_SSL_TLS: bool
    MAIL_FROM: str
    MAIL_FROM_NAME: str
    TEMPLATES_PATH: str
    USE_CREDENTIALS: bool
    VALIDATE_CERTS: bool
    EMAIL_RESET_TOKEN_EXPIRE_MINUTES: int

    @computed_field
    @property
    def MAIL_CONNECTION_CONF(self) -> ConnectionConfig:
        return ConnectionConfig(
            MAIL_USERNAME=self.MAIL_USERNAME,
            MAIL_PASSWORD=self.MAIL_PASSWORD,
            MAIL_PORT=self.MAIL_PORT,
            MAIL_SERVER=self.MAIL_SERVER,
            MAIL_STARTTLS=self.MAIL_STARTTLS,
            MAIL_SSL_TLS=self.MAIL_SSL_TLS,
            MAIL_FROM=self.MAIL_FROM,
            MAIL_FROM_NAME=self.MAIL_FROM_NAME,
            TEMPLATE_FOLDER=self.TEMPLATES_PATH,  # type: ignore
            USE_CREDENTIALS=self.USE_CREDENTIALS,
            VALIDATE_CERTS=self.VALIDATE_CERTS,
        )

    DOMAIN: str = "localhost"
    PORT: int = 8000

    @computed_field
    @property
    def SERVER_HOST(self) -> str:
        # Use HTTPS for anything other than local development
        if self.DEBUG:
            return f"http://{self.DOMAIN}:{self.PORT}"
        return f"https://{self.DOMAIN}"


settings = Settings()  # type: ignore
