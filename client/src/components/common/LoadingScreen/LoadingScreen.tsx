import { useEffect, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import { LOADING_SCREEN_VIDEO } from "../../../constants/constants";

type Props = {
  className?: string;
};

const LoadingScreen = ({ className: styles }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
    }
  }, []);

  return (
    <div className={`${styles} animate__animated animate__fadeIn`}>
      <video ref={videoRef} autoPlay={true} muted={true} loop={true}>
        <source src={LOADING_SCREEN_VIDEO} type="video/mp4" />
      </video>
      <h1 className="animate__animated animate__pulse animate__infinite">
        Loading
        <ThreeDots
          visible={true}
          color="#fff"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </h1>
    </div>
  );
};

export default LoadingScreen;
