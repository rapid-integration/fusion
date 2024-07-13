from src.api.v1.auth.schemas import UserResponse


class UserMe(UserResponse):
    """Represents the public response data for a user."""
    id: int
    email: str
