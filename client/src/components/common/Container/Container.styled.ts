import styled from "styled-components";
import { BREAKPOINTS } from "../../../constants";

const Container = styled.div`
  min-width: var(--layout-min-width);
  padding: 0 20px;

  @media (min-width: ${BREAKPOINTS.tablet}) {
    padding: 0 32px;
  }

  @media (min-width: ${BREAKPOINTS.desktop}) {
    padding: 0 24px;
  }
`;

export default Container;
