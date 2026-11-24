import { useMediaQueries } from "../../../hooks";
import { getCloudinaryVideo } from "../../../utils";
import type { VideoBgName } from "../../../types";

type Props = {
  className?: string;
  name: VideoBgName;
};

const VideoBackground = ({ className, name }: Props) => {
  const { src, poster } = getCloudinaryVideo(name);
  const { prefersReducedMotion } = useMediaQueries();

  return (
    <video
      className={className}
      preload={prefersReducedMotion ? "none" : "auto"}
      autoPlay={!prefersReducedMotion}
      muted
      loop
      poster={poster}
      playsInline
      disablePictureInPicture
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default VideoBackground;
