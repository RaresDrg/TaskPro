import { Router } from "express";
import { supportController } from "../../controllers/index.js";
import { authSessionMiddleware } from "../../middlewares/index.js";

const router = Router();

router.post("/", authSessionMiddleware, supportController.reachSupport);

export default router;
