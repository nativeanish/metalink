import { useState } from "react";
import "./index.css";
interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  width?: string;
}

export function TextArea({ value, onChange, width }: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`
        relative 
        border-4 
        border-black 
        bg-white 
        transition-all 
        duration-300 
        ${width}
        ${isFocused ? "shadow-focused" : "shadow-normal"}
      `}
    >
      <label
        className={`
          absolute -top-3 left-2 
          bg-white px-2 font-mono text-sm font-bold 
          transition-all duration-300
          ${isFocused ? "label-focused" : ""}
        `}
      >
        Your Description
      </label>
      <div className={`w-full`}>
        <textarea
          name="message"
          placeholder="Type your Description here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full resize-none bg-yellow-300 px-4 py-3 font-mono text-lg font-bold placeholder:text-black/30 outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {value && (
        <div
          className={`
            absolute -right-2 -bottom-2 
            h-6 w-6 rounded-full bg-black 
            transition-transform duration-300 
            scale-100
          `}
        >
          <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white">
            ✓
          </span>
        </div>
      )}
    </div>
  );
}
