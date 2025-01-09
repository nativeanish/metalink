interface Props {
  name: string;
  image: string;
  description: string;
  links?: Array<{
    name: string;
    url: string;
    uuid: string;
    iconName: string;
    className: string;
    arweave: Array<string>;
  }>;
}
// Function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to check luminance and determine text color
const getTextColor = (backgroundColor: string) => {
  const rgb = parseInt(backgroundColor.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "black" : "white"; // Light -> dark text, dark -> light text
};

// Create an array to store used colors
const usedColors = new Set();

const BrutalistButton = ({
  arweave,
  text,
  href,
  id,
  name,
}: {
  arweave: string;
  text: string;
  href: string;
  id: string;
  name: string;
}) => {
  let backgroundColor;
  // Generate a unique color not already used
  do {
    backgroundColor = getRandomColor();
  } while (usedColors.has(backgroundColor));

  usedColors.add(backgroundColor);
  const textColor = getTextColor(backgroundColor);

  return (
    <button
      className={`w-full px-2 py-2 text-lg font-bold transition-all duration-200 rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 focus:outline-none focus:ring-0`}
      style={{ backgroundColor, color: textColor }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
        id={id}
        data-name={name}
      >
        <span className="truncate ml-2">{text}</span>
        <img
          className="w-6 h-6 ml-2"
          aria-hidden="true"
          src={`https://arweave.net/${arweave}`}
          alt={text}
        />
      </a>
    </button>
  );
};
function ClassicBrut(props: Props) {
  return (
    <div className="min-h-screen bg-yellow-300 text-black py-12 px-4 sm:px-6 lg:px-8">
      <button
        id="share"
        className="fixed top-4 right-4 md:top-8 md:right-8 z-10 flex items-center justify-center px-4 py-2 bg-white text-black font-bold rounded-none border-4 border-black brutalist-shadow hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="w-4 h-4 mr-2"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
          <polyline points="16 6 12 2 8 6"></polyline>
          <line x1="12" y1="2" x2="12" y2="15"></line>
        </svg>
        <span className="text-sm font-bold">SHARE</span>
      </button>

      <div className="max-w-md mx-auto pt-3">
        <div className="text-center">
          {props.image && props.image.length > 0 && (
            <>
              <div className="w-40 h-40 rounded-full mx-auto flex items-center justify-center border-4 border-black brutalist-shadow transform hover:rotate-3 transition-transform duration-300">
                <img
                  className="w-full h-full object-cover bg-white rounded-full"
                  src={props.image}
                  alt={
                    props.name && props.name.length > 0
                      ? props.name
                      : "Profile Picture"
                  }
                />
              </div>
            </>
          )}
          {props.name && props.name.length > 0 && (
            <>
              <h1 className="mt-6 text-5xl font-extrabold hover:tracking-wide transition-all duration-300">
                {props.name}
              </h1>
            </>
          )}
          {props.description && props.description.length > 0 && (
            <>
              <p className="mt-5 text-md font-bold">{props.description}</p>
            </>
          )}
        </div>
        {props.links && props.links.length > 0 && (
          <>
            <div className="flex flex-col items-center justify-center">
              <div className="mt-8 flex flex-col justify-center w-full box-border font-bold gap-y-5">
                {props.links.map((item, index) => {
                  return (
                    <div key={index}>
                      <BrutalistButton
                        arweave={item.arweave[0]}
                        text={item.name}
                        href={item.url}
                        id={item.uuid}
                        name={item.iconName}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-16 max-w-xs mx-auto text-center">
        <div className="bg-white p-6 border-4 border-black brutalist-shadow">
          <h2 className="text-xl font-bold text-black mb-6">
            CREATE YOUR OWN PAGE
          </h2>
          <button
            className="inline-block bg-black text-white font-bold py-3 px-6 border-4 border-black hover:bg-white hover:text-black transition-all duration-200"
            id="create"
          >
            JOIN US NOW
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClassicBrut;
