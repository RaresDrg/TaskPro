import styled from "styled-components";
import BoardColumns from "./BoardColumns";

const StyledBoardColumns = styled(BoardColumns)`
  flex: 1;
  display: flex;
  gap: 18px;
  padding-bottom: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 12px;
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
`;

export default StyledBoardColumns;
