/** Database config for database. */

import pg from "pg";
import { DB_URI } from "./config.js";

const { Client } = pg;

let db = new Client({
  connectionString: DB_URI,
});

db.connect();

export default db;
