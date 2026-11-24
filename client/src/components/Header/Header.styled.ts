import styled from "styled-components";
import Header from "./Header";

const StyledHeader = styled(Header)`
  height: 60px;
  border-bottom: 1px solid #80808033;
  background-color: ${({ theme }) =>
    theme.value === "dark" ? "#161616" : "#fcfcfc"};
  transition: var(--transition);

  & {
    > div {
      height: 100%;
      display: flex;
      align-items: center;
      gap: 25px;
    }
  }
`;

export default StyledHeader;
