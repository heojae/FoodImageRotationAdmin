from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

from config import settings

engine = create_engine(settings.dataset_db_end_point, echo=True)

Base = declarative_base()


class DatasetInfo(Base):
    __tablename__ = 'dataset_info'
    pk = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(50))
    image_info = relationship("ImageInfo", back_populates="dataset_info")


class ImageInfo(Base):
    __tablename__ = 'image_info'
    pk = Column(Integer, primary_key=True, autoincrement=True)
    dataset_info_pk = Column(Integer, ForeignKey('dataset_info.pk'))
    dataset_info = relationship("DatasetInfo", back_populates="image_info")

    original_file_name = Column(String(50))
    uuid_file_name = Column(String(50))
    exif_degree = Column(Integer)
    model_degree = Column(Integer)
    confidence = Column(Float)
    user_fix_degree = Column(Integer)


if __name__ == '__main__':
    Base.metadata.create_all(engine)
