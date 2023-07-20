import { Router } from "express";
import { userRouter } from "../controllers/user";
import { heroRouter } from "../controllers/hero";
import { recordRouter } from "../controllers/record";

export const router = Router();

router.use("/user", userRouter);
router.use("/hero", heroRouter);
router.use("/record", recordRouter);
