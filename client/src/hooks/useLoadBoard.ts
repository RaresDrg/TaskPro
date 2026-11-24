import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAppDispatch from "./useAppDispatch";
import useReduxState from "./useReduxState";
import { handleRequestFlow, notify } from "../utils";
import { boardService } from "../services";
import { setBoard } from "../redux/boards/actions";

const useLoadBoard = () => {
  const [error, setError] = useState<null | string>(null);

  const { boardId } = useParams();
  const board = useReduxState("selectBoard");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (board && board.id === boardId) return;

    handleRequestFlow({
      request: () => boardService.getBoard(boardId!),
      delay: 1000,
      loadingType: "spinner",
      onSuccess: (res) => dispatch(setBoard(res.data)),
      onError: (error) => {
        if (error.status === 400 || error.status === 404) {
          navigate("/not-found", { replace: true });
          notify.error("The board you are trying to access does not exist.");
          return;
        }
        notify.errorResponse(error);
        setError(
          "We couldn't load the board's information due to a server issue. Please try again later.",
        );
      },
    });

    return () => setError(null);
  }, [boardId, dispatch, navigate]);

  return {
    error,
    board: board && board.id === boardId ? board : null,
  };
};

export default useLoadBoard;
