import redis

from src.core.config import settings

redis = redis.from_url(f"redis://{settings.REDIS_HOST}")
