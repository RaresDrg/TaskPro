import styled from "styled-components";
import FormTitle from "./FormTitle";

const StyledFormTitle = styled(FormTitle)`
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 24px;
`;

export default StyledFormTitle;
