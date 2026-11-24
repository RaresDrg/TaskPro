import styled from "styled-components";
import EllipsisTooltip from "./EllipsisTooltip";

const StyledEllipsisTooltip = styled(EllipsisTooltip)`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`;

export default StyledEllipsisTooltip;
