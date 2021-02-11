from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

from config import settings

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'

    pk = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(50), unique=True)
    password = Column(String(100))
    profile_image = Column(String(100))
    access_token = Column(String(36), unique=True)


if __name__ == '__main__':
    engine = create_engine(settings.user_db_end_point, echo=True)
    Base.metadata.create_all(engine, checkfirst=True)
