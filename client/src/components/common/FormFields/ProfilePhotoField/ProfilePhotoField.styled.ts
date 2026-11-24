import styled from "styled-components";
import ProfilePhotoField from "./ProfilePhotoField";
import { BREAKPOINTS } from "../../../../constants";

const StyledProfilePhotoField = styled(ProfilePhotoField)`
  width: fit-content;
  margin: 0 auto;
  position: relative;

  & {
    > div {
      width: 68px;
      height: 68px;
      border-radius: 8px;
      border: 0.2px solid #808080cc;
      overflow: hidden;

      &:has(> img) {
        & {
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

      &:has(> svg) {
        padding-top: 20px;
        background-color: ${({ theme }) => {
          if (theme.value === "dark") return "#1F1F1F";
          if (theme.value === "light") return "#F6F6F7";
          if (theme.value === "violet") return "#ECEDFD";
        }};

        & {
          > svg {
            width: 100%;
            height: 100%;
            fill: #808080;
          }
        }
      }
    }

    > label {
      position: absolute;
      bottom: 0;
      right: 50%;
      transform: translate(50%, 50%);
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background-color: #cececee6;
      transition: var(--transition);

      &:has(> input:hover),
      &:has(> input:focus-visible) {
        background-color: ${({ theme }) =>
          theme.value === "violet"
            ? "var(--violet-color)"
            : "var(--green-color)"};
      }

      & {
        > input {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
        }

        > svg {
          width: 12px;
          height: 12px;
          stroke: var(--text-color-dark);
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > div {
        width: 78px;
        height: 78px;
      }

      > label {
        width: 28px;
        height: 28px;

        & {
          > svg {
            width: 14px;
            height: 14px;
          }
        }
      }
    }
  }
`;

export default StyledProfilePhotoField;
