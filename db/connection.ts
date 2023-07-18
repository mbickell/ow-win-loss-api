import { config } from "dotenv";
import mongoose from "mongoose";

config();

//DESTRUCTURE ENV VARIABLES
const { DATABASE_URL } = process.env;

// CONNECT TO MONGO
mongoose.connect(DATABASE_URL);

// CONNECTION EVENTS
mongoose.connection
  .on("open", () => console.log("DATABASE STATE", "Connection Open"))
  .on("close", () => console.log("DATABASE STATE", "Connection Open"))
  .on("error", (error) => console.log("DATABASE STATE", error))
  .on("connection", () => console.log("Connected"));

// EXPORT CONNECTION
export default mongoose;
