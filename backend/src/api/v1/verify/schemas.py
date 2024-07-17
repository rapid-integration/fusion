from pydantic import BaseModel, EmailStr, Field


class UserEmail(BaseModel):
    """Represents user with email."""

    email: EmailStr = Field(max_length=255)


class VerifyUser(UserEmail):
    code: int


class NewPassword(VerifyUser):
    """Represents new password"""

    new_password: str = Field(min_length=8, max_length=128)


class NewEmail(VerifyUser):
    """Represents new password"""

    new_email: EmailStr = Field(max_length=255)


class SuccessVerifyMessage(BaseModel):
    detail: str = "The code is accepted"
