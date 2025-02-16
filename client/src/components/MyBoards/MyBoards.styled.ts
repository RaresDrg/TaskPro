import styled from "styled-components";
import MyBoards from "./MyBoards";

const StyledMyBoards = styled(MyBoards)`
  margin-top: 70px;
  margin-bottom: 40px;

  & {
    & > span {
      margin-left: 14px;
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: -0.02em;
      opacity: 0.5;
      color: ${(props) => props.theme.leftsideBarTextColor};
      transition: var(--transition);
    }

    & > div {
      margin: 8px 14px 0 14px;
      padding: 14px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: ${(props) => `1px solid ${props.theme.myBoardsSepartor}`};
      border-bottom: ${(props) => `1px solid ${props.theme.myBoardsSepartor}`};
      transition: var(--transition);

      & {
        & > span {
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: -0.02em;
          width: 76px;
          color: ${(props) => props.theme.leftsideBarTextColor};
          transition: var(--transition);
        }

        & > .create-btn {
          width: 40px;
          height: 36px;
          border-radius: 6px;
          padding: 8px 10px;
          cursor: pointer;
          border: 0.5px solid transparent;
          stroke: var(--text-color-black);
          background-color: ${(props) => props.theme.highlightColor};
          transition: var(--transition);

          &:hover {
            background-color: ${(props) => props.theme.highlightColorActive};
            box-shadow: ${(props) =>
              `0px 0px 16px 0px ${props.theme.highlightColor}`};
            transform: scale(1.1);
            border: 0.5px solid var(--text-color-white);
            stroke: var(--text-color-white);
          }
        }
      }
    }

    .boards-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 40px;
    }
  }

  @media (min-width: 768px) {
    margin-top: 60px;

    & {
      & > span {
        margin-left: 24px;
      }

      & > div {
        margin: 8px 24px 0 24px;
      }
    }
  }
`;

export default StyledMyBoards;
