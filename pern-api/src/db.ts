import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD), // 👈 IMPORTANT FIX
  database: process.env.DB_NAME,
});

// optional test connection
pool.connect((err: Error | undefined) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("✅ PostgreSQL connected");
  }
});
