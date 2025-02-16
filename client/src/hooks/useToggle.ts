import { useState } from "react";

type ToggleReturnType = [boolean, (updatedValue?: boolean) => void];

const useToggle = (initialValue: boolean): ToggleReturnType => {
  const [value, setValue] = useState(initialValue);

  function toggleValue(updatedValue?: boolean) {
    setValue((prevValue) => updatedValue ?? !prevValue);
  }

  return [value, toggleValue];
};

export default useToggle;
