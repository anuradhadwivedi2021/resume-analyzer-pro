import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    database_url = os.getenv("DATABASE_URL")
    if database_url:
        # Supabase PostgreSQL — Production
        conn = psycopg2.connect(database_url)
    else:
        # Local MSSQL — Development
        import pyodbc
        conn = pyodbc.connect(
            "DRIVER={SQL Server};"
            "SERVER=LENOVO\\SQLEXPRESS;"
            "DATABASE=resume_analyzer;"
            "Trusted_Connection=yes;"
        )
    return conn