from dataclasses import dataclass
from os import getenv

@dataclass(frozen=True)
class Settings:
    environment: str = getenv("APP_ENV", "development")
    database_url: str = getenv("DATABASE_URL", "sqlite:///./personal-health.db")
    storage_root: str = getenv("STORAGE_ROOT", "./storage")
    demo_auth_enabled: bool = getenv("ENABLE_DEMO_AUTH", "false").lower() == "true"
    max_document_bytes: int = int(getenv("MAX_DOCUMENT_BYTES", str(10 * 1024 * 1024)))

settings = Settings()
