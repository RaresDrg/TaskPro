import { Router } from "express";
import {
  authRouter,
  supportRouter,
  userRouter,
  boardRouter,
} from "./api/index.js";

const router = Router();

router.get("/", (_, res) => res.redirect("/api-docs"));
// todo: api-docs => swagger

router.get("/health-check", (_, res) => {
  res.status(200).send("🚀 TaskPro API is running.");
});

router.use("/api/auth", authRouter);
router.use("/api/support", supportRouter);
router.use("/api/users", userRouter);
router.use("/api/boards", boardRouter);

export default router;
