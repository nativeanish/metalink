import ConnectButton from "../../components/ConnectButton";
import { ethers } from "ethers";
import { LuLoader as Loader2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProfile from "../../store/useProfile";
import AllLink from "../../utils/AllLink";
import { uuidv7 } from "uuidv7";
import AnimatedBackground from "../../components/AnimatedBackground";
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: Array<any> }) => Promise<any>;
      on?: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}

interface ProfileInfo {
  name?: string;
  description?: string;
  url?: string;
  twitter?: string;
  github?: string;
  avatar?: string;
}

function OnBoard() {
  const [isENSDialogOpen, setIsENSDialogOpen] = useState(false);
  const [ensInput, setEnsInput] = useState("");
  const [hasMetaMask, setHasMetaMask] = useState<boolean>(false);
  const [ens, setENS] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    setHasMetaMask(typeof window !== "undefined" && !!window.ethereum);
  }, []);

  const openENSDialog = () => setIsENSDialogOpen(true);
  const closeENSDialog = () => {
    setIsENSDialogOpen(false);
    setEnsInput("");
    setProfileInfo(null);
  };

  const getProvider = () => {
    if (window.ethereum) {
      return new ethers.providers.Web3Provider(window.ethereum);
    }
    return new ethers.providers.JsonRpcProvider(
      "https://mainnet.infura.io/v3/408d8117e587491e86d5ab9baf5ceb03"
    );
  };

  const fetchENSAndProfile = async (addressOrENS: string) => {
    setIsLoading(true);
    setError("");
    setProfileInfo(null);
    try {
      const provider = getProvider();
      let resolvedAddress = addressOrENS;
      let resolvedENS = null;

      if (ethers.utils.isAddress(addressOrENS)) {
        resolvedENS = await provider.lookupAddress(addressOrENS);
      } else {
        const resolved = await provider.resolveName(addressOrENS);
        resolvedAddress = resolved || "";
        resolvedENS = addressOrENS;
      }

      setAddress(resolvedAddress || "");
      setENS(resolvedENS || "No ENS found");

      if (resolvedENS) {
        const name = await provider.lookupAddress(resolvedAddress);
        const resolver = await provider.getResolver(resolvedENS);
        if (resolver) {
          const description = await resolver.getText("description");
          const url = await resolver.getText("url");
          const twitter = await resolver.getText("com.twitter");
          const github = await resolver.getText("com.github");
          const avatar = await resolver.getText("avatar");
          setProfileInfo({
            name: name || "",
            description: description || "",
            url: url || "",
            twitter: twitter || "",
            github: github || "",
            avatar: avatar || "",
          });
        } else {
          setError("ENS information not found");
          setProfileInfo(null);
        }
      } else {
        setError("ENS information not found");
        setProfileInfo(null);
      }
    } catch (error) {
      console.error("Failed to fetch ENS and profile:", error);
      setError("Failed to fetch ENS and profile information");
    } finally {
      setIsLoading(false);
    }
  };

  const connectEthereum = async () => {
    if (window.ethereum) {
      try {
        const provider = getProvider();
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);
        setIsConnected(true);
        await fetchENSAndProfile(address);
      } catch (error) {
        console.error("Failed to connect to Ethereum:", error);
        setError("Failed to connect to Ethereum");
      }
    } else {
      setError("Ethereum wallet not detected");
    }
  };
  const handleManualLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem(
      "addressOrENS"
    ) as HTMLInputElement;
    if (input.value) {
      fetchENSAndProfile(input.value);
    }
  };
  const links = useProfile((state) => state.setLink);
  const handleContinue = () => {
    if (profileInfo?.name && profileInfo.name.length > 0) {
      useProfile.setState({ name: profileInfo.name });
    }
    if (profileInfo?.avatar && profileInfo.avatar.length > 0) {
      useProfile.setState({ image: profileInfo.avatar });
      useProfile.setState({ image_type: "url" });
    }
    if (profileInfo?.description && profileInfo.description.length > 0) {
      useProfile.setState({ description: profileInfo.description });
    }
    if (profileInfo?.github && profileInfo.github.length > 0) {
      const github = AllLink.find((e) => e.name === "Github");
      if (github) {
        links({
          name: github.name,
          url: `https://github.com/${profileInfo.github}`,
          icon: github.icon,
          uuid: uuidv7(),
          iconName: github.name,
          className: github.className,
          arweave: github.arweave,
        });
      }
    }
    if (profileInfo?.twitter && profileInfo.twitter.length > 0) {
      const twitter = AllLink.find((e) => e.name === "X");
      if (twitter) {
        links({
          name: twitter.name,
          url: `https://x.com/${profileInfo.twitter}`,
          icon: twitter.icon,
          uuid: uuidv7(),
          iconName: twitter.name,
          className: twitter.className,
          arweave: twitter.arweave,
        });
      }
    }
    if (profileInfo?.url && profileInfo.url.length > 0) {
      const website = AllLink.find((e) => e.name === "Web");
      if (website) {
        links({
          name: website.name,
          url: profileInfo.url,
          icon: website.icon,
          uuid: uuidv7(),
          iconName: website.name,
          className: website.className,
          arweave: website.arweave,
        });
      }
    }
    closeENSDialog();
    navigate("/theme");
  };
  return (
    <div>
      <div className="min-h-screen bg-yellow-300 flex flex-col p-4 sm:p-6 font-mono relative">
        <AnimatedBackground />
        <nav className="flex items-center justify-between mb-8 sm:mb-16 z-10">
          <div className="text-xl sm:text-2xl font-bold bg-black text-white px-3 py-1 sm:px-4 sm:py-2 rounded">
            <span className="text-yellow-300">META</span>Link
          </div>
          <ConnectButton />
        </nav>
        <div className="max-w-2xl mx-auto bg-white border-8 border-black p-8 shadow-[16px_16px_0_0_rgba(0,0,0,1)] z-10">
          <h1 className="text-5xl font-bold mb-8 text-center uppercase border-b-8 border-black pb-4">
            MetaPaths
          </h1>

          <div className="space-y-8">
            <button
              onClick={openENSDialog}
              className="w-full bg-blue-500 text-white py-6 text-2xl font-bold uppercase border-4 border-black hover:bg-blue-600 active:translate-y-1 transition-transform"
            >
              Use ENS
            </button>
            <div className="text-center text-3xl font-bold">- OR -</div>
            <button
              onClick={() => navigate("/theme")}
              className="w-full bg-red-500 text-white py-6 text-2xl font-bold uppercase border-4 border-black hover:bg-red-600 active:translate-y-1 transition-transform"
            >
              Create New Page
            </button>
          </div>

          <div className="mt-12 pt-8 border-t-8 border-black text-center">
            <p className="text-lg font-bold uppercase">
              Decentralized. Secure. Yours.
            </p>
          </div>
        </div>
        {isENSDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
            <div className="bg-white border-8 border-black p-8 max-w-md w-full shadow-[16px_16px_0_0_rgba(0,0,0,1)]">
              <h2 className="text-3xl font-bold mb-6 uppercase">ENS Options</h2>
              {!profileInfo && (
                <div className="space-y-6">
                  {hasMetaMask ? (
                    <>
                      {isConnected ? (
                        <button
                          onClick={() => fetchENSAndProfile(address)}
                          className="w-full bg-green-500 text-white py-4 text-xl font-bold uppercase border-4 border-black hover:bg-green-600 active:translate-y-1 transition-transform"
                        >
                          Fetch ENS
                        </button>
                      ) : (
                        <button
                          onClick={connectEthereum}
                          className="w-full bg-green-500 text-white py-4 text-xl font-bold uppercase border-4 border-black hover:bg-green-600 active:translate-y-1 transition-transform"
                        >
                          Connect to MetaMask
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() =>
                        window.open("https://metamask.io/", "_blank")
                      }
                      className="w-full bg-green-500 text-white py-4 text-xl font-bold uppercase border-4 border-black hover:bg-green-600 active:translate-y-1 transition-transform"
                    >
                      Install MetaMask
                    </button>
                  )}
                  <div className="text-center text-2xl font-bold">- OR -</div>
                  {isLoading ? (
                    <div className="flex justify-center items-center py-4">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <span className="ml-2 text-2xl font-bold">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleManualLookup} className="space-y-2">
                      <input
                        type="text"
                        placeholder="ETH address / ENS name"
                        name="addressOrENS"
                        value={ensInput}
                        onChange={(e) => setEnsInput(e.target.value)}
                        className="w-full p-4 text-xl border-4 border-black"
                      />
                      <button className="w-full bg-blue-500 text-white py-4 text-xl font-bold uppercase border-4 border-black hover:bg-blue-600 active:translate-y-1 transition-transform">
                        Fetch ENS Data
                      </button>
                    </form>
                  )}
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-100 border-4 border-red-500 text-red-700 font-bold">
                  {error}
                </div>
              )}

              {profileInfo && (
                <div className="mt-6 p-4 bg-green-100 border-4 border-green-500">
                  <h3 className="text-2xl font-bold mb-4">User Details</h3>
                  <div className="space-y-2">
                    {profileInfo.avatar && (
                      <img
                        src={profileInfo.avatar}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                      />
                    )}
                    <p>
                      <strong>Name:</strong> {profileInfo.name || "N/A"}
                    </p>
                    <p>
                      <strong>ENS:</strong> {ens}
                    </p>
                    <p className="truncate">
                      <strong>Address:</strong> {address}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {profileInfo.description || "N/A"}
                    </p>
                    <p>
                      <strong>URL:</strong> {profileInfo.url || "N/A"}
                    </p>
                    <p>
                      <strong>Twitter:</strong> {profileInfo.twitter || "N/A"}
                    </p>
                    <p>
                      <strong>GitHub:</strong> {profileInfo.github || "N/A"}
                    </p>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="w-full mt-4 bg-blue-500 text-white py-4 text-xl font-bold uppercase border-4 border-black hover:bg-blue-600 active:translate-y-1 transition-transform"
                  >
                    Continue
                  </button>
                  <button
                    onClick={closeENSDialog}
                    className="w-full mt-4 bg-gray-300 text-black py-4 text-xl font-bold uppercase border-4 border-black hover:bg-gray-400 active:translate-y-1 transition-transform"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {!profileInfo && (
                <button
                  onClick={closeENSDialog}
                  className="w-full mt-4 bg-gray-300 text-black py-4 text-xl font-bold uppercase border-4 border-black hover:bg-gray-400 active:translate-y-1 transition-transform"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnBoard;
