import { useEffect, useRef } from "react";
import { EventTypes } from "../App.types";

const useEventListener = (
  eventType: keyof EventTypes,
  callback: (e: Event) => void,
  element: EventTarget = document
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => {
      element.removeEventListener(eventType, handler);
    };
  }, [eventType, element]);
};

export default useEventListener;
