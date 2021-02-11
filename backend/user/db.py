from databases import Database
import sqlalchemy

from config import settings

database = Database(settings.user_db_end_point)
metadata = sqlalchemy.MetaData()
