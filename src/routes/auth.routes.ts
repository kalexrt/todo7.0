import express from "express";
import { login } from "../controller/auth.controller";
import { refresh } from "../controller/auth.controller";

const router = express();

router.post("/login", login);
router.post("/refresh", refresh);

export default router;