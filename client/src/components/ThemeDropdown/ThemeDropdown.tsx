import { useState, useRef, useId, useEffect, type KeyboardEvent } from "react";
import { useTheme } from "styled-components";
import { Icon } from "../common";
import { THEMES } from "../../constants";
import { setUserTheme } from "../../redux/auth/actions";
import { userService } from "../../services";
import { handleRequestFlow } from "../../utils";
import { useAppDispatch } from "../../hooks";

type Props = {
  className?: string;
};

const ThemeDropdown = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const triggerBtnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const listId = useId();
  const { value: userTheme } = useTheme();
  const dispatch = useAppDispatch();

  function handleListOpen() {
    setIsOpen(true);
    setHighlightIndex(THEMES.indexOf(userTheme!));
  }

  function handleListClosing() {
    const listEl = listRef.current;
    if (!listEl || listEl.classList.contains("hidden")) return;

    listEl.classList.add("hidden");

    const handleAnimationEnd = (e: AnimationEvent) => {
      if (e.target === listEl) {
        listEl.removeEventListener("animationend", handleAnimationEnd);
        setIsOpen(false);
      }
    };
    listEl.addEventListener("animationend", handleAnimationEnd);
  }

  function handleSelect(selectedTheme: (typeof THEMES)[number]) {
    if (selectedTheme !== userTheme) {
      dispatch(setUserTheme(selectedTheme));
      handleRequestFlow({
        request: () => userService.updateUserTheme({ theme: selectedTheme }),
      });
    }
  }

  function handleOptionClick(option: (typeof THEMES)[number]) {
    handleSelect(option);
    handleListClosing();
  }

  function handleListKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "Escape": {
        triggerBtnRef.current?.focus();
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev === THEMES.length - 1 ? 0 : prev + 1,
        );
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev === 0 ? THEMES.length - 1 : prev - 1,
        );
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        handleSelect(THEMES[highlightIndex]);
        triggerBtnRef.current?.focus();
        break;
      }
    }
  }

  function handleTriggerBtnKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      handleListOpen();
    }
  }

  function handleTriggerBtnClick() {
    if (!isOpen) handleListOpen();
    else handleListClosing();
  }

  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  return (
    <div className={className}>
      <button
        type="button"
        ref={triggerBtnRef}
        className="dropdown-trigger"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleTriggerBtnClick}
        onKeyDown={handleTriggerBtnKeyDown}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-expanded={isOpen}
      >
        <span>Theme</span>
        <Icon name="icon-dropdown" />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          className="dropdown-list"
          onKeyDown={handleListKeyDown}
          onBlur={handleListClosing}
          tabIndex={0}
          role="listbox"
          aria-label="Theme"
          id={listId}
          aria-activedescendant={`${listId}-option-${highlightIndex}`}
        >
          {THEMES.map((item, index) => (
            <li key={item} role="none">
              <button
                type="button"
                className={`${index === highlightIndex ? "active" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleOptionClick(item)}
                tabIndex={-1}
                role="option"
                id={`${listId}-option-${index}`}
                aria-selected={item === userTheme}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeDropdown;
