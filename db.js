/** Database config for database. */

import { Client } from "pg";
import { DB_URI } from "./config";

let db = new Client({
  connectionString: DB_URI,
});

db.connect();

export default db;
