import express from "express";
import { config } from "dotenv";

const app = express();
config({ quiet: true });
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server healthy!" });
});

app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
