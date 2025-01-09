import { FC } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  variant?: "default" | "black";
}

const GlitchText: FC<GlitchTextProps> = ({
  text,
  className = "",
  variant = "default",
}) => {
  const baseClass = variant === "black" ? "glitch-text-black" : "glitch-text";

  return (
    <span className={`${baseClass} ${className}`} data-text={text}>
      {text}
    </span>
  );
};

export default GlitchText;
