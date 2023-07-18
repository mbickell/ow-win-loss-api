import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { router } from "./routes/routes";

config();

const mongoConnectionString = process.env.DATABASE_URL;
mongoose.connect(mongoConnectionString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const PORT = 3000;

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
