import sqlite3
import re
import os

from database import engine, Base
import models

def create_tables():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created.")

def seed_data(db_path, sql_files):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    for file_path in sql_files:
        print(f"Seeding data from {file_path}...")
        with open(file_path, 'r') as f:
            content = f.read()
            
            # Remove comments (single line and block)
            content = re.sub(r'--.*', '', content)
            content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
            
            # Split by statements
            statements = content.split(';')
            
            for stmt in statements:
                stmt = stmt.strip()
                if stmt.startswith('INSERT INTO'):
                    try:
                        # SQLite doesn't support the 'true'/'false' unquoted booleans directly if they're in strings, but true/false literals work
                        cursor.execute(stmt)
                    except Exception as e:
                        print(f"Error executing statement: {stmt[:100]}... Error: {e}")
                        
    conn.commit()
    conn.close()
    print("Seeding complete.")

if __name__ == "__main__":
    db_path = "careerpath.db"
    
    # Remove existing db to start fresh
    if os.path.exists(db_path):
        os.remove(db_path)
        
    create_tables()
    
    sql_files = [
        "../database/careerpath_gh_database.sql",
        "../database/careerpath_gh_database_v2_extension.sql"
    ]
    
    seed_data(db_path, sql_files)
