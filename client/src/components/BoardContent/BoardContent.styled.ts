import styled from "styled-components";
import BoardContent from "./BoardContent";
import { BREAKPOINTS } from "../../constants";

const StyledBoardContent = styled(BoardContent)`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  & {
    .board-title {
      flex-shrink: 0;
      font-weight: 700;
      font-size: 1rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      color: var(--text-color-light);
      text-shadow:
        0 1px 2px #00000099,
        0 2px 8px #00000066;
      text-align: center;
      max-width: fit-content;
      min-width: 120px;
      padding: 8px 23px;
      border-radius: 40px 0;
      border: 0.5px solid #808080;
      background-color: ${({ theme }) =>
        theme.value === "violet" ? "#5255bcbf" : "#9dc888bf"};
      -webkit-backdrop-filter: blur(5px);
      backdrop-filter: blur(5px);
      box-shadow: 0 4px 30px #0000001a;
      transition: var(--transition);

      &:has(+ button) {
        width: calc(100% - 120px);
      }
    }

    > div {
      flex: 1;
      display: flex;
      gap: 20px;
      margin-top: 20px;
      padding-bottom: 20px;
      overflow-x: auto;

      &::-webkit-scrollbar {
        height: 12px;
        border-radius: 12px;
        background-color: ${({ theme }) =>
          theme.value === "dark" ? "#FFFFFF1A" : "#1616161A"};
        cursor: pointer;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 12px;
        background-color: ${({ theme }) =>
          theme.value === "violet" ? "#b8bcfd99" : "#bedbb099"};
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) =>
            theme.value === "violet" ? "#b8bcfd" : "#bedbb0"};
        }
      }

      @supports not selector(::-webkit-scrollbar) {
        scrollbar-width: thin;
        scrollbar-color: ${({ theme }) => {
          const thumb = theme.value === "violet" ? "#b8bcfd" : "#bedbb0";
          const track = theme.value === "dark" ? "#FFFFFF1A" : "#1616161A";
          return `${thumb} ${track}`;
        }};
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      .board-title {
        font-size: 1.125rem;
      }
    }
  }
`;

export default StyledBoardContent;
