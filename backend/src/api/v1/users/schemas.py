from datetime import datetime

from pydantic import BaseModel, EmailStr, Field

from src.core.config import settings


class UserEmail(BaseModel):
    """Represents user with email."""

    email: EmailStr = Field(max_length=255)


class UserPassword(BaseModel):
    """Represents user with password."""

    password: str = Field(min_length=8, max_length=128)


class UserResponse(BaseModel):
    """Represents the public response data for a user."""

    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime


class UserCreate(UserEmail, UserPassword):
    """Represents user registration details."""


class UserPasswordReset(UserEmail, UserPassword):
    """Represents user password reset details"""

    code: int = Field(ge=settings.VERIFICATION_CODE_MIN, le=settings.VERIFICATION_CODE_MAX)
