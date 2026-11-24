import { useState } from "react";
import { useMediaQueries } from "../../../hooks";
import { getCloudinaryImage, getCloudinaryLQIP } from "../../../utils";
import type { ImageBgName } from "../../../types";

type Props = {
  className?: string;
  name: ImageBgName;
};

const ImageBackground = ({ className, name }: Props) => {
  const [isLqipLoaded, setIsLqipLoaded] = useState(false);
  const [isFullLoaded, setIsFullLoaded] = useState(false);

  const { isOnMobile, isOnTablet, isOnDesktop, isRetina } = useMediaQueries();
  const screen =
    (isOnMobile && "m") ||
    (isOnTablet && "t") ||
    (isOnDesktop && "d") ||
    undefined;
  const resolution = isRetina ? "2x" : "1x";

  if (!screen) return null;

  return (
    <div className={className} aria-hidden="true">
      <img
        data-loaded={isLqipLoaded}
        src={getCloudinaryLQIP(`${name}_${screen}_LQIP`)}
        alt=""
        decoding="async"
        onLoad={() => setIsLqipLoaded(true)}
      />
      <img
        data-loaded={isFullLoaded}
        src={getCloudinaryImage(`${name}_${screen}_${resolution}`)}
        alt=""
        decoding="async"
        onLoad={() => setIsFullLoaded(true)}
      />
    </div>
  );
};

export default ImageBackground;
