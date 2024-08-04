from sqlalchemy.orm import Session
from sqlalchemy.sql import exists

from src.api.v1.users.models import User
from src.api.v1.users.schemas import UserCreate
from src.core.files import delete_file
from src.core.security import get_password_hash


def get_user_by_email(session: Session, email: str) -> User | None:
    return session.query(User).filter(User.email == email).first()


def is_email_registered(session: Session, email: str) -> bool:
    return session.query(exists().where(User.email == email)).scalar()


def create_user(session: Session, schema: UserCreate) -> User:
    user = User(email=schema.email, password=get_password_hash(schema.password))

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


def verify_user(session: Session, user: User) -> None:
    user.is_verified = True
    session.commit()
    session.refresh(user)


def update_email(session: Session, user: User, new_email: str):
    user.is_verified = False
    user.email = new_email
    session.commit()
    session.refresh(user)


def update_password(session: Session, user: User, new_password: str) -> None:
    hashed_password = get_password_hash(password=new_password)
    user.password = hashed_password
    session.commit()
    session.refresh(user)


def update_avatar(session: Session, user: User, new_avatar_url: str) -> None:
    avatar_url = user.avatar_url
    if avatar_url is not None:
        delete_file(avatar_url)

    user.avatar_url = new_avatar_url
    session.commit()
    session.refresh(user)
