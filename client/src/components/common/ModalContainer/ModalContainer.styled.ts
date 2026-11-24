import styled from "styled-components";
import ModalContainer from "./ModalContainer";
import { BREAKPOINTS } from "../../../constants";

const StyledModalContainer = styled(ModalContainer)`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  padding: 50px 20px;
  background: #1515154d;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  outline: none;
  overflow: auto;
  scrollbar-width: none;
  animation: fadeIn 0.35s ease-in-out both;

  &::-webkit-scrollbar {
    display: none;
  }

  &.hidden {
    animation: fadeOut 0.35s ease-in-out both;

    & {
      .modal-content {
        animation: fadeOutUp 0.35s ease-in-out both;
      }
    }
  }

  & {
    .modal-content {
      width: 100%;
      min-width: calc(var(--layout-min-width) - 40px);
      margin: auto;
      animation: fadeInDown 0.35s ease-in-out both;
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    padding: 50px;

    & {
      .modal-content {
        max-width: fit-content;
      }
    }
  }
`;

export default StyledModalContainer;
