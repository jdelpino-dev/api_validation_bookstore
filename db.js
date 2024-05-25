/** Database config for bookstore. */

import pg from "pg";
import { DB_URI } from "./config.js";

const { Client } = pg;

let db;

if (!db) {
  db = new Client({
    connectionString: DB_URI,
  });

  db.connect()
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.error("Database connection error", err);
    });

  // Flag to check if the connection is already established
  db._connected = true;
}

export default db;
