import { Router } from "express";
import { userRouter } from "../controllers/user";
import { heroRouter } from "../controllers/hero";

export const router = Router();

router.use("/user", userRouter);
router.use("/hero", heroRouter);
