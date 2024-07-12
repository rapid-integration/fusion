from sqlalchemy.orm import Session
from sqlalchemy.sql import exists

from src.api.v1.auth.models import User
from src.api.v1.auth.schemas import UserCreate
from src.core.security import get_password_hash


def create_user(session: Session, user_create_model: UserCreate) -> User:
    user = User(
        email=user_create_model.email,
        password=get_password_hash(user_create_model.password),
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


def get_user_by_email(session: Session, email: str) -> User | None:
    return session.query(User).filter(User.email == email).first()


def is_email_registered(session: Session, email: str) -> bool:
    return session.query(exists().where(User.email == email)).scalar()


def verify_user(session: Session, user: User) -> None:
    user.is_verified = True
    session.commit()
    session.refresh(user)
