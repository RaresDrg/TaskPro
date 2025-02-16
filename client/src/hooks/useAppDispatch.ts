import { useDispatch } from "react-redux";
import { AppDispatch } from "../App.types";

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
