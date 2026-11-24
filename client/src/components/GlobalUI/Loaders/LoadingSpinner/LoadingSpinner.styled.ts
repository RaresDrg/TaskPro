import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const StyledLoadingSpinner = styled(LoadingSpinner)`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background: #151515a6;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  cursor: wait;
  overflow: auto;
  scrollbar-width: none;
  animation: fadeIn 0.5s ease-in-out both;

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    > div {
      min-width: var(--layout-min-width);
      margin: auto;
      padding: 50px;

      & {
        .loader {
          display: block;
          width: 220px;
          aspect-ratio: 1/1;
          position: relative;

          &::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            filter: drop-shadow(0 0 16px #ffffffbf);
            box-shadow: inset 0 0 0 22px var(--text-color-light);
            animation: pulsIn 1.2s ease-in-out infinite;
          }

          &::after {
            content: "";
            position: absolute;
            inset: 22px;
            border-radius: 50%;
            filter: drop-shadow(0 0 16px #ffffffbf);
            box-shadow: 0 0 0 0 var(--text-color-light);
            animation: pulsOut 1.2s ease-in-out infinite;
          }
        }
      }
    }
  }

  @keyframes pulsIn {
    0% {
      box-shadow: inset 0 0 0 22px var(--text-color-light);
      opacity: 1;
    }
    50%,
    100% {
      box-shadow: inset 0 0 0 0 var(--text-color-light);
      opacity: 0;
    }
  }

  @keyframes pulsOut {
    0%,
    50% {
      box-shadow: 0 0 0 0 var(--text-color-light);
      opacity: 0;
    }
    100% {
      box-shadow: 0 0 0 22px var(--text-color-light);
      opacity: 1;
    }
  }
`;

export default StyledLoadingSpinner;
