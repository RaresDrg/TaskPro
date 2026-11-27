import styled from "styled-components";
import CardsList from "./CardsList";

const StyledCardsList = styled(CardsList)`
  flex: 1 0 300px;
  max-height: fit-content;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #808080 transparent;

  &:not(:has(> li)) {
    min-height: 14px;
  }

  &:has(> li) {
    margin: 14px 0;
  }
`;

export default StyledCardsList;
