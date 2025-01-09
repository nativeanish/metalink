import { useEffect, useState, useRef } from "react";
import {
  FaWallet as Wallet,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaPlus,
  FaHome,
} from "react-icons/fa";
import { FaChevronDown as ChevronDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { checkConnection, connect, disconnect } from "../../utils/wallet";
import useAddress from "../../store/useAddress";

function ConnectButton() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const address = useAddress((state) => state.address);

  useEffect(() => {
    if (
      location === "/onboard" ||
      location === "/theme" ||
      location === "/editor" ||
      location === "/publish" ||
      location === "/dashboard"
    ) {
      if (!address) {
        navigate("/");
      }
    }
    window.addEventListener("arweaveWalletLoaded", async () => {
      await checkConnection();
    });
  }, [location, address]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    if (address) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      connect();
    }
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={handleButtonClick}
        className="bg-black p-4 hover:bg-black/90 text-white border-2 border-black hover:border-black/90 px-6 py-2 flex items-center gap-2 transition-colors relative"
      >
        {address?.length && address ? (
          <>
            <div className="flex flex-row items-center gap-x-3 justify-center">
              <FaUser />
              {address.slice(0, 6) + "..." + address.slice(-4)}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4" />
            {"Connect Wallet"}
          </>
        )}
      </button>
      {address && address.length && isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black shadow-lg">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors border-b-2 border-black flex flex-row items-center gap-x-3 bg-white"
            onClick={() => {
              navigate("/");
              setIsDropdownOpen(false);
            }}
            disabled={location === "/"}
          >
            <FaHome />
            Home
          </button>
          <button
            disabled={location === "/dashboard"}
            className="w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors border-b-2 border-black flex flex-row items-center gap-x-3 bg-white"
            onClick={() => {
              navigate("/dashboard");
              setIsDropdownOpen(false);
            }}
          >
            <FaTachometerAlt />
            Dashboard
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors border-b-2 border-black flex flex-row items-center gap-x-3 bg-white"
            onClick={() => {
              navigate("/onboard");
              setIsDropdownOpen(false);
            }}
            disabled={location === "/onboard"}
          >
            <FaPlus />
            Create
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors text-red-600 flex flex-row items-center gap-x-3 bg-white"
            onClick={() => {
              disconnect();
              setIsDropdownOpen(false);
            }}
          >
            <FaSignOutAlt />
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default ConnectButton;
