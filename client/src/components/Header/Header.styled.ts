import styled from "styled-components";
import Header from "./Header";

const StyledHeader = styled(Header)`
  padding: 14px 0px;
  background-color: ${(props) => props.theme.headerBg};
  transition: var(--transition);

  & > div {
    display: flex;
    align-items: center;
    min-width: 100%;
  }

  @media (min-width: 768px) {
    padding: 18px 0px;
  }

  @media (min-width: 1440px) {
    margin-left: 260px;
  }
`;

export default StyledHeader;
