import styled from "styled-components";
import ThemeDropdownList from "./ThemeDropdownList";

const StyledThemeDropdownList = styled(ThemeDropdownList)`
  &.dropdown-list {
    pointer-events: auto;
    width: 100px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-radius: 8px;
    padding: 18px 44px 18px 18px;
    position: absolute;
    z-index: 50;
    right: 50%;
    transform: translateX(50%);
    box-shadow: 0px 4px 16px 0px #1111111a;
    border: 1px solid grey;
    background-color: ${(props) => props.theme.headerBg};
    transition: var(--transition);
    animation: showDropdown 0.35s ease-in-out forwards;

    &.hidden {
      animation: hideDropdown 0.35s ease-in-out forwards;
    }

    &:before {
      content: "";
      height: 20px;
      width: 20px;
      position: absolute;
      top: -10px;
      right: 50%;
      transform: translateX(50%) rotate(-45deg);
      border-bottom: 1px solid transparent;
      border-left: 1px solid transparent;
      border-top: 1px solid grey;
      border-right: 1px solid grey;
      background-color: ${(props) => props.theme.headerBg};
      transition: var(--transition);
    }

    & {
      li {
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: -0.02em;
        text-transform: capitalize;
        cursor: pointer;
        color: ${(props) => props.theme.textColor};
        opacity: 0.5;
        transition: var(--transition);

        &:hover {
          opacity: 1;
        }

        &.active {
          font-weight: bold;
          opacity: 1;
          color: ${(props) => props.theme.highlightColorActive};
        }
      }
    }

    @keyframes showDropdown {
      from {
        opacity: 0;
        top: 30px;
      }

      to {
        opacity: 1;
        top: 45px;
      }
    }

    @keyframes hideDropdown {
      from {
        opacity: 1;
        top: 45px;
      }

      to {
        opacity: 0;
        top: 30px;
      }
    }
  }
`;

export default StyledThemeDropdownList;
