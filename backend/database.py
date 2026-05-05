import pyodbc

def get_connection():
    conn = pyodbc.connect(
        "DRIVER={SQL Server};"
        "SERVER=LENOVO\\SQLEXPRESS;"
        "DATABASE=resume_analyzer;"
        "Trusted_Connection=yes;"
    )
    return conn