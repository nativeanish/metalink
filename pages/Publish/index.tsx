import { useEffect, useState } from "react";
import ConnectButton from "../../components/ConnectButton";
import { FaCheck, FaSpinner } from "react-icons/fa";
import BG from "./BG";
import useCounter from "../../store/useCounter";
import useArns from "../../store/useArns";
import upload from "../../utils/upload";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ModalAlert } from "../../components/ModalAlert";
import ReactConfetti from "react-confetti";
import AnimateText from "../../components/AnimateText";
import useEdit from "../../store/useEdit";

const steps = [
  "Setting up Arns Record",
  "Uploading Image",
  "Generating Content",
  "Uploading Content",
  "Writing on Process",
  "Finalizing",
];

function Publish() {
  const currentStep = useCounter((state) => state.counter);
  const setCurrentStep = useCounter((state) => state.setCounter);
  const arnsName = useArns((state) => state.arns);
  const setArnsName = useArns((state) => state.setArns);
  const loading = useArns((state) => state.loading);
  const isavailable = useArns((state) => state.isAvailable);
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme");
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [eroor, setError] = useState("");
  useEffect(() => {
    if (!theme) {
      navigate("/theme");
    }
  }, [theme]);
  const isEdit = useEdit((state) => state.isEdit);
  useEffect(() => {
    if (!isEdit) {
      if (arnsName) {
        setCurrentStep(1);
        upload(theme!, setIsAlertOpen, setError).then().catch(console.error);
      }
    }
  }, [isEdit]);
  const handleArnsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (arnsName) {
      upload(theme!, setIsAlertOpen, setError).then().catch(console.error);
    }
  };
  useEffect(() => {
    if (currentStep === 5) {
      setTimeout(() => {
        window.open(`https://${arnsName}_metapaths.ar.io`, "_blank");
        navigate("/dashboard");
      }, 4000);
    }
  }, [currentStep]);
  useEffect(() => {
    setCurrentStep(0);
  }, []);
  useEffect(() => {
    if (isAlertOpen && eroor.length > 0) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 4000);
    }
  }, [isAlertOpen, eroor]);
  return (
    <div className="min-h-screen p-6 font-mono">
      <BG />
      <nav className="flex items-center justify-between mb-8">
        <div className="text-2xl font-bold bg-black text-white px-4 py-2">
          <span className="text-yellow-300">META</span>Link
        </div>
        <ConnectButton />
      </nav>
      {isAlertOpen && eroor.length > 0 && (
        <ModalAlert
          isOpen={isAlertOpen}
          onClose={() => {
            setIsAlertOpen(false);
            setError("");
          }}
          title="Publish Alert"
        >
          <p className="mt-2">{eroor}</p>
        </ModalAlert>
      )}
      {currentStep === 5 ? (
        <div>
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={300}
            recycle={false}
            run={true}
          />
          <AnimateText
            text={[
              `${arnsName}_metpaths.ar.io`,
              "is published.",
              "Redirecting to page",
              "and analytics page",
            ]}
            delay={50}
          />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto mt-16">
          <div className="p-8 relative">
            <AnimatedTitle />
            {/* Offset shadow */}
            <div className="absolute -right-4 -bottom-4 w-full h-full -z-10" />
            {/* Steps Container */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentStep
                      ? "scale-105"
                      : index < currentStep
                      ? "opacity-50"
                      : "opacity-30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Step Number */}
                    <div
                      className={`w-12 h-12 flex items-center justify-center border-4 border-black font-bold text-xl
                      ${
                        index < currentStep
                          ? "bg-black text-white"
                          : index === currentStep
                          ? "bg-white"
                          : "bg-white"
                      }`}
                    >
                      {index < currentStep ? (
                        <FaCheck />
                      ) : index === currentStep ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        index + 1
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div
                        className={`border-4 border-black p-4 relative
                        ${
                          index === currentStep
                            ? "bg-white"
                            : index < currentStep
                            ? "bg-white"
                            : "bg-gray-800"
                        }`}
                      >
                        <h3 className="font-bold text-xl">{step}</h3>

                        {/* ARNS Input Form */}
                        {index === 0 && currentStep === 0 && (
                          <form
                            onSubmit={handleArnsSubmit}
                            className="mt-4 space-y-4"
                          >
                            <div className="flex gap-4">
                              <input
                                type="text"
                                value={arnsName}
                                onChange={(e) => setArnsName(e.target.value)}
                                placeholder="Enter ARNS name"
                                className="flex-1 border-4 border-black p-2 font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300"
                                required
                              />
                              <button
                                type="submit"
                                className="bg-black text-yellow-300 px-6 py-2 font-bold hover:bg-yellow-300 hover:text-black border-2 border-black transition-colors"
                              >
                                Submit
                              </button>
                            </div>
                            {loading && (
                              <div className="text-black font-bold mt-2">
                                Checking...
                              </div>
                            )}
                            {!loading && isavailable === false && (
                              <div className="text-red-500 font-bold mt-2">
                                Handle is not available
                              </div>
                            )}
                          </form>
                        )}

                        {/* Progress Bar */}
                        {index === currentStep && (
                          <div className="mt-4 h-2 bg-white border-2 border-black overflow-hidden">
                            <div className="h-full bg-black animate-[progress_2s_ease-in-out_infinite]" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-6 bg-black ml-6 my-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Publish;

const AnimatedTitle: React.FC = () => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showDots, setShowDots] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const fullText = "Publishing";
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText((prev) => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setShowDots(true);
      }
    }, 150);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (showDots) {
      const dotsInterval = setInterval(() => {
        setDots((prev) => {
          if (prev.length < 3) return prev + ".";
          return "";
        });
      }, 500);

      return () => clearInterval(dotsInterval);
    }
  }, [showDots]);

  return (
    <h1 className="text-4xl md:text-6xl font-bold mb-8 inline-block">
      <span className="bg-black text-yellow-300 px-4 py-2">
        {text}
        <span className="text-white">{dots}</span>
        {showCursor && <span className="animate-pulse">|</span>}
      </span>
    </h1>
  );
};
