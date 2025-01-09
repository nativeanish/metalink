import React, { useState, useEffect } from "react";

interface Shape {
  id: number;
  type: "circle" | "rect" | "triangle";
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
}

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#F9D56E"];

const AnimatedBackground: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const generateShapes = () => {
      const newShapes: Shape[] = [];
      for (let i = 0; i < 15; i++) {
        newShapes.push({
          id: i,
          type: ["circle", "rect", "triangle"][
            Math.floor(Math.random() * 3)
          ] as "circle" | "rect" | "triangle",
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 5 + 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          speed: Math.random() * 0.5 + 0.1,
          direction: Math.random() * 360,
        });
      }
      setShapes(newShapes);
    };

    generateShapes();
  }, []);

  useEffect(() => {
    const moveShapes = () => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) => {
          const radians = (shape.direction * Math.PI) / 180;
          let newX = shape.x + Math.cos(radians) * shape.speed;
          let newY = shape.y + Math.sin(radians) * shape.speed;
          let newDirection = shape.direction;

          if (newX < 0 || newX > 100) {
            newDirection = 180 - newDirection;
            newX = Math.max(0, Math.min(newX, 100));
          }
          if (newY < 0 || newY > 100) {
            newDirection = 360 - newDirection;
            newY = Math.max(0, Math.min(newY, 100));
          }

          return { ...shape, x: newX, y: newY, direction: newDirection };
        })
      );
    };

    const intervalId = setInterval(moveShapes, 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full">
        {shapes.map((shape) => {
          switch (shape.type) {
            case "circle":
              return (
                <circle
                  key={shape.id}
                  cx={`${shape.x}%`}
                  cy={`${shape.y}%`}
                  r={`${shape.size}%`}
                  fill={shape.color}
                  opacity="0.6"
                />
              );
            case "rect":
              return (
                <rect
                  key={shape.id}
                  x={`${shape.x}%`}
                  y={`${shape.y}%`}
                  width={`${shape.size * 2}%`}
                  height={`${shape.size * 2}%`}
                  fill={shape.color}
                  opacity="0.6"
                />
              );
            case "triangle":
              const points = `
                ${shape.x},${shape.y - shape.size}
                ${shape.x - (shape.size * Math.sqrt(3)) / 2},${
                shape.y + shape.size / 2
              }
                ${shape.x + (shape.size * Math.sqrt(3)) / 2},${
                shape.y + shape.size / 2
              }
              `;
              return (
                <polygon
                  key={shape.id}
                  points={points}
                  fill={shape.color}
                  opacity="0.6"
                />
              );
          }
        })}
      </svg>
    </div>
  );
};

export default AnimatedBackground;
