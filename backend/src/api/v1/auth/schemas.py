from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class TokenPayload(BaseModel):
    """JSON payload containing access token."""

    access_token: str
    token_type: str = "bearer"


class JWTPayload(BaseModel):
    """Contents of JWT."""

    exp: datetime | None = None
    sub: int | str | None = None


class UserResponse(BaseModel):
    """Represents the public response data for a user."""

    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime


class UserCreate(BaseModel):
    """Represents user registration details."""

    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=128)
