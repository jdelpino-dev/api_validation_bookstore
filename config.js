/** Common config for bookstore. */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Construct the DB_URI for the database connection.

let DB_URI = `postgresql://`;

if (process.env.NODE_ENV === "test") {
  DB_URI = `${DB_URI}/books-test`;
} else {
  DB_URI = process.env.DATABASE_URL || `${DB_URI}/books`;
}

// Convert import.meta.url to a file path

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the JSON schemas

const bookCreationSchema = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "schemas", "bookCreationSchema.json"),
    "utf8"
  )
);

const bookUpdateSchema = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "schemas", "bookUpdateSchema.json"),
    "utf8"
  )
);

export { DB_URI, bookCreationSchema, bookUpdateSchema };
