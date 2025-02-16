import LeftSidebar from "../common/LeftSidebar/LeftSidebar.styled";
import { useRef, MouseEvent } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { setBurgerMenuClose } from "../../redux/modals/slice";

type Props = {
  className?: string;
};

const BurgerMenu = ({ className: styles }: Props) => {
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  function handleClick(e: MouseEvent) {
    if (e.target === e.currentTarget) return close();

    const availableTargets = document.querySelectorAll(
      '[data-secondary-action="close burger menu"]'
    );

    [...availableTargets].forEach((el) => {
      if (el.contains(e.target as HTMLElement)) {
        close();
      }
    });
  }

  function close() {
    if (burgerMenuRef.current) {
      burgerMenuRef.current.classList.add("hidden");
      setTimeout(() => dispatch(setBurgerMenuClose()), 500);
    }
  }

  return (
    <div className={styles} ref={burgerMenuRef} onClick={handleClick}>
      <LeftSidebar />
    </div>
  );
};

export default BurgerMenu;
