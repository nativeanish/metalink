import React, { useEffect, useState } from "react";
import useAddress from "../../store/useAddress";
import useArns from "../../store/useArns";
import { useNavigate } from "react-router-dom";
import { async_connect } from "../../utils/wallet";
import { check_name } from "../../utils/aos";

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  handle: string;
}

const AvailabilityModal: React.FC<AvailabilityModalProps> = ({
  isOpen,
  onClose,
  handle,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);
  const isConnect = useAddress((state) => state.address);
  const setArns = useArns((state) => state.setArns);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsChecking(true);
      check_name(handle).then((data) => {
        if (data) {
          setIsAvailable(true);
          setIsChecking(false);
        } else {
          setIsAvailable(false);
          setIsChecking(false);
        }
      });
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen, handle]);

  if (!isVisible) return null;
  const handleConnectAndClaim = async () => {
    setIsConnecting(true);
    try {
      await async_connect();
      if (isConnect && isConnect.length > 0) {
        setArns(handle);
        navigate("/onboard");
        onClose();
      }
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div
        className={`bg-white border-4 border-black p-8 max-w-md w-full transform ${
          isOpen ? "scale-100" : "scale-95"
        } transition-transform duration-300`}
      >
        <h3 className="text-3xl font-bold mb-4 uppercase">Handle Status</h3>
        {isChecking ? (
          <div className="mb-6">
            <p className="text-xl mb-2">Checking availability for:</p>
            <p className="text-2xl font-bold">{handle}</p>
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-16 border-8 border-black border-t-yellow-300 rounded-full animate-spin animate-spinner-pulse"></div>
            </div>
          </div>
        ) : (
          <p className="mb-6 text-xl">
            <span className="font-bold">{handle}</span> is
            {isAvailable ? (
              <span className="text-green-600 font-bold"> AVAILABLE</span>
            ) : (
              <span className="text-red-600 font-bold"> NOT AVAILABLE</span>
            )}
          </p>
        )}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-black text-white px-6 py-3 text-lg font-bold hover:bg-white hover:text-black border-2 border-black transition-colors"
          >
            CLOSE
          </button>
          {!isChecking && isAvailable && (
            <div>
              {isConnect && isConnect.length > 0 ? (
                <div>
                  <button
                    onClick={() => {
                      setArns(handle);
                      navigate("/onboard");
                      onClose();
                    }}
                    className="bg-yellow-300 text-black px-6 py-3 text-lg font-bold hover:bg-black hover:text-yellow-300 border-2 border-black transition-colors"
                  >
                    CLAIM NOW
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnectAndClaim}
                  disabled={isConnecting}
                  className="bg-yellow-300 text-black px-6 py-3 text-lg font-bold hover:bg-black hover:text-yellow-300 border-2 border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? "Connecting..." : "Connect & Claim"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityModal;
