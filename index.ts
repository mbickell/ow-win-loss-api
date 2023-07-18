import express from "express";
import { config } from "dotenv";
import { router } from "./routes/routes";
import cors from "cors";
import morgan from "morgan";
import "./db/connection";
import { createContext } from "./controllers/middleware";

config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors()); // add cors headers
app.use(morgan("tiny")); // log the request for debugging
app.use(express.json());
app.use(createContext);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
