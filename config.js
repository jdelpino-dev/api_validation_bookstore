/** Common config for bookstore. */

// Construct the DB_URI for the database connection.

let DB_URI = `postgresql://`;

if (process.env.NODE_ENV === "test") {
  DB_URI = `${DB_URI}/books-test`;
} else {
  DB_URI = process.env.DATABASE_URL || `${DB_URI}/books`;
}

export { DB_URI };
