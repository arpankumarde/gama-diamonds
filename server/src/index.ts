import app from "./app.js";
import connectToDatabase from "./db/db.js";

connectToDatabase();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
