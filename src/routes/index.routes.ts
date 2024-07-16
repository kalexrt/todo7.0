import express from "express";
import taskRouter from "./task.routes";
import userRouter from "./user.routes";
import authRouter from "./auth.routes"

const router = express();
router.use("/tasks", taskRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;