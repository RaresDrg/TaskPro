import { VideoBackground } from "../../../common";

type Props = {
  className?: string;
};

const LoadingScreen = ({ className }: Props) => {
  return (
    <div className={className}>
      <VideoBackground name="taskpro_loading-screen" />
      <div>
        <span className="loader">Loading</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
