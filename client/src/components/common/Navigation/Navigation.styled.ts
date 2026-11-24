import styled from "styled-components";
import Navigation from "./Navigation";

const StyledNavigation = styled(Navigation)`
  display: flex;
  align-items: center;
  gap: 14px;

  & {
    > a:not(.google-link) {
      font-weight: 500;
      font-size: 1.125rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      color: var(--text-color-light);
      opacity: 0.3;
      transition: var(--transition);

      &.active {
        opacity: 1;
        font-weight: 600;
        cursor: not-allowed;
      }

      &:not(.active):hover,
      &:not(.active):focus-visible {
        opacity: 0.75;
      }
    }

    .google-link {
      width: 100px;
      height: 100px;
      position: absolute;
      top: -50px;
      right: -50px;
      transform: rotate(45deg);
      display: flex;
      justify-content: center;
      align-items: end;
      opacity: 0.5;
      background-color: #cececee6;
      transition: var(--transition);

      & {
        > svg {
          width: 33px;
          height: 33px;
          transform: rotate(-45deg);
          margin-left: 6px;
          margin-bottom: 2px;
        }
      }

      &:hover,
      &:focus-visible {
        opacity: 1;
        background-color: #ecedfd;
      }
    }
  }
`;

export default StyledNavigation;
