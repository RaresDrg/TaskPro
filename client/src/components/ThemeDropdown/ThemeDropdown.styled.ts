import styled from "styled-components";
import ThemeDropdown from "./ThemeDropdown";

const StyledThemeDropdown = styled(ThemeDropdown)`
  margin-left: auto;
  margin-right: 20px;
  position: relative;

  & {
    button.dropdown-trigger {
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      letter-spacing: -0.02em;
      opacity: 0.7;
      display: flex;
      align-items: center;
      gap: 4px;
      color: ${(props) => props.theme.textColor};
      transition: var(--transition);

      &:before {
        content: "";
        height: 1.5px;
        width: 0;
        border-radius: 8px;
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: ${(props) => props.theme.highlightColor};
        transition: var(--transition);
      }

      &:hover,
      &.triggered {
        opacity: 1;

        &:before {
          width: 100%;
          left: 0;
        }
      }

      & > svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export default StyledThemeDropdown;
