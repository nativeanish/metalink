import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";
import ConnectButton from "../../components/ConnectButton";
export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");
  const [showGrid, setShowGrid] = useState(false);
  const [showNoise, setShowNoise] = useState(false);

  useEffect(() => {
    const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
    let interval: number | null = null;

    const startGlitch = () => {
      let iteration = 0;

      clearInterval(interval as number);

      interval = window.setInterval(() => {
        setGlitchText(
          "404"
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return char;
              }
              return glitchChars[
                Math.floor(Math.random() * glitchChars.length)
              ];
            })
            .join("")
        );

        iteration += 1 / 3;

        if (iteration >= 4) {
          clearInterval(interval as number);
          setGlitchText("404");
        }
      }, 50);
    };

    setTimeout(() => setShowGrid(true), 500);
    setTimeout(() => setShowNoise(true), 1000);

    startGlitch();
    const glitchInterval = window.setInterval(startGlitch, 5000);

    return () => {
      clearInterval(interval as number);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-yellow-300 p-6 font-mono">
      {/* Header */}
      <nav className="flex items-center justify-between mb-20">
        <div className="text-2xl font-bold bg-black text-white px-4 py-2">
          <span className="text-yellow-300">META</span>Link
        </div>
        <ConnectButton />
      </nav>

      <div className="flex flex-col items-center justify-center p-2">
        {/* Animated Grid Background */}
        <div
          className={`fixed inset-0 grid grid-cols-8 grid-rows-8 transition-opacity duration-1000 ${
            showGrid ? "opacity-10" : "opacity-0"
          }`}
        >
          {[...Array(64)].map((_, i) => (
            <div
              key={i}
              className="border border-black animate-pulse"
              style={{
                animationDelay: `${i * 50}ms`,
                animationDuration: "3s",
              }}
            />
          ))}
        </div>

        {/* Noise Overlay */}
        <div
          className={`fixed inset-0 bg-noise opacity-10 transition-opacity duration-1000 ${
            showNoise ? "opacity-10" : "opacity-0"
          }`}
          style={{ mixBlendMode: "multiply" }}
        />

        {/* Error Container with Floating Animation */}
        <div className="relative animate-float">
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none tracking-tighter">
            {glitchText}
          </h1>
          <div className="absolute inset-0 text-[150px] md:text-[200px] font-bold leading-none tracking-tighter opacity-20 blur-sm animate-float-shadow">
            {glitchText}
          </div>
        </div>

        {/* Error Message with Slide Animation */}
        <div className="mt-8 text-center">
          <div className="bg-black text-[#FFE135] text-2xl md:text-4xl p-4 mb-8 transform -rotate-1 animate-slideIn">
            Page Not Found.
          </div>
          <p
            className="max-w-[600px] text-black text-lg md:text-xl mb-12 border border-black p-4 animate-slideIn"
            style={{ animationDelay: "200ms" }}
          >
            The page you&apos;re looking for has been decentralized, deleted, or
            never existed in the first place.
          </p>
        </div>

        {/* Action Button with Hover Animation */}
        <Link
          to="/"
          className="bg-black text-[#FFE135] px-8 py-4 text-xl relative group animate-slideIn"
          style={{ animationDelay: "400ms" }}
        >
          <span className="relative z-10">Return to Hub</span>
          <div className="absolute inset-0 bg-[#FFE135] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          <div className="absolute inset-0 border-2 border-black transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
        </Link>

        {/* Animated Corner Elements */}
        <div className="fixed bottom-0 left-0 w-4 h-4 bg-black m-4 animate-cornerBL" />
        <div className="fixed bottom-0 right-0 w-4 h-4 bg-black m-4 animate-cornerBR" />

        {/* Random Floating Elements */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="fixed w-8 h-8 border-2 border-black animate-randomFloat"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Animated Glitch Lines */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-black h-px w-full animate-glitchLine"
              style={{
                top: `${33 * (i + 1)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "0.2s",
              }}
            />
          ))}
        </div>

        {/* Animated Binary Rain */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-black text-opacity-20 animate-binaryRain"
              style={{
                left: `${(i / 20) * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            >
              {[...Array(10)].map((_, j) => (
                <div key={j} className="my-2">
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
