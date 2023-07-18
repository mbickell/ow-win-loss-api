import { config } from "dotenv";
import { Router } from "express";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { TypedRequest } from "../types/core/express";
import { ILoginDetails } from "../types/core/auth";

config(); // load .env variables

export const userRouter = Router(); // create router to create route bundle

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
const { SECRET = "secret" } = process.env;

// Signup route to create a new user
userRouter.post("/signup", async (req: TypedRequest<ILoginDetails>, res) => {
  const { User } = req.context.models;
  try {
    // hash the password
    req.body.password = await hash(req.body.password, 10);
    // create a new user
    const user = await User.create(req.body);
    // send new user as response
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Login route to verify a user and get a token
userRouter.post("/login", async (req: TypedRequest<ILoginDetails>, res) => {
  const { User } = req.context.models;
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      const result = await compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await sign({ username: user.username }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
