"use client";

import React, { useState, useEffect } from "react";

interface BrutalistTextAnimationProps {
  text: string[];
  delay?: number;
}

const AnimateText: React.FC<BrutalistTextAnimationProps> = ({
  text,
  delay = 50,
}) => {
  const [displayText, setDisplayText] = useState<string[]>(text.map(() => ""));
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLineIndex < text.length) {
      if (currentCharIndex < text[currentLineIndex].length) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => {
            const newText = [...prev];
            newText[currentLineIndex] +=
              text[currentLineIndex][currentCharIndex];
            return newText;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, delay);

        return () => clearTimeout(timer);
      } else {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    } else {
      setShowCursor(false);
    }
  }, [currentLineIndex, currentCharIndex, delay, text]);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative max-w-7xl w-full border-8 border-black p-8 animate-[pulse_2s_ease-in-out_infinite]">
        <div className="absolute top-0 left-0 w-full h-2 bg-black animate-[slideRight_10s_linear_infinite]" />
        <div className="absolute bottom-0 right-0 w-full h-2 bg-black animate-[slideLeft_10s_linear_infinite]" />
        <div className="absolute top-0 left-0 w-2 h-full bg-black animate-[slideDown_10s_linear_infinite]" />
        <div className="absolute top-0 right-0 w-2 h-full bg-black animate-[slideUp_10s_linear_infinite]" />
        {displayText.map((line, index) => (
          <h1
            key={index}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black font-mono break-words text-center mb-4 relative"
          >
            {line}
            {index === currentLineIndex && showCursor && (
              <span className="absolute animate-[blink_1s_step-end_infinite]">
                |
              </span>
            )}
          </h1>
        ))}
      </div>
      <style>{`
        @keyframes slideRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes slideLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes slideUp {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimateText;
