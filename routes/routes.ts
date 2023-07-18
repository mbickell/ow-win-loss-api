import { Router } from "express";
import { userRouter } from "../controllers/user";
import { todoRouter } from "../controllers/todo";

export const router = Router();

router.use("/user", userRouter);
router.use("/todos", todoRouter);
