import styled from "styled-components";
import Modal from "./Modal";

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;
  overflow: auto;
  background: var(--modal-bg);
  backdrop-filter: var(--modal-blur);
  display: grid;
  place-items: center;
  padding: 30px 20px;
  animation: fadeIn 0.35s ease-in-out;

  &.hidden {
    animation: fadeOut 0.35s ease-in-out forwards;

    & {
      .modal-content {
        animation: translateOut 0.35s ease-in-out;
      }
    }
  }

  & {
    .modal-content {
      width: 100%;
      padding: 24px;
      border-radius: 8px;
      position: relative;
      background-color: ${(props) => props.theme.formBg};
      border: ${(props) => `1px solid ${props.theme.formBorderColor}`};
      box-shadow: ${(props) =>
        `0px 4px 16px 0px ${props.theme.formShadowColor}`};
      animation: translateIn 0.35s ease-in-out;
      transition: var(--transition);

      & {
        .close-btn {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          position: absolute;
          top: 14px;
          right: 14px;
          cursor: pointer;
          color: ${(props) => props.theme.textColor};
          transition: var(--transition);

          &:hover {
            padding: 2px;
            color: ${(props) => props.theme.exitButonColorHover};
            background-color: ${(props) => props.theme.highlightColorActive};
            transform: scale(1.2);
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    & {
      .modal-content {
        width: 350px;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes translateIn {
    from {
      transform: translateY(-200px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes translateOut {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-200px);
    }
  }
`;

export default StyledModal;
