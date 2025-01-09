import { useState, useRef, useEffect } from "react";
import { FiMaximize as Maximize2, FiMinimize as X } from "react-icons/fi";
interface ThemeCardProps {
  title: string;
  desktopImage: string;
  mobileImage: string;
  onApply: () => void;
}

export function ThemeCard({
  title,
  desktopImage,
  mobileImage,
  onApply,
}: ThemeCardProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [view, setView] = useState<"mobile" | "desktop">("desktop");
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "duration-700");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className="group relative border-4 border-black bg-white p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-video overflow-hidden border-2 border-black">
          <img
            src={
              "https://raw.githubusercontent.com/nativeanish/browser/main/images/desktop/" +
              desktopImage
            }
            alt={`${title} theme preview`}
            className={`h-full w-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        </div>
        <h3 className="my-3 font-mono text-xl font-bold tracking-tight">
          {title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsZoomed(true)}
            className="flex flex-1 items-center justify-center gap-2 border-2 border-black bg-yellow-300 px-4 py-2 
                     font-mono font-bold transition-all duration-200 hover:-translate-y-0.5 
                     hover:bg-yellow-400 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0"
          >
            <Maximize2 className="h-4 w-4" />
            ZOOM
          </button>
          <button
            onClick={onApply}
            className="flex-1 border-2 border-black bg-black px-4 py-2 font-mono font-bold text-white 
                     transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 
                     hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0"
          >
            APPLY
          </button>
        </div>
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative h-[90vh] w-[90vw] animate-in zoom-in border-4 border-black bg-white p-6 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute right-4 top-4 border-2 border-black p-1 transition-colors hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setView("desktop")}
                className={`border-2 border-black px-4 py-2 font-mono font-bold transition-all duration-200
                          ${
                            view === "desktop"
                              ? "bg-black text-white"
                              : "bg-white hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          }`}
              >
                DESKTOP
              </button>
              <button
                onClick={() => setView("mobile")}
                className={`border-2 border-black px-4 py-2 font-mono font-bold transition-all duration-200
                          ${
                            view === "mobile"
                              ? "bg-black text-white"
                              : "bg-white hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          }`}
              >
                MOBILE
              </button>
            </div>

            <div
              className={`h-[calc(90vh-120px)] overflow-hidden border-2 border-black bg-gray-100
                          ${
                            view === "mobile" ? "mx-auto w-[375px]" : "w-full"
                          }`}
            >
              <img
                // src={`https://raw.githubusercontent.com/nativeanish/browser/main/${
                //   view === "mobile" ? mobileImage : desktopImage
                // }`}
                src={
                  view === "mobile"
                    ? `https://raw.githubusercontent.com/nativeanish/browser/main/images/mobile/${mobileImage}`
                    : `https://raw.githubusercontent.com/nativeanish/browser/main/images/desktop/${desktopImage}`
                }
                alt={`${title} theme preview - ${view} view`}
                className="h-full w-full object-contain transition-all duration-500"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
