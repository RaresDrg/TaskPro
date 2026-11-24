import type { RequestHandler } from "express";
import { Types } from "mongoose";
import { boardService } from "../services/index.js";
import { validateData } from "../config/index.js";
import { sendSuccessResponse, createError } from "../utils/index.js";

// Boards
export const addBoard: RequestHandler = async (req, res, next) => {
  try {
    const { title, icon, background } = req.body;
    validateData({ title, icon, background });

    const newBoard = await boardService.addBoard({
      owner: req.user!._id,
      title: title.trim(),
      icon,
      background,
    });

    sendSuccessResponse(res, 201, {
      message: "Board added successfully",
      data: newBoard,
    });
  } catch (error) {
    next(error);
  }
};

export const getBoards: RequestHandler = async (req, res, next) => {
  try {
    const boards = await boardService.findBoards({ owner: req.user!._id });

    sendSuccessResponse(res, 200, {
      message: "Boards retrieved successfully",
      data: boards,
    });
  } catch (error) {
    next(error);
  }
};

export const getBoard: RequestHandler = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    validateData({ boardId });

    const board = await boardService.findBoard({
      owner: req.user!._id,
      _id: new Types.ObjectId(boardId as string),
    });
    if (!board) throw createError("NotFoundError", "Board not found");

    sendSuccessResponse(res, 200, {
      message: "Board retrieved successfully",
      data: board,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBoard: RequestHandler = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title, icon, background } = req.body;
    validateData({ boardId, title, icon, background });

    const updatedBoard = await boardService.updateBoard(
      { owner: req.user!._id, _id: new Types.ObjectId(boardId as string) },
      { title: title.trim(), icon, background },
    );
    if (!updatedBoard) throw createError("NotFoundError", "Board not found");

    sendSuccessResponse(res, 200, {
      message: "Board updated successfully",
      data: updatedBoard,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBoard: RequestHandler = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    validateData({ boardId });

    const deletedBoard = await boardService.deleteBoard({
      owner: req.user!._id,
      _id: new Types.ObjectId(boardId as string),
    });
    if (!deletedBoard) throw createError("NotFoundError", "Board not found");

    sendSuccessResponse(res, 200, {
      message: "Board deleted successfully",
      data: deletedBoard,
    });
  } catch (error) {
    next(error);
  }
};

// Columns
export const addColumn: RequestHandler = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title } = req.body;
    validateData({ boardId, title });

    const query = {
      owner: req.user!._id,
      _id: new Types.ObjectId(boardId as string),
    };
    const data = { title: title.trim() };
    const addedColumn = await boardService.addColumn(query, data);

    if (!addedColumn) {
      const board = await boardService.findBoard(query);
      if (!board) throw createError("NotFoundError", "Board not found");

      throw createError(
        "ConflictError",
        "Title is already in use by another column",
      );
    }

    sendSuccessResponse(res, 201, {
      message: "Column added successfully",
      data: addedColumn,
    });
  } catch (error) {
    next(error);
  }
};

