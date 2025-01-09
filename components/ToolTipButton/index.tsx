import { useState, useRef } from "react";
import Tooltip from "../ToolTip";

const ToolTipButton = ({
  className,
  children,
  content,
  onClick,
}: {
  className: string;
  children?: JSX.Element;
  content: string;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <button
        ref={buttonRef}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {children}
      </button>
      {isHovered && <Tooltip text={content} targetRef={buttonRef} />}
    </>
  );
};

export default ToolTipButton;
