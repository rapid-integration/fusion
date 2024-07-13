from fastapi import APIRouter

from src.api.deps import CurrentUser
from src.api.v1.users.schemas import UserMe

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserMe)
def me(current_user: CurrentUser):
    return current_user
