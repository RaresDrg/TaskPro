import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";
import { BREAKPOINTS } from "../../../../constants";

const StyledLoadingScreen = styled(LoadingScreen)`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background: #151515a6;
  cursor: wait;
  overflow: auto;
  scrollbar-width: none;
  animation: fadeIn 0.5s ease-in-out both;

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    > video {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      height: 100dvh;
      filter: contrast(65%) brightness(25%);
    }

    > div {
      min-width: var(--layout-min-width);
      margin: auto;
      padding: 50px;

      & {
        .loader {
          display: block;
          font-weight: 700;
          font-size: 2.5rem;
          line-height: 1.5;
          letter-spacing: 0.04em;
          text-align: center;
          color: var(--text-color-light);
          mix-blend-mode: difference;
          opacity: 0.7;
          animation: pulseSmooth 1s infinite ease-in-out;
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > div {
        & {
          .loader {
            font-size: 3.125rem;
          }
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.desktop}) {
    & {
      > div {
        & {
          .loader {
            font-size: 3.75rem;
          }
        }
      }
    }
  }
`;

export default StyledLoadingScreen;
