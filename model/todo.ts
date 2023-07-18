import { Schema, model } from "mongoose";
import { ITodo } from "../types/todo/todo";

// User Schema
const TodoSchema = new Schema<ITodo>({
  username: { type: String, required: true },
  reminder: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false }
});

// User model
export const Todo = model("Todo", TodoSchema);
