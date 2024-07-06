from fastapi import APIRouter

from src.api.deps import CurrentUser
from src.api.v1.auth.schemas import UserResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
def me(current_user: CurrentUser):
    return current_user
