import styled from "styled-components";
import DeadlineIcon from "./DeadlineIcon";

const StyledDeadlineIcon = styled(DeadlineIcon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  stroke: ${(props) => props.theme.highlightColorActive};
  margin-top: 3px;
  margin-right: 4px;
  transition: var(--transition);

  &:hover {
    stroke: var(--error-color);
    filter: drop-shadow(0 0 5px grey) drop-shadow(0 0 10px grey)
      drop-shadow(0 0 15px grey);
  }
`;

export default StyledDeadlineIcon;
