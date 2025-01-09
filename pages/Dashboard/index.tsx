import ConnectButton from "../../components/ConnectButton";
import DashboardChild from "../../components/DashboardComponent/Dashboard";
import { useCallback, useEffect, useState } from "react";
import useAddress from "../../store/useAddress";
import { get_state } from "../../utils/aos";
import useEdit from "../../store/useEdit";
import AnimatedBackground from "../../components/AnimatedBackground";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const address = useAddress((state) => state.address);
  const [reLoad, setReload] = useState(false);
  const fetchData = useCallback(async () => {
    if (address) {
      setIsLoading(true);
      try {
        await get_state(address);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [address]);
  const setIsEdit = useEdit((state) => state.setIsEdit);
  useEffect(() => {
    setIsEdit(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [address]);

  useEffect(() => {
    if (reLoad) {
      fetchData();
      setReload(false);
    }
    setReload(false);
  }, [reLoad]);
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500"];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-yellow-300 p-6 font-mono relative z-20">
      <nav className="flex items-center justify-between mb-20 relative z-10">
        <div className="text-2xl font-bold bg-black text-white px-4 py-2">
          <span className="text-yellow-300">META</span>Link
        </div>
        <ConnectButton />
      </nav>
      {isLoading ? (
        <div className="relative z-0">
          <div className="relative flex items-center justify-center min-h-screen bg-yellow-300 -mt-28 z-10">
            <div className="absolute inset-0 z-0">
              <AnimatedBackground />
            </div>
            <div
              className="relative z-10 bg-white p-8 border-4 border-black"
              style={{ boxShadow: "8px 8px 0 0 #000, 16px 16px 0 0 #000" }}
            >
              <div className="flex flex-col items-center">
                <div className="flex space-x-4">
                  {[0, 1, 2].map((boxIndex) => (
                    <div
                      key={boxIndex}
                      className={`w-16 h-16 border-4 border-black ${
                        colors[(colorIndex + boxIndex) % colors.length]
                      } transition-colors duration-500`}
                    ></div>
                  ))}
                </div>
                <p
                  className="mt-8 text-3xl font-bold text-black uppercase tracking-widest"
                  style={{ fontFamily: '"Courier New", Courier, monospace' }}
                >
                  Fetching the Data
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DashboardChild reload={setReload} />
      )}
    </div>
  );
}

export default Dashboard;
