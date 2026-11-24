import styled from "styled-components";
import NotFoundPage from "./NotFoundPage";
import { BREAKPOINTS } from "../../constants";

const StyledNotFoundPage = styled(NotFoundPage)`
  display: flex;
  background: #161616;
  animation: pixelSmoothCircle 1s ease-in-out both;

  & {
    > video {
      z-index: -1;
      filter: brightness(32%);
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      gap: 50px;
      margin: 0 auto;

      & {
        .title {
          font-weight: 500;
          font-size: 1.5rem;
          line-height: 1.5;
          letter-spacing: 0.05em;
          color: var(--text-color-light);
          text-align: center;
        }

        .status {
          font-weight: 700;
          font-size: 3.75rem;
          line-height: 1.5;
          letter-spacing: 0.04em;
          color: transparent;
          -webkit-text-stroke: 0.5px white;
          animation: pulseSmooth 1s infinite ease-in-out;
        }

        .description {
          font-weight: 400;
          font-size: 0.875rem;
          line-height: 1.5;
          letter-spacing: 0.1em;
          color: var(--text-color-light);
          font-style: italic;
          text-indent: 35px;
          max-width: 420px;
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > div {
        & {
          .title {
            font-size: 1.75rem;
          }

          .status {
            font-size: 4.375rem;
          }

          .description {
            font-size: 1rem;
            max-width: 570px;
          }
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.desktop}) {
    & {
      > div {
        & {
          .title {
            font-size: 1.875rem;
          }

          .status {
            font-size: 5rem;
          }
        }
      }
    }
  }
`;

export default StyledNotFoundPage;
