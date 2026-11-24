import { useState } from "react";
import { useMediaQueries } from "../../../hooks";
import { getCloudinaryImage, getCloudinaryLQIP } from "../../../utils";
import type { ImageName } from "../../../types";

type Props = {
  className?: string;
  name: ImageName;
  alt: string;
};

const Image = ({ className, name, alt }: Props) => {
  const { isRetina } = useMediaQueries();
  const [stage, setStage] = useState<"placeholder" | "full" | "ready">(
    "placeholder",
  );

  const src =
    stage === "placeholder"
      ? getCloudinaryLQIP(`${name}_LQIP`)
      : getCloudinaryImage(`${name}_${!isRetina ? "1x" : "2x"}`);

  return (
    <img
      className={className}
      data-loaded={stage === "ready"}
      alt={alt}
      src={src}
      onLoad={() =>
        setStage((prev) => (prev === "placeholder" ? "full" : "ready"))
      }
      decoding="async"
    />
  );
};

export default Image;
