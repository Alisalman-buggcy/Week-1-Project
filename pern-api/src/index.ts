import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/users", userRoutes);

// health check
app.get("/", (_req: Request, res: Response) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});