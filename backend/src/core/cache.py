from typing import Any

from redis import Redis

from src.core.config import settings

redis = Redis(settings.REDIS_HOST)

CACHE_KEYS_SEPARATOR = ":"


def separate(*args: Any) -> str:
    return CACHE_KEYS_SEPARATOR.join(args)


__all__ = [
    "redis",
]
