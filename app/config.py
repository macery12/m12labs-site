from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    site_url: str = "https://m12labs.net"
    docs_url: str = "https://docs.m12labs.net"
    discord_url: str = "https://discord.gg/fVJZtqKYrc"
    github_url: str = "https://github.com/macery12/M12labs"


settings = Settings()
