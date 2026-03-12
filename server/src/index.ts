import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import connectToDatabase from "./db/db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server healthy!" });
});

connectToDatabase();

app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
