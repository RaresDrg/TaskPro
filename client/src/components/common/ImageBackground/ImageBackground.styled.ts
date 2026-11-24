import styled from "styled-components";
import ImageBackground from "./ImageBackground";

const StyledImageBackground = styled(ImageBackground)`
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1s ease-in-out;

    &[data-loaded="true"] {
      opacity: 1;
    }
  }
`;

export default StyledImageBackground;
