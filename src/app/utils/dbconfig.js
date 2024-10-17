import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "mohit@0009",
  database: "hospital",
});

export default pool;
