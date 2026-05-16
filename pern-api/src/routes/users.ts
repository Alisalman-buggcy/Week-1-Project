import express, { Request, Response } from "express";
import { pool } from "../db";

const router = express.Router();


// CREATE TABLE (run once)
router.get("/setup", async (_req: Request, res: Response) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100)
    )
  `);

  res.json({ message: "Users table created" });
});


// CREATE USER
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
});


// GET ALL
router.get("/", async (_req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});


// GET ONE
router.get("/:id", async (req: Request, res: Response) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id=$1",
    [req.params.id]
  );

  res.json(result.rows[0]);
});


// UPDATE
router.put("/:id", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
    [name, email, req.params.id]
  );

  res.json(result.rows[0]);
});


// DELETE
router.delete("/:id", async (req: Request, res: Response) => {
  await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);

  res.json({ message: "User deleted" });
});

export default router;