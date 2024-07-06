from datetime import datetime
from typing import Any

from pyheck import snake
from sqlalchemy import create_engine, func
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from src.core.config import settings

ENGINE = create_engine(str(settings.DATABASE_URI), echo=settings.DEBUG)


class Base(DeclarativeBase):
    @declared_attr
    @classmethod
    def __tablename__(cls) -> Any:
        return snake(cls.__name__)

    def update(self, schema: dict[str, Any]) -> None:
        for key, value in schema.items():
            setattr(self, key, value)


class AuditMixin:
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now())
