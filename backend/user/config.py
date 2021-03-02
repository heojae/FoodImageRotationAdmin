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


class DockerSettings(BaseSettings):
    env: str = "local"

    user_api_listen_port: str = "[::]:50051"
    dl_api_listen_port: str = "[::]:50052"
    model_version_api_listen_port: str = "[::]:50053"
    dataset_api_listen_port: str = "[::]:50054"
    media_server_listen_port: str = "[::]:50050"

    user_api_listen_addr: str = "api-user"
    dl_api_listen_addr: str = "api-dl"
    model_version_api_listen_addr: str = "api-model_version"
    dataset_api_listen_addr: str = "api-dataset"
    media_server_listen_addr: str = "nginx-media"

    # "mysql-user+pymysql://root:password@mysql_db:3306/employees"
    # "postgresql://postgres:buzzni-assignment@postgres-alarm/postgres"
    # "mysql-user://root:fira_user_password:40051@mysql-user-user/users"

    # user_db_end_point: str = "mysql-user://root:fira_user_password@127.0.0.1:40051/fira_user"
    user_db_end_point: str = "mysql://root:fira_user_password@mysql-user/fira_user"
    model_version_db_end_point: str = "mysql-user-model_version"
    dataset_db_end_point: str = "mysql-user-dataset"
    redis_end_point: str = "redis://redis-server:6379/0?encoding=utf-8"

    token_header: str = "access_token"
    access_token: str = "f9e4a020-6bfd-11eb-8572-0800200c9a66"

    # api_user 에만 필요한 정보
    admin_email: str = "admin@naver.com"
    admin_password: str = "1234"
    admin_profile_image: str = "admin/profile.jpg"


# settings = Settings()
settings = DockerSettings()
