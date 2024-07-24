from fastapi_mail import ConnectionConfig
from pydantic import DirectoryPath, PostgresDsn, computed_field
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_ignore_empty=True, extra="ignore")

    DEBUG: bool = True

    APP_NAME: str
    APP_VERSION: str

    UPLOADS_PATH: DirectoryPath
    TEMPLATES_PATH: DirectoryPath

    ALGORITHM: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    VERIFICATION_CODE_MIN: int = 100_000
    VERIFICATION_CODE_MAX: int = 999_999
    VERIFICATION_CODE_EXPIRE_MINUTES: int

    REDIS_HOST: str

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

    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_PORT: int
    MAIL_SERVER: str
    MAIL_STARTTLS: bool
    MAIL_SSL_TLS: bool
    MAIL_FROM: str
    USE_CREDENTIALS: bool
    VALIDATE_CERTS: bool

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
            MAIL_FROM_NAME=self.APP_NAME,
            TEMPLATE_FOLDER=self.TEMPLATES_PATH,
            USE_CREDENTIALS=self.USE_CREDENTIALS,
            VALIDATE_CERTS=self.VALIDATE_CERTS,
        )


settings = Settings()  # type: ignore
