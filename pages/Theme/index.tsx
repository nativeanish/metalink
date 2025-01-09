import { useState, useEffect } from "react";
import { ThemeCard } from "../../components/ThemeCard";
import { FaStar, FaPalette, FaBolt, FaMousePointer } from "react-icons/fa";
import ConnectButton from "../../components/ConnectButton";
import { useNavigate } from "react-router-dom";
import themes from "../../constants/themes";

export default function ThemesPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-yellow-300 font-mono relative overflow-hidden p-6">
      <nav className="flex items-center justify-between mb-20 relative z-10">
        <div className="text-2xl font-bold bg-black text-white px-4 py-2">
          <span className="text-yellow-300">META</span>Link
        </div>
        <ConnectButton />
      </nav>
      <div className="p-2">
        <div className="mx-auto max-w-7xl">
          <div className="relative mb-12 overflow-hidden border-4 border-black bg-white p-8">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-yellow-200 to-transparent opacity-50"
              style={{
                backgroundPosition: `${mousePosition.x / 5}px ${
                  mousePosition.y / 5
                }px`,
                transition: "background-position 0.3s ease-out",
              }}
            />
            <h1 className="relative animate-in slide-in-from-left font-mono text-6xl font-black tracking-tight duration-700">
              Select Your Theme
            </h1>
            <p className="relative mt-4 animate-in slide-in-from-left font-mono text-lg text-gray-700 duration-700 [--animate-delay:200ms]">
              Choose from our collection of carefully crafted themes
            </p>
            <div className="relative mt-6 flex flex-wrap gap-4">
              <div className="animate-in slide-in-from-left duration-700 [--animate-delay:400ms]">
                <div className="inline-block rotate-3 border-2 border-black bg-yellow-300 px-4 py-2 font-mono text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-0">
                  <FaStar className="mr-2 inline-block h-4 w-4" />
                  Unleash your creativity!
                </div>
              </div>
              <div className="animate-in slide-in-from-left duration-700 [--animate-delay:500ms]">
                <div className="inline-block -rotate-2 border-2 border-black bg-blue-300 px-4 py-2 font-mono text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-0">
                  <FaPalette className="mr-2 inline-block h-4 w-4" />
                  Express your style
                </div>
              </div>
              <div className="animate-in slide-in-from-left duration-700 [--animate-delay:600ms]">
                <div className="inline-block rotate-1 border-2 border-black bg-green-300 px-4 py-2 font-mono text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-0">
                  <FaBolt className="mr-2 inline-block h-4 w-4" />
                  Stand out from the crowd
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 animate-bounce">
              <div className="rotate-12 border-2 border-black bg-red-300 px-4 py-2 font-mono text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <FaMousePointer className="mr-2 inline-block h-4 w-4" />
                Click to preview
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme, index) => (
              <div
                key={theme.title}
                className="animate-in fade-in duration-700"
                style={{ ["--animate-delay" as any]: `${index * 100}ms` }}
              >
                <ThemeCard
                  title={theme.title}
                  desktopImage={theme.desktop}
                  mobileImage={theme.mobile}
                  onApply={() =>
                    navigate(`/editor?theme=${theme.title}&view=${theme.view}`)
                  }
                />
              </div>
            ))}

            {/* More Coming Soon Card */}
            <div
              className="animate-in fade-in duration-700"
              style={{ ["--animate-delay" as any]: `${themes.length * 100}ms` }}
            >
              <div className="group relative border-4 border-black bg-white p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="aspect-video animate-pulse border-2 border-black bg-gray-200">
                  <div className="flex h-full items-center justify-center">
                    <span className="font-mono text-4xl font-bold text-gray-400">
                      ?
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rotate-[-4deg] border-2 border-black bg-yellow-300 px-4 py-2 transition-all duration-300 group-hover:rotate-0">
                    <h3 className="font-mono text-xl font-bold">
                      More Coming Soon
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
