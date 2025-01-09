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

const ClassicLight = (props: Props) => {
  return (
    <>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <button
          id="share"
          className="fixed border-2 border-black top-4 right-4 md:top-8 md:right-8 z-10 flex items-center justify-center px-4 py-2 glass-effect text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-2"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          <span className="text-sm font-medium">Share</span>
        </button>
        <div className="max-w-md mx-auto pt-3">
          <div className="text-center space-y-8">
            {props.image && props.image.length > 0 && (
              <>
                <div className="w-32 h-32 rounded-2xl mx-auto flex items-center justify-center transform hover:rotate-3 transition-transform duration-300 shadow-lg">
                  <img
                    className="w-full h-full object-cover rounded-2xl bg-white border-black border-2"
                    src={props.image}
                    alt={props.name.length > 0 ? props.name : "Profile Image"}
                  />
                </div>
              </>
            )}
            <div className="space-y-4">
              {props.name && props.name.length > 0 && (
                <h1 className="text-5xl font-semibold text-gray-900 tracking-tight hover:tracking-wide transition-all duration-300">
                  {props.name}
                </h1>
              )}
              {props.description && props.description.length > 0 && (
                <>
                  <p className="mt-5 text-md text-gray-600">
                    {props.description}
                  </p>
                </>
              )}
            </div>
          </div>
          {props.links && props.links.length > 0 && (
            <>
              <div className="flex flex-col items-center justify-center mt-12">
                <div className="space-y-3 flex flex-col justify-center w-full max-w-sm">
                  {props.links.map((item, index) => {
                    return (
                      <div key={index}>
                        <a
                          className={`${item.className} transform hover:scale-105 transition-all duration-300 rounded-lg flex flex-row items-center justify-center space-x-4 p-3 font-medium shadow-sm hover:shadow-md`}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={item.url}
                          id={item.uuid}
                          data-name={item.iconName}
                        >
                          <div className="h-6 w-6 sm:h-6 sm:w-6 flex items-center justify-center">
                            <img
                              src={`https://arweave.net/${item.arweave[0]}`}
                              alt={item.iconName}
                              className="w-full h-full"
                            />
                          </div>
                          <p className="text-lg">{item.name}</p>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-20 max-w-xs mx-auto text-center">
          <div className="glass-effect rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Create Your Own Page
            </h2>
            <button
              id="create"
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Join Us Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ClassicLight;
