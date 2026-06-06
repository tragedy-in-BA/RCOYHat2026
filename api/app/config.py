from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator
from typing import List


class Settings(BaseSettings):
    cors_origins: List[str] = ["http://localhost:3000"]
    supabase_url: str = ""
    supabase_service_key: str = ""
    resend_api_key: str = ""
    team_email: str = "hola@rco.com.ar"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors(cls, v: object) -> object:
        if isinstance(v, str):
            import json
            return json.loads(v)
        return v


settings = Settings()
