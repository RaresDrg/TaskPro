import styled from "styled-components";
import NeedHelp from "./NeedHelp";

const StyledNeedHelp = styled(NeedHelp)`
  margin: auto 14px 24px 14px;
  padding: 14px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.needHelpBg};
  transition: var(--transition);

  & {
    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: -0.02em;
      margin-top: 14px;
      margin-bottom: 18px;
      color: ${(props) => props.theme.leftsideBarTextColor};
      transition: var(--transition);

      b {
        color: ${(props) => props.theme.highlightColorActive};
        transition: var(--transition);
      }
    }

    button {
      display: flex;
      align-items: center;
      gap: 8px;
      transition: var(--transition);

      & {
        svg {
          width: 20px;
          height: 20px;
          color: ${(props) => props.theme.leftsideBarTextColor};
          transition: var(--transition);
        }

        span {
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          letter-spacing: -0.02em;
          color: ${(props) => props.theme.leftsideBarTextColor};
          transition: var(--transition);
        }
      }

      &:hover {
        opacity: 0.5;

        & {
          svg {
            transform: rotateY(360deg);
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    margin: auto 24px 24px 24px;
    padding: 20px;

    & {
      p {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
`;

export default StyledNeedHelp;
