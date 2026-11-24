import { useEffect } from "react";
import useAppDispatch from "./useAppDispatch";
import { handleRequestFlow } from "../utils";
import { boardService } from "../services";
import { setBoardsList } from "../redux/boards/actions";

const useLoadBoards = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleRequestFlow({
      request: () => boardService.getBoards(),
      onSuccess: (res) => dispatch(setBoardsList(res.data)),
    });
  }, [dispatch]);
};

export default useLoadBoards;
