import { config } from "dotenv";
import { Router } from "express";
import { TypedRequest } from "../types/core/express";
import { IHero } from "../types/hero/hero";
import { Error } from "mongoose";
import { isLoggedIn } from "./middleware";

config(); // load .env variables

export const heroRouter = Router();

heroRouter.use(isLoggedIn);

heroRouter.get("/", async (req, res) => {
  const { Hero } = req.context.models;
  try {
    const heroes = await Hero.find();
    res.status(200).json(heroes);
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json({ message });
  }
});

heroRouter.get("/:name", async (req, res) => {
  const { Hero } = req.context.models;
  try {
    const name = req.params.name;
    const hero = await Hero.find({ name });
    res.status(200).json(hero);
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json({ message });
  }
});

heroRouter.post("/", async (req: TypedRequest<IHero>, res) => {
  const { Hero } = req.context.models;
  try {
    await Hero.create(req.body);
    res.status(200).send(`Hero with name ${req.body.name} created`);
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ message });
  }
});

heroRouter.put("/:name", async (req: TypedRequest<IHero>, res) => {
  const { Hero } = req.context.models;
  try {
    const name = req.params.name;
    await Hero.updateOne({ name }, req.body, { new: true });
    res.status(200).json({
      message: `Hero with name ${req.body.name} created`,
      hero: req.body
    });
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ message });
  }
});

heroRouter.delete("/:name", async (req, res) => {
  const { Hero } = req.context.models;
  try {
    const name = req.params.name;
    await Hero.deleteOne({ name });
    res.status(200).send(`Hero with name ${req.params.name} deleted`);
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ message });
  }
});
