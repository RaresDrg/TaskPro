import { useState } from "react";
import { renderIcon } from "../../utils/utils";
import ThemeDropdownList from "../ThemeDropdownList/ThemeDropdownList.styled";

type Props = {
  className?: string;
};

const ThemeDropdown = ({ className: styles }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles}>
      <button
        type="button"
        className={`dropdown-trigger ${isOpen ? "triggered" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <span>Theme</span>
        {renderIcon("icon-dropdown")}
      </button>

      {isOpen && <ThemeDropdownList setIsOpen={setIsOpen} />}
    </div>
  );
};

export default ThemeDropdown;
