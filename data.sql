-- \c books;
-- \c books-test;

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
