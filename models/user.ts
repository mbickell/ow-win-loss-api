import { Schema, model } from "mongoose";
import { ILoginDetails } from "../types/core/auth";

const UserScheme = new Schema<ILoginDetails>({
  username: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true }
});

export const User = model("User", UserScheme, "Users");
