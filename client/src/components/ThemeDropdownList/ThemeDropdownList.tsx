import { useAuth, useAppDispatch, useEventListener } from "../../hooks/hooks";
import { setTheme } from "../../redux/auth/slice";
import { updateTheme } from "../../redux/auth/operations";
import { THEMES } from "../../constants/constants";
import { Theme } from "../../App.types";

type Props = {
  className?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeDropdownList = ({ className: styles, setIsOpen }: Props) => {
  const { theme } = useAuth();
  const dispatch = useAppDispatch();

  useEventListener("mousedown", handleDropdown);

  function handleDropdown(e: Event) {
    const dropdownList = document.querySelector(".dropdown-list");

    if (e.target !== dropdownList) {
      dropdownList?.classList.add("hidden");
      setTimeout(() => setIsOpen(false), 200);

      if (
        e.target instanceof HTMLLIElement &&
        dropdownList?.contains(e.target) &&
        !e.target.classList.contains("active")
      ) {
        const chosenTheme = e.target.textContent as Theme;

        dispatch(setTheme(chosenTheme));
        updateTheme(chosenTheme);
      }
    }
  }

  return (
    <ul className={`${styles} dropdown-list`}>
      {THEMES.map((themeItem, index) => (
        <li key={index} className={themeItem === theme ? "active" : ""}>
          {themeItem}
        </li>
      ))}
    </ul>
  );
};

export default ThemeDropdownList;
