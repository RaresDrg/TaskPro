import styled from "styled-components";
import VideoBackground from "./VideoBackground";

const StyledVideoBackground = styled(VideoBackground)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

export default StyledVideoBackground;
