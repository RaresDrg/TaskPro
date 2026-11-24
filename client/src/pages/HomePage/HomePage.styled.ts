import styled from "styled-components";
import HomePage from "./HomePage";
import { BREAKPOINTS } from "../../constants";

const StyledHomePage = styled(HomePage)`
  display: flex;

  & {
    > div {
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: fadeIn 0.5s ease-in-out both;

      & {
        .hero-img {
          width: 124px;
          height: 124px;
          margin-bottom: 14px;
        }

        .hero-title {
          font-weight: 400;
          font-size: 0.875rem;
          line-height: 1.33;
          letter-spacing: -0.02em;
          color: var(--text-color-dark);
          text-align: center;
          margin-top: 24px;
          margin-bottom: 70px;
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > div {
        & {
          .hero-img {
            width: 162px;
            height: 162px;
            margin-bottom: 24px;
          }

          .hero-title {
            font-size: 1rem;
            max-width: 510px;
          }
        }
      }
    }
  }
`;

export default StyledHomePage;
