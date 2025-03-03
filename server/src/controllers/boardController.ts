import { Request, Response, NextFunction } from "express";
import * as boardService from "../servicies/boardService.js";
import * as utils from "../utils/utils.js";
import validateData from "../config/config-validation.js";
import { UserType } from "../app.types.js";

async function addBoard(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, icon, background } = req.body;
    validateData({ title, icon, background });

    const owner = (req.user as UserType)._id;

    const existingDoc = await boardService.findDocument({ title, owner });
    if (existingDoc) {
      const message = "The title is already being used by another board.";
      utils.sendFailureResponse(res, 409, message);
      return;
    }

    const data = { title, icon, background: utils.getBg(background), owner };
    const newBoard = await boardService.addBoardToDB(data);
    const currentBoardsList = await boardService.getBoardsListFromDB(owner);

    utils.sendSuccessResponse(res, 201, {
      message: "The board has been successfully added",
      data: { board: newBoard, boardsList: currentBoardsList },
    });
  } catch (error) {
    next(error);
  }
}

async function getBoardsList(req: Request, res: Response, next: NextFunction) {
  try {
    const owner = (req.user as UserType)._id;
    const boardsList = await boardService.getBoardsListFromDB(owner);

    if (boardsList.length === 0) {
      const message = "There are no boards saved in the database.";
      utils.sendSuccessResponse(res, 200, { data: null, message });
      return;
    }

    utils.sendSuccessResponse(res, 200, { data: boardsList });
  } catch (error) {
    next(error);
  }
}

async function getBoard(req: Request, res: Response, next: NextFunction) {
  try {
    const { boardId } = req.params;
    const board = await boardService.findDocument({ _id: boardId });

    if (!board) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    utils.sendSuccessResponse(res, 200, { data: board });
  } catch (error) {
    next(error);
  }
}

async function deleteBoard(req: Request, res: Response, next: NextFunction) {
  try {
    const { boardId } = req.params;
    const result = await boardService.deleteBoardFromDB(boardId);
    if (!result) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const owner = (req.user as UserType)._id;
    const currentBoardsList = await boardService.getBoardsListFromDB(owner);

    utils.sendSuccessResponse(res, 200, {
      message: "The board has been successfully deleted",
      data: currentBoardsList.length > 0 ? currentBoardsList : null,
    });
  } catch (error) {
    next(error);
  }
}

async function updateBoard(req: Request, res: Response, next: NextFunction) {
  try {
    const { boardId } = req.params;

    const targetedBoard = await boardService.findDocument({ _id: boardId });
    if (!targetedBoard) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const { title, icon, background } = req.body;
    validateData({ title, icon, background });

    const owner = (req.user as UserType)._id;

    const existingDoc = await boardService.findDocument({ title, owner });
    if (existingDoc && existingDoc.id !== boardId) {
      const message = "The title is already being used by another board.";
      utils.sendFailureResponse(res, 409, message);
      return;
    }

    const updates = { title, icon, background: utils.getBg(background) };
    const updatedBoard = await boardService.updateBoardInDB(boardId, updates);
    const currentBoardsList = await boardService.getBoardsListFromDB(owner);

    utils.sendSuccessResponse(res, 200, {
      message: "The board has been successfully updated",
      data: { board: updatedBoard, boardsList: currentBoardsList },
    });
  } catch (error) {
    next(error);
  }
}

