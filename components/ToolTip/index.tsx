import { createPortal } from "react-dom";

const Tooltip: React.FC<{
  text: string;
  targetRef: React.RefObject<HTMLElement>;
}> = ({ text, targetRef }) => {
  if (!targetRef.current) return null;

  const { left, top } = targetRef.current.getBoundingClientRect();
  const tooltipStyle = {
    position: "absolute" as "absolute",
    left: `${left + window.scrollX - 30}px`,
    top: `${top + window.scrollY - 40}px`, // Position above the button
    backgroundColor: "#ffffff", // Tailwind's gray-700
    color: "black",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    zIndex: 1000,
    textAlign: "center",
    fontSize: "4 rem",
    border: "2px solid black",
  };

  return createPortal(
    //@ts-ignore
    <div style={tooltipStyle}>{text}</div>,
    document.body
  );
};
export default Tooltip;
