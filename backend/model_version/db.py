import sqlalchemy

from config import settings
from databases import Database

database = Database(settings.model_version_db_end_point)
metadata = sqlalchemy.MetaData()
