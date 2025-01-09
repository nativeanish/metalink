import { useState } from "react";
import "./index.css";
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  width?: string;
}

export function Input({ value, onChange, width }: InputProps) {
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
        Enter Name
      </label>
      <div className={`w-full`}>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-yellow-300 px-4 py-3 font-mono text-lg font-bold placeholder:text-black/30 outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {value && (
        <div
          className={`
            absolute -right-2 -top-2 
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
