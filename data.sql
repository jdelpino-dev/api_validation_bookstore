-- \c books;
-- \c books-test;

-- Drop all tables if they exist
DO $$ DECLARE
    r RECORD;
BEGIN
    -- Disable triggers to avoid issues with foreign key constraints
    EXECUTE 'SET session_replication_role = replica';
    
    -- Loop through all tables in the current schema
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
    
    -- Re-enable triggers
    EXECUTE 'SET session_replication_role = DEFAULT';
END $$;

-- Create books table
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  isbn VARCHAR(13) UNIQUE NOT NULL,
  amazon_url VARCHAR(255),
  author VARCHAR(255),
  language VARCHAR(50),
  pages INTEGER,
  publisher VARCHAR(255),
  title VARCHAR(255),
  year INTEGER
);
