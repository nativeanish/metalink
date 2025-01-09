import React, { useEffect, useRef } from "react";

const BG: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gridSize = 40;
    const dotSize = 2;
    let time = 0;

    const animate = () => {
      ctx.fillStyle = "#FDE047"; // Yellow background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Black dots

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const offsetX = Math.sin(time + y * 0.1) * 5;
          const offsetY = Math.cos(time + x * 0.1) * 5;
          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      time += 0.01;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default BG;
