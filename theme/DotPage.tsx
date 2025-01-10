import { FaShare } from "react-icons/fa";
import { IconType } from "react-icons/lib";

interface Props {
  name?: string;
  image?: string;
  description?: string;
  links?: Array<{
    name: string;
    url: string;
    uuid: string;
    icon: IconType;
    iconName: string;
    className: string;
    arweave: Array<string>;
  }>;
}
export default function DotPage(props: Props) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <button
        id="share"
        className="fixed flex items-center flex-row space-x-2 top-4 right-4 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 z-10"
        aria-label="Share"
      >
        <FaShare className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        <div>Share</div>
      </button>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="p-6 sm:p-8 text-center bg-gradient-to-b from-blue-50 to-white">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6">
            {props.image && props.image.length ? (
              <img
                src={props.image}
                alt={props.name?.length ? props.name : "Profile Picture"}
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
              />
            ) : null}
          </div>
          {props.name && props.name.length > 0 && (
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              {props.name}
            </h1>
          )}
          {props.description && props.description && (
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 italic">
              {props.description}
            </p>
          )}
        </div>

        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          {props.links &&
            props.links.map((link, index) => (
              <a
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                href={link.url}
                id={link.uuid}
                data-name={link.iconName}
                className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-blue-100 transition-all duration-300 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <span className="flex items-center text-black">
                  <link.icon className="mr-3 sm:mr-4" />
                  <span className="font-semibold text-sm sm:text-base text-gray-700">
                    {link.name}
                  </span>
                </span>
                <span className="text-blue-500 font-bold">&rarr;</span>
              </a>
            ))}
        </div>

        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <button
            id="create"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Create your page
          </button>
        </div>
      </div>
    </div>
  );
}
