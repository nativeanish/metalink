// Utility function for text glitch effect
export const glitchText = (
  text: string,
  iteration: number,
  glitchChars: string = "!<>-_\\/[]{}—=+*^?#________"
): string => {
  return text
    .split("")
    .map((char, index) => {
      if (index < iteration) {
        return char;
      }
      return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    })
    .join("");
};
