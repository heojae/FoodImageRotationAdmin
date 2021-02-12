import sqlalchemy

from databases import Database

from config import settings

database = Database(settings.dataset_db_end_point)
metadata = sqlalchemy.MetaData()
