from datetime import datetime

from pydantic import BaseModel, Field

from src.api.v1.users.schemas import UserEmail
from src.core.config import settings


class Code(BaseModel):
    code: int = Field(ge=settings.VERIFICATION_CODE_MIN, le=settings.VERIFICATION_CODE_MAX)


class CodeVerify(Code, UserEmail):
    pass


class CodeResponse(BaseModel):
    expires_at: datetime
