import { createElement, type ComponentType } from "react";
import type { LoadingType } from "../../../types";
import { useReduxState } from "../../../hooks";
import { LoadingScreen, LoadingSpinner } from ".";

const loaderMap: Record<LoadingType, ComponentType> = {
  screen: LoadingScreen,
  spinner: LoadingSpinner,
};

const GlobalLoading = () => {
  const activeLoader = useReduxState("selectActiveLoader");
  return activeLoader ? createElement(loaderMap[activeLoader]) : null;
};

export default GlobalLoading;
