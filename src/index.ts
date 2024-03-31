import { configDotenv } from "dotenv";
import app from "./app";
import { configDb } from "./configs/db.config";
import serverless from "serverless-http";

configDotenv();

if (process.env.MODE === "development") {
  app.listen(4000, async () => {
    await configDb();
    console.log("running on port", 4000);
  });
} else {
  configDb();
}

export const handler = serverless(app);
