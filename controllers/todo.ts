import { Router } from "express";
import { isLoggedIn } from "./middleware";
import { TypedRequest } from "../types/core/express";
import { ITodo } from "../types/todo/todo";

export const todoRouter = Router();

//custom middleware could also be set at the router level like so
// router.use(isLoggedIn) then all routes in this router would be protected

todoRouter.use(isLoggedIn);

// Index Route with isLoggedIn middleware
todoRouter.get("/", async (req, res) => {
  const { Todo } = req.context.models;
  const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
  //send all todos with that user
  res.json(
    await Todo.find({ username }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// Show Route with isLoggedIn middleware
todoRouter.get("/:id", async (req, res) => {
  const { Todo } = req.context.models;
  const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
  const _id = req.params.id; // get id from params
  //send target todo
  res.json(
    await Todo.findOne({ username, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// create Route with isLoggedIn middleware
todoRouter.post("/", async (req: TypedRequest<ITodo>, res) => {
  const { Todo } = req.context.models;
  const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
  req.body.username = username; // add username property to req.body
  //create new todo and send it in response
  res.json(
    await Todo.create(req.body).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// update Route with isLoggedIn middleware
todoRouter.put("/:id", async (req: TypedRequest<ITodo>, res) => {
  const { Todo } = req.context.models;
  const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
  req.body.username = username; // add username property to req.body
  const _id = req.params.id;
  //update todo with same id if belongs to logged in User
  res.json(
    await Todo.updateOne({ username, _id }, req.body, { new: true }).catch(
      (error) => res.status(400).json({ error })
    )
  );
});

// update Route with isLoggedIn middleware
todoRouter.delete("/:id", async (req, res) => {
  const { Todo } = req.context.models;
  const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
  const _id = req.params.id;
  //remove todo with same id if belongs to logged in User
  res.json(
    await Todo.deleteOne({ username, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});
