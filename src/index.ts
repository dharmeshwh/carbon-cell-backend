import { configDotenv } from "dotenv";
import app from "./app";
import { configDb } from "./configs/db.config";

configDotenv();

app.listen(4000, async () => {
  await configDb();
  console.log("running on port", 4000);
});
