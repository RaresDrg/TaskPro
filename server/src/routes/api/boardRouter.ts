import { Router } from "express";
import { boardController } from "../../controllers/index.js";
import { authSessionMiddleware } from "../../middlewares/index.js";

const router = Router();

// Boards
router.post("/", authSessionMiddleware, boardController.addBoard);
router.get("/", authSessionMiddleware, boardController.getBoards);
router.get("/:boardId", authSessionMiddleware, boardController.getBoard);
router.patch("/:boardId", authSessionMiddleware, boardController.updateBoard);
router.delete("/:boardId", authSessionMiddleware, boardController.deleteBoard);

// Columns
router.post(
  "/:boardId/columns",
  authSessionMiddleware,
  boardController.addColumn,
);
router.patch(
  "/:boardId/columns/:columnId",
  authSessionMiddleware,
  boardController.updateColumn,
);
router.delete(
  "/:boardId/columns/:columnId",
  authSessionMiddleware,
  boardController.deleteColumn,
);

// Cards
router.post(
  "/:boardId/columns/:columnId/cards",
  authSessionMiddleware,
  boardController.addCard,
);
router.patch(
  "/:boardId/columns/:columnId/cards/:cardId",
  authSessionMiddleware,
  boardController.updateCard,
);
router.delete(
  "/:boardId/columns/:columnId/cards/:cardId",
  authSessionMiddleware,
  boardController.deleteCard,
);

export default router;
