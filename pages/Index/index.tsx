import ConnectButton from "../../components/ConnectButton";
import { useState, useEffect } from "react";
import GlitchText from "../../components/Glitch";
import { glitchText } from "../../utils/glitchEffect";
import "../../components/Glitch/style.css";
import AvailabilityModal from "../../components/AvailabilityModal";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import useAddress from "../../store/useAddress";
import { useNavigate } from "react-router-dom";
import BrutalistCarousel from "../../components/Card/Inex";

const handles = [
  "permadao.io",
  "testnp.com",
  "weavedb.app",
  "zigza.xyz",
  "perma.surf",
  "avocadio.xyz",
  "mz2gateway.online",
  "ar.aosphere.xyz",
  "ar-we-ave-ao.online",
  "ar.xyz",
  "ar.lucifer0x17.dev",
  "d-ao.site",
  "aoshield.xyz",
  "iamhodling.org",
  "g8way.megabyte0x.xyz",
  "arweave.chat",
  "r4dn.site",
  "bilolbaba.space",
  "zaurmammadov.xyz",
  "renecrypt.space",
  "ar.omron.ai",
  "defi.ao",
  "medyoz.com",
  "djeveras.xyz",
  "dlzvy.fun",
  "elcinbitcoin.xyz",
  "logosnodos.xyz",
  "derad.network",
  "1337pump.lol",
  "codehodl.xyz",
  "vela-gateway.com",
  "fromartoao.xyz",
  "perma-web.xyz",
  "g8way.0rbit.co",
  "rufetnaliyev.xyz",
  "ario-t-000001.nodeforge.io",
  "mustafakara.store",
  "ar01.fyeo.io",
  "adn79.pro",
  "arfor.us",
  "figmental.xyz",
  "arweave.ph",
  "subspacer.xyz",
  "retrogen.xyz",
  "xwhyzet.xyz",
  "singha.fun",
  "openar.dev",
  "exnihilio.dnshome.de",
  "ar.perplex.finance",
  "liglow.com",
  "ar.anyone.tech",
  "arweave.net",
  "nodezeta.site",
  "2save.xyz",
  "dilsinay2814.online",
  "lorento.xyz",
  "darksunrayz.xyz",
  "leechshop.com",
  "0xkullanici.online",
  "arweave.developerdao.com",
  "ar.secret-network.xyz",
  "haliltktl.online",
  "love4src.com",
  "utkububadymension.xyz",
  "weaversnodes.info",
  "thanhapple.store",
  "koltigin.xyz",
  "gerenimo.click",
  "nodehub.site",
  "regarets.xyz",
  "herculesnode.site",
  "moruehoca.store",
  "vrising.online",
  "skindetect.online",
  "ar.ilaybilge.xyz",
  "hexamz.site",
  "stanbeornode.xyz",
  "vevivofficial.xyz",
  "ar.ionode.online",
  "iblis.world",
  "software0x.space",
  "arceina.fun",
  "rtmpsunucu.online",
  "khacasablanca.top",
  "mrciga.com",
  "recepgocmen.com",
  "boramirs.store",
  "vnnode.top",
];

export default function Index() {
  const [handle, setHandle] = useState("");
  const [currentHandle, setCurrentHandle] = useState(0);
  const [glitchText1, setGlitchText1] = useState("Your Links,");
  const [glitchText2, setGlitchText2] = useState("Your Control,");
  const [glitchText3, setGlitchText3] = useState("Decentralized.");
  const [glitchComplete, setGlitchComplete] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const address = useAddress((state) => state.address);
  const [error, setError] = useState("");
  useEffect(() => {
    if (address && address.length > 0) {
      const data = sessionStorage.getItem("redirectTrue");
      if (data === "true") {
        sessionStorage.removeItem("redirectTrue");
        navigate("/dashboard");
      }
    }
  }, [address]);
  useEffect(() => {
    setError("");
    if (handle.length > 9) {
      setError("Name should be less than 8 characters");
    } else if (!/^[a-z0-9]+$/.test(handle)) {
      setError("Only lowercase letters and numbers are allowed");
    } else {
      setError("");
    }
  }, [handle]);
  // Handle rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHandle((prev) => (prev + 1) % handles.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Single glitch effect on mount
  useEffect(() => {
    if (glitchComplete) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setGlitchText1(glitchText("Your Links,", iteration));
      setGlitchText2(glitchText("Your Control,", iteration));
      setGlitchText3(glitchText("Decentralized.", iteration));

      iteration += 1;

      if (iteration >= 12) {
        clearInterval(interval);
        setGlitchText1("Your Links,");
        setGlitchText2("Your Control,");
        setGlitchText3("Decentralized.");
        setGlitchComplete(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [glitchComplete]);

  return (
    <main className="min-h-screen bg-yellow-300 p-6 font-mono relative overflow-hidden">
      {/* Binary Rain Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
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

      <nav className="flex items-center justify-between mb-20 relative z-[60]">
        <div className="flex flex-row gap-x-1">
          <div>
            <img
              src="https://arweave.net/agbO1BwHs9M8b68eMxeWNZP4eLt3Zsb2zXwNyTzjbYU"
              height="50px"
              width="50px"
            />
          </div>
          <div className="hidden md:flex text-2xl font-bold bg-black text-white px-4 py-2 items-center justify-center">
            <span className="text-yellow-300">Meta</span>Links
          </div>
        </div>
        <ConnectButton />
      </nav>
      {show && (
        <AvailabilityModal
          handle={handle}
          isOpen={show}
          onClose={() => setShow(false)}
        />
      )}
      <div className="max-w-4xl mx-auto mb-16 relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
          <GlitchText text={glitchText1} />
          <br />
          <GlitchText text={glitchText2} />
          <br />
          <GlitchText
            text={glitchText3}
            variant="black"
            className="transform hover:scale-105 transition-transform duration-300"
          />
        </h1>
        <p className="text-xl mb-8 max-w-2xl font-medium">
          Create your decentralized link hub. Own your content, control your
          presence. No intermediaries, just pure web3 freedom.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-20 relative z-10">
        <div className="bg-white border-4 border-black p-8 transform hover:translate-x-1 hover:translate-y-1 transition-transform">
          <div className="space-y-4">
            <div className="bg-black text-white p-4">
              <h2 className="text-lg mb-2">Claim Your Handle</h2>
              <div className="flex gap-2">
                <div className="flex-grow relative">
                  <input
                    type="text"
                    placeholder="Your handle"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full bg-white text-black p-2 sm:p-3 text-sm sm:text-base outline-none"
                  />
                  <div className="absolute right-0 top-0 h-full  items-center pr-3 pointer-events-none hidden sm:flex">
                    <span className="text-black font-medium transition-opacity duration-500 opacity-80 text-sm sm:text-base">
                      _metalinks.{handles[currentHandle]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (handle && handle.length > 0) {
                      setShow(true);
                    }
                  }}
                  disabled={handle.length === 0 || error.length > 0}
                  className="bg-yellow-300 text-black hover:bg-yellow-400 px-3 sm:px-4 py-2 text-sm sm:text-base transition-colors whitespace-nowrap"
                >
                  Claim
                </button>
              </div>
            </div>
            {error.length > 0 && handle.length > 0 && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
          </div>
        </div>
      </div>
      <div className="text-center mb-20 relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
          Feature User
        </h2>
      </div>
      <BrutalistCarousel />
      <footer className="w-full  py-8 mt-auto">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-end justify-center space-y-4">
            <div className="flex items-center space-x-6">
              <a href="https://github.com/nativeanish/metalink" target="_blank">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="https://x.com/metalinks_ar" target="_blank">
                <FaXTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
