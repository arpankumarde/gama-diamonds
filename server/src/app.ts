import express from "express";
import { config } from "dotenv";

config({ quiet: true });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server healthy!" });
});

export default app;
