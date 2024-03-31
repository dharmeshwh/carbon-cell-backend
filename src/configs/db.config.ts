import mongoose, { ConnectOptions } from "mongoose";

export async function configDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}
