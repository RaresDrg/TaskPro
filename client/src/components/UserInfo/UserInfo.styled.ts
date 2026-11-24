import styled from "styled-components";
import UserInfo from "./UserInfo";
import { BREAKPOINTS } from "../../constants";

const StyledUserInfo = styled(UserInfo)`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  width: 0;
  max-width: fit-content;

  & {
    .username {
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      color: ${({ theme }) =>
        theme.value === "dark"
          ? "var(--text-color-light)"
          : "var(--text-color-dark)"};
      transition: var(--transition);
    }

    .profile-photo {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: 0.2px solid #808080cc;
      overflow: hidden;
      transition: var(--transition);

      &:hover,
      &:focus-visible {
        transform: scale(0.9);
        opacity: 0.5;
      }

      &:has(> img) {
        & {
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

      &:has(> svg) {
        padding: 8px 3px 0 3px;
        background-color: ${({ theme }) => {
          if (theme.value === "dark") return "#1F1F1F";
          if (theme.value === "light") return "#F6F6F7";
          if (theme.value === "violet") return "#ECEDFD";
        }};
        transition: var(--transition);

        & {
          > svg {
            width: 100%;
            height: 100%;
            fill: #808080;
          }
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      .username {
        font-size: 1rem;
      }

      .profile-photo {
        width: 36px;
        height: 36px;
      }
    }
  }
`;

export default StyledUserInfo;
