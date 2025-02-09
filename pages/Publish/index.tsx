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
import { ARIO } from "@ar.io/sdk";
import useAddress from "../../store/useAddress";
import ArNS from "../../Image/ArNS";

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
  const setdata = useArns((state) => state.setdata);
  const data = useArns((state) => state.data);
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme");
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [checkprimary, setPrimary] = useState(false);
  const [eroor, setError] = useState("");
  useEffect(() => {
    if (!theme) {
      navigate("/theme");
    }
  }, [theme, navigate]);
  // const isEdit = useEdit((state) => state.isEdit);
  // useEffect(() => {
  //   if (!isEdit) {
  //     if (arnsName) {
  //       setCurrentStep(1);
  //       upload(theme!, setIsAlertOpen, setError).then().catch(console.error);
  //     }
  //   }
  // }, [isEdit, arnsName, setCurrentStep]);
  const address = useAddress((state) => state.address);
  const fetchroot = async () => {
    setPrimary(true);
    const ant = ARIO.init({});
    try {
      useArns.setState({ loading: true });
      setdata("");
      const info = await ant.getPrimaryName({ address: address! });
      if (
        info?.name &&
        info?.name.length > 0 &&
        info.processId &&
        info?.processId.length > 0
      ) {
        useArns.setState({ loading: false });
        setArnsName(`@${info.name}`);
        console.log(info.name);
        upload(theme!, setIsAlertOpen, setError).then().catch(console.error);
      } else {
        setPrimary(false);
        setError("No Primary Name Found");
        useArns.setState({ loading: false });
      }
    } catch (err) {
      console.log("here is your error");
      useArns.setState({ loading: false });
      setPrimary(false);
      setdata("ArNS primary name not Found");
    }
    useArns.setState({ loading: false });
    setPrimary(false);
  };
  const handleArnsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (arnsName) {
      upload(theme!, setIsAlertOpen, setError).then().catch(console.error);
    }
  };
  useEffect(() => {
    if (currentStep === 5) {
      setTimeout(() => {
        if (arnsName.startsWith("@")) {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 4000);
    }
  }, [navigate, currentStep, arnsName]);
  useEffect(() => {
    setCurrentStep(0);
    useEdit.setState({ isEdit: false });
  }, [setCurrentStep, setArnsName]);
  useEffect(() => {
    if (isAlertOpen && eroor.length > 0) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 4000);
    }
  }, [isAlertOpen, eroor, navigate]);
  return (
    <div className="min-h-screen p-6 font-mono">
      <BG />
      <nav className="flex items-center justify-between mb-8">
        <div className="flex flex-row gap-x-1">
          <div>
            <img
              src="https://arweave.net/agbO1BwHs9M8b68eMxeWNZP4eLt3Zsb2zXwNyTzjbYU"
              height="50px"
              width="50px"
            />
          </div>
          <div className="text-2xl font-bold bg-black text-white px-4 py-2 flex items-center justify-center">
            <span className="text-yellow-300">Meta</span>Links
          </div>
        </div>
        <ConnectButton />
      </nav>
      <ModalAlert
        isOpen={checkprimary}
        onClose={() => {
          setPrimary(false);
        }}
        title="Primary Name"
      >
        <p className="mt-2">Checking Primary Name from ArNS</p>
      </ModalAlert>
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
              arnsName.startsWith("@")
                ? `${arnsName}.ar.io`
                : `${arnsName}_metpaths.ar.io`,
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
                            <div className="flex flex-col gap-y-3">
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
                                  disabled={
                                    arnsName.startsWith("@") ? true : false
                                  }
                                  type="submit"
                                  className="bg-black text-yellow-300 px-6 py-2 font-bold hover:bg-yellow-300 hover:text-black border-2 border-black transition-colors"
                                >
                                  Submit
                                </button>
                              </div>
                              <div className="flex items-center justify-center font-bold">
                                - OR -
                              </div>
                              <div>
                                <button
                                  className="bg-black text-gray-200 px-6 py-3 font-bold w-full"
                                  onClick={() => fetchroot()}
                                >
                                  <div className="flex flex-row items-center justify-center gap-x-4 text-white">
                                    <ArNS color="white" />
                                    Use Your ArNS Primary Name
                                  </div>
                                </button>
                              </div>
                            </div>
                            {loading && (
                              <div className="text-black font-bold mt-2">
                                Checking...
                              </div>
                            )}
                            {data && data.length && (
                              <div className="text-red-500 font-bold mt-2">
                                {data}
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
