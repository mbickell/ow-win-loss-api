import { config } from "dotenv";
import { Router } from "express";
import { TypedRequest } from "../types/core/express";
import { Error } from "mongoose";
import { isLoggedIn } from "./middleware";
import { IRecord } from "../types/record/record";

config(); // load .env variables

export const recordRouter = Router();

recordRouter.use(isLoggedIn);

recordRouter.get("/", async (req, res) => {
  const { Record } = req.context.models;
  const { username } = req.user;

  try {
    const records = await Record.find({ username }).sort({ createdAt: "desc" });
    res.status(200).json(records);
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json({ message });
  }
});

recordRouter.get("/:id", async (req, res) => {
  const { Record } = req.context.models;
  const { username } = req.user;
  const _id = req.params.id;

  try {
    const record = await Record.findOne({ _id, username });
    res.status(200).json(record);
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json({ message });
  }
});

recordRouter.post("/", async (req: TypedRequest<IRecord>, res) => {
  const { Record } = req.context.models;
  const { username } = req.user;
  req.body.username = username;

  try {
    await Record.create(req.body);
    res.status(200).send(`Record created`);
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ message });
  }
});

recordRouter.put("/:id", async (req: TypedRequest<IRecord>, res) => {
  const { Record } = req.context.models;
  const { username } = req.user;
  const _id = req.params.id;

  try {
    await Record.updateOne({ _id, username }, req.body, { new: true });
    res.status(200).json({
      message: `Record with id: ${_id} updated`,
      record: req.body
    });
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ message });
  }
});

recordRouter.delete("/:id", async (req, res) => {
  const { Record } = req.context.models;
  const { username } = req.user;
  const _id = req.params.id;

  try {
    await Record.deleteOne({ _id, username });
    res.status(200).send(`Record with id ${_id} deleted`);
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ message });
  }
});
