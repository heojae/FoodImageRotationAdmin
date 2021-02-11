from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base

from config import settings

Base = declarative_base()


class ModelVersion(Base):
    __tablename__ = 'model_versions'

    pk = Column(Integer, primary_key=True, autoincrement=True)
    version_name = Column(String(50), unique=True)
    train_acc = Column(Float)
    test_acc = Column(Float)
    model_file_name = Column(String(100))
    is_using = Column(Boolean)


if __name__ == '__main__':
    engine = create_engine(settings.model_version_db_end_point, echo=True)
    Base.metadata.create_all(engine, checkfirst=True)
