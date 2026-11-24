import styled from "styled-components";
import AuthGroup from "./AuthGroup";
import { BREAKPOINTS } from "../../constants";

const StyledAuthGroup = styled(AuthGroup)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & {
    .cta-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      color: var(--text-color-light);
      width: 100%;
      height: 50px;
      border-radius: 16px;
      border: 1px solid #808080;
      box-shadow: 0px 0px 18px 0px #808080cc;
      background-color: #161616;
      transition: var(--transition);

      &:hover,
      &:focus-visible {
        border-color: #ffffff;
        box-shadow: 0px 6px 15px 0px #7b7ede;
        background-color: #7b7ede;
      }
    }

    .login-prompt {
      margin-top: 14px;
      margin-bottom: 14px;

      & {
        .text {
          font-weight: 400;
          font-size: 0.875rem;
          line-height: 1.5;
          letter-spacing: -0.02em;
          color: var(--text-color-dark);
        }

        .login-btn {
          margin-left: 5px;
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.5;
          letter-spacing: -0.02em;
          color: #5255bc;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            bottom: -2px;
            right: 0;
            background-color: currentColor;
            height: 1px;
            width: 0;
            opacity: 0;
            transition: var(--transition);
          }

          &:hover::after,
          &:focus-visible::after {
            width: 100%;
            opacity: 1;
            left: 0;
          }
        }

        .separator {
          margin-top: 24px;
          font-weight: 400;
          font-size: 0.875rem;
          line-height: 1.5;
          letter-spacing: -0.02em;
          color: var(--text-color-dark);
          display: flex;
          align-items: center;
          gap: 14px;

          &::before,
          &::after {
            content: "";
            flex: 1;
            height: 1px;
            background-color: #808080cc;
          }
        }
      }
    }

    .google-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      height: 50px;
      border-radius: 16px;
      border: 1px solid #808080;
      box-shadow: 1px 9px 15px 0px #00000033;
      background-color: #fbfbfb;
      transition: var(--transition);

      & {
        > svg {
          width: 28px;
          height: 28px;
        }

        > span {
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.5;
          letter-spacing: -0.02em;
          color: var(--text-color-dark);
        }
      }

      &:hover,
      &:focus-visible {
        border-color: #000000;
        box-shadow: 0 1px 1px #0000001a;
        background-color: #bab9be;
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    width: 320px;

    & {
      .cta-btn {
        font-size: 1rem;
      }

      .login-prompt {
        & {
          .text {
            font-size: 1rem;
          }

          .login-btn {
            font-size: 1rem;
          }

          .separator {
            font-size: 1rem;
          }
        }
      }

      .google-btn {
        & {
          > svg {
            width: 29px;
            height: 29px;
          }

          > span {
            font-size: 1rem;
          }
        }
      }
    }
  }
`;

export default StyledAuthGroup;
