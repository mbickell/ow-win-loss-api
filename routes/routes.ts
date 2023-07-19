import { Router } from "express";
import { userRouter } from "../controllers/user";

export const router = Router();

router.use("/user", userRouter);
