import styled from "styled-components";
import FormFileField from "./FormFileField";

const StyledFormFileField = styled(FormFileField)`
  width: 68px;
  height: 68px;
  margin: 0 auto 26px auto;
  position: relative;

  & {
    &:has(> svg) > svg {
      display: block;
      border-radius: 9px;
      border: 0.5px solid grey;
    }

    &:has(> img) > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 9px;
      border: 0.5px solid grey;
    }

    input {
      display: none;
    }

    label {
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translate(-50%);
      width: 24px;
      height: 24px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0.5px solid grey;
      background-color: #cecece;
      opacity: 0.9;
      transition: var(--transition);

      & > svg {
        width: 12px;
        height: 12px;
        stroke: var(--text-color-black);
        transition: var(--transition);
      }

      &:hover {
        background-color: ${(props) => props.theme.highlightColorActive};
        opacity: 1;

        & > svg {
          stroke: var(--text-color-white);
        }
      }
    }
  }
`;

export default StyledFormFileField;