async function addColumn(req: Request, res: Response, next: NextFunction) {
  try {
    const { boardId } = req.params;

    const board = await boardService.findDocument({ _id: boardId });
    if (!board) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const { title } = req.body;
    validateData({ title });

    const isDuplicate = board.columns.some((column) => column.title === title);
    if (isDuplicate) {
      const message = "The title is already being used by another column.";
      utils.sendFailureResponse(res, 409, message);
      return;
    }

    const updatedBoard = await boardService.addColumnToDB(boardId, { title });

    utils.sendSuccessResponse(res, 201, {
      message: "The column has been successfully added",
      data: { columns: updatedBoard!.columns },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteColumn(req: Request, res: Response, next: NextFunction) {
  try {
    const { boardId, columnId } = req.params;
    const ids = { boardId, columnId };
    const updatedBoard = await boardService.deleteColumnFromDB(ids);

    if (!updatedBoard) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    utils.sendSuccessResponse(res, 200, {
      message: "The column has been successfully deleted",
      data: { columns: updatedBoard.columns },
    });
  } catch (error) {
    next(error);
  }
}

async function updateColumn(req: Request, res: Response, next: NextFunction) {
  try {
    const { boardId, columnId } = req.params;

    const query = { _id: boardId, "columns._id": columnId };
    const board = await boardService.findDocument(query);
    if (!board) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const { title } = req.body;
    validateData({ title });

    const isDuplicate = board.columns.some(
      (column) => column.title === title && column.id !== columnId
    );
    if (isDuplicate) {
      const message = "The title is already being used by another column.";
      utils.sendFailureResponse(res, 409, message);
      return;
    }

    const ids = { boardId, columnId };
    const updatedBoard = await boardService.updateColumnInDB(ids, title);

    utils.sendSuccessResponse(res, 200, {
      message: "The column has been successfully updated",
      data: { columns: updatedBoard!.columns },
    });
  } catch (error) {
    next(error);
  }
}

async function updateColumns(req: Request, res: Response, next: NextFunction) {
  try {
    const { boardId } = req.params;

    const targetedBoard = await boardService.findDocument({ _id: boardId });
    if (!targetedBoard) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const { columns } = req.body;
    validateData({ columns });

    const updatedBoard = await boardService.updateColumnsInDB(boardId, columns);

    utils.sendSuccessResponse(res, 200, {
      message: "The board's columns have been successfully updated",
      data: { columns: updatedBoard!.columns },
    });
  } catch (error) {
    next(error);
  }
}

async function addCard(req: Request, res: Response, next: NextFunction) {
  try {
    const { boardId, columnId } = req.params;

    const query = { _id: boardId, "columns._id": columnId };
    const board = await boardService.findDocument(query);
    if (!board) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const { title, description, priority, deadline } = req.body;
    validateData({ title, description, priority, deadline });

    const isDuplicate = board.columns
      .filter((column) => column.id === columnId)
      .flatMap((column) => column.cards)
      .some((card) => card.title === title);

    if (isDuplicate) {
      const message = "The title is already being used by another card.";
      utils.sendFailureResponse(res, 409, message);
      return;
    }

    const ids = { boardId, columnId };
    const newCard = {
      title,
      description,
      priority,
      deadline: new Date(deadline).toDateString(),
    };
    const updatedBoard = await boardService.addCardToDB(ids, newCard);

    utils.sendSuccessResponse(res, 201, {
      message: "The card has been successfully added",
      data: { columns: updatedBoard!.columns },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteCard(req: Request, res: Response, next: NextFunction) {
  try {
    const { boardId, columnId, cardId } = req.params;
    const ids = { boardId, columnId, cardId };
    const updatedBoard = await boardService.deleteCardFromDB(ids);

    if (!updatedBoard) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    utils.sendSuccessResponse(res, 200, {
      message: "The card has been successfully deleted",
      data: { columns: updatedBoard.columns },
    });
  } catch (error) {
    next(error);
  }
}

async function updateCard(req: Request, res: Response, next: NextFunction) {
  try {
    const { boardId, columnId, cardId } = req.params;

    const query = {
      _id: boardId,
      "columns._id": columnId,
      "columns.cards._id": cardId,
    };
    const board = await boardService.findDocument(query);
    if (!board) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const { title, description, priority, deadline } = req.body;
    validateData({ title, description, priority, updatedDeadline: deadline });

    const isDuplicate = board.columns
      .filter((column) => column.id === columnId)
      .flatMap((column) => column.cards)
      .some((card) => card.title === title && card.id !== cardId);

    if (isDuplicate) {
      const message = "The title is already being used by another card.";
      utils.sendFailureResponse(res, 409, message);
      return;
    }

    const ids = { boardId, columnId, cardId };
    const updates = {
      title,
      description,
      priority,
      deadline: new Date(deadline).toDateString(),
    };
    const updatedBoard = await boardService.updateCardInDB(ids, updates);

    utils.sendSuccessResponse(res, 200, {
      message: "The card has been successfully updated",
      data: { columns: updatedBoard!.columns },
    });
  } catch (error) {
    next(error);
  }
}

export default {
  addBoard,
  getBoardsList,
  getBoard,
  deleteBoard,
  updateBoard,
  updateColumns,
  addColumn,
  deleteColumn,
  updateColumn,
  addCard,
  deleteCard,
  updateCard,
};
