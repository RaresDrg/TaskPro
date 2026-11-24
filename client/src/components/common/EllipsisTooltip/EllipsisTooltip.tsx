import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
  text: string;
  tag?: "span" | "h1" | "h2" | "h3";
};

const EllipsisTooltip = ({ className, text, tag: Tag = "span" }: Props) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const ref = useRef<HTMLSpanElement & HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      const { scrollWidth, clientWidth, scrollHeight, clientHeight } = el;
      setIsTruncated(scrollWidth > clientWidth || scrollHeight > clientHeight);
    };

    const observer = new ResizeObserver(check);
    observer.observe(el);

    return () => observer.disconnect();
  }, [text]);

  return (
    <Tag
      ref={ref}
      className={className}
      tabIndex={isTruncated ? 0 : undefined}
      title={isTruncated ? text : undefined}
    >
      {text}
    </Tag>
  );
};

export default EllipsisTooltip;
