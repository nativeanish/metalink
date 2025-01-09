import React, { useEffect, useState } from "react";
import { FaDesktop, FaMobile } from "react-icons/fa";

interface MobileDeviceMockupProps {
  children: React.ReactNode;
  deviceColor?: "black" | "white" | "gold";
  _view?: string;
}

const DeviceMockup: React.FC<MobileDeviceMockupProps> = ({
  children,
  _view,
}) => {
  const [view, setView] = useState<"desktop" | "mobile" | null>(null);
  useEffect(() => {
    if (_view === "desktop") {
      setView("desktop");
    } else if (_view === "mobile") {
      setView("mobile");
    } else {
      setView("mobile");
    }
  }, []);
  return (
    <div className="w-full h-full flex flex-col">
      {/* Device Frame */}
      <div className="flex-1 border-4 border-black bg-white p-4">
        {/* Window Controls */}
        <div className="flex items-center gap-2 mb-4 border-b-4 border-black pb-4">
          <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-black"></div>
          <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-black"></div>
          <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black"></div>
          <div className="flex-1 bg-gray-100 px-4 py-1 text-sm border-2 border-black">
            {view === "desktop" ? "Desktop Preview" : "Mobile Preview"}
          </div>
          {/* View Toggle Buttons */}
          <button
            onClick={() => setView("desktop")}
            className={`flex items-center gap-2 px-4 py-1 border-2 border-black transition-transform hover:-translate-y-0.5 ${
              view === "desktop"
                ? "bg-black text-yellow-300"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <FaDesktop className="w-4 h-4" />
            DESKTOP
          </button>
          <button
            onClick={() => setView("mobile")}
            className={`flex items-center gap-2 px-4 py-1 border-2 border-black transition-transform hover:-translate-y-0.5 ${
              view === "mobile"
                ? "bg-black text-yellow-300"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <FaMobile className="w-4 h-4" />
            MOBILE
          </button>
        </div>

        {/* Content Area with Enhanced Scrolling */}
        <div className="h-[calc(100%-4rem)] bg-gray-200 border-4 border-black">
          <div
            className={`h-full transition-all duration-300 ${
              view === "mobile"
                ? "max-w-[375px] mx-auto bg-white"
                : "w-full bg-white"
            }`}
          >
            <div className="h-full overflow-y-auto custom-scrollbar">
              <div className="p-4 min-h-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceMockup;
