import styled from "styled-components";
import BoardPage from "./BoardPage";
import { BREAKPOINTS } from "../../constants";

const StyledBoardPage = styled(BoardPage)`
  min-width: 0;
  padding: 0;

  & {
    > div.container {
      height: 100%;
      padding: 20px;

      & {
        .fallback {
          max-width: fit-content;
          padding: 16px;
          border-radius: 8px;
          border: 0.5px solid #808080;
          background: #80808080;
          text-align: center;
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.5;
          letter-spacing: -0.02em;
          color: ${({ theme }) =>
            theme.value === "dark"
              ? "var(--text-color-light)"
              : "var(--text-color-dark)"};
          transition: var(--transition);
          animation: fadeIn 0.35s ease-in-out;
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > div.container {
        padding: 32px;
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.desktop}) {
    & {
      > div.container {
        padding: 24px;
      }
    }
  }
`;

export default StyledBoardPage;
