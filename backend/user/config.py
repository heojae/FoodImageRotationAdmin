from pydantic import BaseSettings


class Settings(BaseSettings):
    env: str = "local"

    user_api_listen_port: str = "[::]:50051"
    dl_api_listen_port: str = "[::]:50052"
    model_version_api_listen_port: str = "[::]:50053"
    dataset_api_listen_port: str = "[::]:50054"
    media_server_listen_port: str = "[::]:50050"

    user_api_listen_addr: str = "localhost:50051"
    dl_api_listen_addr: str = "localhost:50052"
    model_version_api_listen_addr: str = "localhost:50053"
    dataset_api_listen_addr: str = "localhost:50054"
    media_server_listen_addr: str = "localhost:50050"

    user_db_end_point: str = "sqlite:///./user.db"
    model_version_db_end_point: str = "sqlite:///./model_version.db"
    dataset_db_end_point: str = "sqlite:///./dataset.db"
    redis_end_point: str = "redis://127.0.0.1:6379/0?encoding=utf-8"

    token_header: str = "access_token"
    access_token: str = "f9e4a020-6bfd-11eb-8572-0800200c9a66"

    # api_user 에만 필요한 정보
    admin_email: str = "admin@naver.com"
    admin_password: str = "1234"
    admin_profile_image: str = "admin/profile.jpg"


settings = Settings()
