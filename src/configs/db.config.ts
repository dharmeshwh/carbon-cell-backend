import mongoose from "mongoose";

const URI = `mongodb+srv://dharmeshoctober:nCGYwnRCF49kQn8M@cluster0.x3d6yvc.mongodb.net/`;

export function configDb() {
  return mongoose.connect(URI);
}
