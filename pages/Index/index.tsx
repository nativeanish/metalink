import type React from "react";
import { useState, useEffect, useRef } from "react";
import ConnectButton from "../../components/ConnectButton";
import {
  FaGithub,
  FaXTwitter,
  FaArrowRight,
  FaArrowDown,
} from "react-icons/fa6";
import AvailabilityModal from "../../components/AvailabilityModal";
import useAddress from "../../store/useAddress";
import { useNavigate } from "react-router-dom";
import BrutalistCarousel from "../../components/Card/Inex";
import AnimatedBackground from "../../components/AnimatedBackground";

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

const features = [
  {
    title: "Decentralized Storage",
    description: "All content stored permanently on Arweave",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      </svg>
    ),
  },
  {
    title: "Custom Domains",
    description: "Use ArNS for personalized domains",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
  },
  {
    title: "Multiple Themes",
    description: "Choose from various professionally designed themes",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  {
    title: "Analytics Dashboard",
    description: "Track views and engagement",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
];

export default function Index() {
  const [handle, setHandle] = useState("");
  const [currentHandle, setCurrentHandle] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const address = useAddress((state) => state.address);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHandle((prev) => (prev + 1) % handles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (address && address.length > 0) {
      const data = sessionStorage.getItem("redirectTrue");
      if (data === "true") {
        sessionStorage.removeItem("redirectTrue");
        navigate("/dashboard");
      }
    }
  }, [address, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Update navbar style
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = [
        { ref: heroRef, id: "hero" },
        { ref: featuresRef, id: "features" },
        { ref: examplesRef, id: "examples" },
        { ref: ctaRef, id: "cta" },
      ];

      for (const section of sections.reverse()) {
        if (
          section.ref.current &&
          section.ref.current.getBoundingClientRect().top <= 100
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-yellow-300 font-mono relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <AnimatedBackground />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-yellow-300 shadow-md py-2" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-row gap-x-1 items-center">
            <img
              src="https://arweave.net/agbO1BwHs9M8b68eMxeWNZP4eLt3Zsb2zXwNyTzjbYU"
              alt="MetaLinks Logo"
              className="h-12 w-12 transform hover:rotate-12 transition-transform duration-300"
            />
            <div className="hidden md:flex text-2xl font-bold bg-black text-white px-4 py-2 items-center justify-center transform hover:skew-x-2 transition-transform duration-300">
              <span className="text-yellow-300">Meta</span>Links
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection(heroRef)}
              className={`px-4 py-2 font-bold hover:underline relative ${
                activeSection === "hero" ? "text-black" : "text-gray-700"
              }`}
            >
              Home
              {activeSection === "hero" && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black" />
              )}
            </button>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className={`px-4 py-2 font-bold hover:underline relative ${
                activeSection === "features" ? "text-black" : "text-gray-700"
              }`}
            >
              Features
              {activeSection === "features" && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black" />
              )}
            </button>
            <button
              onClick={() => scrollToSection(examplesRef)}
              className={`px-4 py-2 font-bold hover:underline relative ${
                activeSection === "examples" ? "text-black" : "text-gray-700"
              }`}
            >
              Examples
              {activeSection === "examples" && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black" />
              )}
            </button>
            <ConnectButton />
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <ConnectButton />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex flex-col justify-center items-center border-2 border-black bg-white"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 bg-black transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-black my-1 transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-black transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden absolute w-full bg-yellow-300 border-t-2 border-black transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-60 border-b-2" : "max-h-0"
          }`}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection(heroRef)}
                className="px-4 py-2 font-bold text-left border-b border-black"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection(featuresRef)}
                className="px-4 py-2 font-bold text-left border-b border-black"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection(examplesRef)}
                className="px-4 py-2 font-bold text-left"
              >
                Examples
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showModal && (
        <AvailabilityModal
          handle={handle}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}

      <section
        ref={heroRef}
        className="min-h-screen flex items-center pt-20 pb-20 px-6 relative z-10"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2 transform hover:rotate-2 transition-transform duration-500">
              <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-300 transform rotate-45 translate-x-8 -translate-y-8"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-300 transform rotate-45 -translate-x-8 translate-y-8"></div>

                <div className="relative">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="inline-block w-4 h-4 bg-black mr-2"></span>
                    Claim Your Handle
                  </h2>
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Your handle"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        className="w-full bg-gray-100 text-black p-4 text-base outline-none border-2 border-black transform transition-transform focus:translate-x-1 focus:translate-y-1"
                      />
                      <div className="absolute right-0 top-0 h-full flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500 font-medium transition-opacity duration-500 opacity-80 text-sm">
                          _metalinks.{handles[currentHandle]}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (handle && handle.length > 0) {
                          setShowModal(true);
                        }
                      }}
                      className="bg-black text-yellow-300 hover:bg-yellow-400 hover:text-black px-4 py-3 text-base transition-colors whitespace-nowrap border-2 border-black font-bold transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none"
                    >
                      Claim Your Handle
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:order-1">
              <div className="mb-8 transform hover:translate-x-2 transition-transform duration-500">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <div className="overflow-hidden">
                    <span className="block transform translate-y-0 opacity-100 transition-all duration-700 delay-100">
                      Your Links,
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <span className="block transform translate-y-0 opacity-100 transition-all duration-700 delay-300">
                      Your Control,
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <span className="bg-black text-yellow-300 px-2 transform hover:skew-x-2 transition-transform duration-300 inline-block animate-pulse">
                      Decentralized.
                    </span>
                  </div>
                </h1>
                <p className="text-xl mb-8 max-w-lg font-medium transform translate-y-0 opacity-100 transition-all duration-700 delay-500">
                  Create your decentralized link hub. Own your content, control
                  your presence. No intermediaries, just pure web3 freedom.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 transform translate-y-0 opacity-100 transition-all duration-700 delay-700">
                  <button
                    onClick={() => scrollToSection(featuresRef)}
                    className="bg-black text-yellow-300 px-6 py-3 font-bold hover:bg-yellow-400 hover:text-black border-2 border-black transition-colors transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none"
                  >
                    Learn More
                  </button>
                  <button
                    onClick={() => navigate("/theme")}
                    className="bg-white text-black px-6 py-3 font-bold hover:bg-black hover:text-white border-2 border-black transition-colors flex items-center justify-center gap-2 transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none"
                  >
                    Get Started <FaArrowRight className="animate-bounce-x" />
                  </button>
                </div>
              </div>

              <div className="hidden md:flex items-center mt-16 animate-bounce">
                <FaArrowDown className="mr-2" />
                <span className="font-bold">Scroll to explore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={featuresRef}
        className="py-20 px-6 bg-white relative z-10"
        style={{
          clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0 95%)",
          paddingTop: "10rem",
          paddingBottom: "10rem",
          marginTop: "-5rem",
          marginBottom: "-5rem",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-300 -rotate-2 px-4 py-2 border-2 border-black mb-4 transform hover:rotate-2 transition-transform duration-300">
              <h2 className="text-4xl md:text-5xl font-bold">
                Why Choose MetaLinks?
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The decentralized alternative to traditional link-in-bio services,
              built on Arweave for permanent storage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border-4 border-black p-6 bg-yellow-300 transform hover:-translate-y-2 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
                style={{
                  transform: `rotate(${index % 2 === 0 ? "2" : "-2"}deg)`,
                }}
              >
                <div className="bg-black text-yellow-300 p-3 inline-block rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-800">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={examplesRef} className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-black text-yellow-300 px-6 py-3 mb-4 transform hover:skew-x-2 transition-transform duration-300">
              <h2 className="text-4xl md:text-5xl font-bold">
                Featured Examples
              </h2>
            </div>
            <p className="text-xl max-w-2xl mx-auto">
              Check out these stunning MetaLinks profiles created by our
              community.
            </p>
          </div>

          <div className="transform hover:scale-105 transition-transform duration-500">
            <BrutalistCarousel />
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-300 rotate-1 px-4 py-2 border-2 border-black mb-4 transform hover:-rotate-1 transition-transform duration-300">
              <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creating your decentralized link hub is simple and
              straightforward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-black z-0"></div>

            <div className="relative z-10 bg-white border-4 border-black p-6 transform hover:-rotate-2 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-12 h-12 bg-black text-yellow-300 rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Connect Your Wallet
              </h3>
              <p className="text-gray-700 text-center">
                Link your ArConnect or MetaMask wallet to get started.
              </p>
            </div>

            <div className="relative z-10 bg-white border-4 border-black p-6 transform hover:rotate-2 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-12 h-12 bg-black text-yellow-300 rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Customize Your Profile
              </h3>
              <p className="text-gray-700 text-center">
                Choose a theme and add your links, bio, and profile image.
              </p>
            </div>

            <div className="relative z-10 bg-white border-4 border-black p-6 transform hover:-rotate-2 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-12 h-12 bg-black text-yellow-300 rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Publish & Share
              </h3>
              <p className="text-gray-700 text-center">
                Publish to Arweave and share your permanent, decentralized link
                hub.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={ctaRef}
        className="py-20 px-6 bg-black text-white relative z-10"
        style={{
          clipPath: "polygon(0 10%, 100% 0, 100% 90%, 0 100%)",
          paddingTop: "10rem",
          paddingBottom: "10rem",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-300">
            Ready to Create Your MetaLink?
          </h2>
          <p className="text-xl mb-8">
            Join the decentralized web revolution today and take control of your
            online presence.
          </p>
          <button
            onClick={() => navigate("/theme")}
            className="bg-yellow-300 text-black px-8 py-4 font-bold text-xl hover:bg-yellow-400 transition-colors border-2 border-yellow-300 hover:border-yellow-400 transform hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-0 active:shadow-none"
          >
            Get Started Now
          </button>

          <div className="mt-12 flex justify-center space-x-4">
            <div className="w-4 h-4 bg-yellow-300 animate-bounce delay-100"></div>
            <div className="w-4 h-4 bg-yellow-300 animate-bounce delay-200"></div>
            <div className="w-4 h-4 bg-yellow-300 animate-bounce delay-300"></div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 bg-yellow-300 border-t-4 border-black relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <img
                src="https://arweave.net/agbO1BwHs9M8b68eMxeWNZP4eLt3Zsb2zXwNyTzjbYU"
                alt="MetaLinks Logo"
                className="h-10 w-10 mr-2"
              />
              <span className="text-xl font-bold">
                <span className="bg-black text-yellow-300 px-2">Meta</span>Links
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/nativeanish/metalink"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors transform hover:scale-110 transition-transform duration-300"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/metalinks_ar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors transform hover:scale-110 transition-transform duration-300"
              >
                <FaXTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-black text-center">
            <p className="animate-pulse">
              © {new Date().getFullYear()} MetaLinks. Built on Arweave.
            </p>
          </div>
        </div>
      </footer>

      <div className="fixed top-1/4 left-10 w-8 h-8 bg-black transform rotate-45 animate-float opacity-20 hidden md:block"></div>
      <div className="fixed top-1/3 right-10 w-12 h-12 border-4 border-black transform -rotate-12 animate-float opacity-20 hidden md:block"></div>
      <div className="fixed bottom-1/4 left-20 w-10 h-10 bg-black rounded-full animate-bounce opacity-20 hidden md:block"></div>
      <div className="fixed bottom-1/3 right-20 w-6 h-6 bg-yellow-500 transform rotate-12 animate-float opacity-20 hidden md:block"></div>
    </main>
  );
}
