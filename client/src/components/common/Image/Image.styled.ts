import styled from "styled-components";
import Image from "./Image";

const StyledImage = styled(Image)`
  opacity: 0.65;
  filter: blur(6px);
  transition:
    opacity 0.4s ease-in-out,
    filter 0.4s ease-in-out;

  &[data-loaded="true"] {
    opacity: 1;
    filter: blur(0px);
  }
`;

export default StyledImage;
