import {
  useRef,
  useEffect,
  type EffectCallback,
  type DependencyList,
} from "react";

const useUpdateEffect = (effect: EffectCallback, depsList: DependencyList) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect();
  }, depsList);
};

export default useUpdateEffect;
