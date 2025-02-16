import styled from "styled-components";
import BoardColumn from "./BoardColumn";

const StyledBoardColumn = styled(BoardColumn)`
  flex: 0 0 347px;
  max-height: fit-content;
  display: flex;
  flex-direction: column;

  & {
    div.column-heading {
      width: 335px;
      height: 56px;
      padding: 18px 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: ${(props) => props.theme.addColumnBg};
      transition: var(--transition);

      & {
        div.action-icons {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${(props) => props.theme.textColor};
          margin-bottom: 5px;
        }
      }
    }

    div.cards-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;

      &:not(:has(> div)) {
        height: 14px;
      }

      &:has(> div) {
        margin-top: 14px;
        margin-bottom: 14px;
      }

      &::-webkit-scrollbar {
        width: 8px;
        border-radius: 12px;
        background-color: #e8e8e8;
        cursor: pointer;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 12px;
        background-color: grey;
        cursor: move;

        &:hover {
          background-color: ${(props) => props.theme.highlightColorActive};
        }
      }
    }

    div.column-heading ~ button {
      flex: 0 0 56px;
      width: 335px;

      &:hover {
        box-shadow: none;
        transform: scale(1);
      }
    }
  }

  @media (min-width: 768px) {
    flex: 0 0 351px;
  }
`;

export default StyledBoardColumn;
