import styled from "styled-components";
import BoardPage from "./BoardPageSection";

const StyledBoardPageSection = styled(BoardPage)`
  height: calc(100dvh - 60px);
  padding: 14px 0 24px 0;
  overflow: hidden;
  border-top: 1px solid grey;
  background-image: ${({ backgroundSources }) =>
    backgroundSources ? `url(${backgroundSources.mobile})` : "none"};
  background-position: center;
  background-size: cover;
  background-color: ${(props) => props.theme.dashboardPageBg};
  transition: var(--transition);

  & {
    > div {
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }
  }

  @media (min-width: 768px) {
    height: calc(100dvh - 68px);
    background-image: ${({ backgroundSources }) =>
      backgroundSources ? `url(${backgroundSources.tablet})` : "none"};
    padding: 26px 0 32px 0;
  }

  @media (min-width: 1440px) {
    margin-left: 260px;
    background-image: ${({ backgroundSources }) =>
      backgroundSources ? `url(${backgroundSources.desktop})` : "none"};
    padding: 14px 0 24px 0;
  }

  /* 2X Retina */
  @media (min-device-pixel-ratio: 2),
    (-webkit-min-device-pixel-ratio: 2),
    (min-resolution: 192dpi),
    (min-resolution: 2dppx) {
    background-image: ${({ backgroundSources }) =>
      backgroundSources ? `url(${backgroundSources.mobile_2x})` : "none"};

    @media (min-width: 768px) {
      background-image: ${({ backgroundSources }) =>
        backgroundSources ? `url(${backgroundSources.tablet_2x})` : "none"};
    }

    @media (min-width: 1440px) {
      background-image: ${({ backgroundSources }) =>
        backgroundSources ? `url(${backgroundSources.desktop_2x})` : "none"};
    }
  }
`;

export default StyledBoardPageSection;