export const updateColumn: RequestHandler = async (req, res, next) => {
  try {
    const { boardId, columnId } = req.params;
    const { title } = req.body;
    validateData({ boardId, columnId, title });

    const query = {
      owner: req.user!._id,
      _id: new Types.ObjectId(boardId as string),
      "columns._id": new Types.ObjectId(columnId as string),
    };
    const data = { title: title.trim() };
    const updatedColumn = await boardService.updateColumn(query, data);

    if (!updatedColumn) {
      const board = await boardService.findBoard({
        owner: query.owner,
        _id: query._id,
      });
      if (!board) throw createError("NotFoundError", "Board not found");

      const column = board.columns.find((item) =>
        item._id.equals(query["columns._id"]),
      );
      if (!column) throw createError("NotFoundError", "Column not found");

      throw createError(
        "ConflictError",
        "Title is already in use by another column",
      );
    }

    sendSuccessResponse(res, 200, {
      message: "Column updated successfully",
      data: updatedColumn,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteColumn: RequestHandler = async (req, res, next) => {
  try {
    const { boardId, columnId } = req.params;
    validateData({ boardId, columnId });

    const query = {
      owner: req.user!._id,
      _id: new Types.ObjectId(boardId as string),
      "columns._id": new Types.ObjectId(columnId as string),
    };
    const deletedColumn = await boardService.deleteColumn(query);

    if (!deletedColumn) {
      const board = await boardService.findBoard({
        owner: query.owner,
        _id: query._id,
      });
      if (!board) throw createError("NotFoundError", "Board not found");

      throw createError("NotFoundError", "Column not found");
    }

    sendSuccessResponse(res, 200, {
      message: "Column deleted successfully",
      data: deletedColumn,
    });
  } catch (error) {
    next(error);
  }
};

// Cards
export const addCard: RequestHandler = async (req, res, next) => {
  try {
    const { boardId, columnId } = req.params;
    const { title, description, priority, deadline } = req.body;
    validateData({ boardId, columnId, title, description, priority, deadline });

    const query = {
      owner: req.user!._id,
      _id: new Types.ObjectId(boardId as string),
      "columns._id": new Types.ObjectId(columnId as string),
    };
    const data = {
      title: title.trim(),
      description: description.trim(),
      priority,
      deadline,
    };
    const addedCard = await boardService.addCard(query, data);

    if (!addedCard) {
      const board = await boardService.findBoard({
        owner: query.owner,
        _id: query._id,
      });
      if (!board) throw createError("NotFoundError", "Board not found");

      const column = board.columns.find((item) =>
        item._id.equals(query["columns._id"]),
      );
      if (!column) throw createError("NotFoundError", "Column not found");

      throw createError(
        "ConflictError",
        "Title is already in use by another card in this column",
      );
    }

    sendSuccessResponse(res, 201, {
      message: "Card added successfully",
      data: addedCard,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCard: RequestHandler = async (req, res, next) => {
  try {
    const { boardId, columnId, cardId } = req.params;
    const { title, description, priority, deadline } = req.body;
    validateData({
      boardId,
      columnId,
      cardId,
      title,
      description,
      priority,
      deadline,
    });

    const query = {
      owner: req.user!._id,
      _id: new Types.ObjectId(boardId as string),
      "columns._id": new Types.ObjectId(columnId as string),
      "columns.cards._id": new Types.ObjectId(cardId as string),
    };
    const data = {
      title: title.trim(),
      description: description.trim(),
      priority,
      deadline,
    };
    const updatedCard = await boardService.updateCard(query, data);

    if (!updatedCard) {
      const board = await boardService.findBoard({
        owner: query.owner,
        _id: query._id,
      });
      if (!board) throw createError("NotFoundError", "Board not found");

      const column = board.columns.find((item) =>
        item._id.equals(query["columns._id"]),
      );
      if (!column) throw createError("NotFoundError", "Column not found");

      const card = column.cards.find((item) =>
        item._id.equals(query["columns.cards._id"]),
      );
      if (!card) throw createError("NotFoundError", "Card not found");

      throw createError(
        "ConflictError",
        "Title is already in use by another card in this column",
      );
    }

    sendSuccessResponse(res, 200, {
      message: "Card updated successfully",
      data: updatedCard,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCard: RequestHandler = async (req, res, next) => {
  try {
    const { boardId, columnId, cardId } = req.params;
    validateData({ boardId, columnId, cardId });

    const query = {
      owner: req.user!._id,
      _id: new Types.ObjectId(boardId as string),
      "columns._id": new Types.ObjectId(columnId as string),
      "columns.cards._id": new Types.ObjectId(cardId as string),
    };
    const deletedCard = await boardService.deleteCard(query);

    if (!deletedCard) {
      const board = await boardService.findBoard({
        owner: query.owner,
        _id: query._id,
      });
      if (!board) throw createError("NotFoundError", "Board not found");

      const column = board.columns.find((item) =>
        item._id.equals(query["columns._id"]),
      );
      if (!column) throw createError("NotFoundError", "Column not found");

      throw createError("NotFoundError", "Card not found");
    }

    sendSuccessResponse(res, 200, {
      message: "Card deleted successfully",
      data: deletedCard,
    });
  } catch (error) {
    next(error);
  }
};
