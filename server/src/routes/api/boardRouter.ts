import express from "express";
import boardController from "../../controllers/boardController.js";

const router = express.Router();

router.post("/", boardController.addBoard);
router.get("/", boardController.getBoardsList);
router.get("/:boardId", boardController.getBoard);
router.delete("/:boardId", boardController.deleteBoard);
router.put("/:boardId", boardController.updateBoard);

router.post("/:boardId/columns", boardController.addColumn);
router.delete("/:boardId/columns/:columnId", boardController.deleteColumn);
router.patch("/:boardId/columns/:columnId", boardController.updateColumn);
router.put("/:boardId/columns", boardController.updateColumns);

router.post("/:boardId/columns/:columnId/cards", boardController.addCard);
router.delete(
  "/:boardId/columns/:columnId/cards/:cardId",
  boardController.deleteCard
);
router.patch(
  "/:boardId/columns/:columnId/cards/:cardId",
  boardController.updateCard
);

export default router;
