interface BentoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function BentoButton({
  children,
  className = "",
  ...props
}: BentoButtonProps) {
  return (
    <button
      {...props}
      className={`transform rounded-lg border-2 border-gray-300 bg-gray-800 px-4 py-2 text-gray-100 shadow-[4px_4px_0px_0px_rgba(229,231,235,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(229,231,235,1)] active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(229,231,235,1)] ${className}`}
    >
      {children}
    </button>
  );
}
import { BsPencilSquare, BsShare } from "react-icons/bs";
import { IconType } from "react-icons/lib";
interface Props {
  name: string;
  image: string;
  description: string;
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
function BentoDark(props: Props) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        {/* Profile Section */}
        <div className="mb-12 flex flex-col items-center space-y-4">
          {props.image && props.image.length > 0 && (
            <>
              <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-700">
                <img
                  src={props.image}
                  alt={props.name || "Profile Picture"}
                  className="h-full w-full object-cover bg-white"
                />
              </div>
            </>
          )}
          {props.name && props.name.length > 0 && (
            <>
              <h1 className="text-4xl font-bold">{props.name}</h1>
            </>
          )}
          {props.description && props.description.length > 0 && (
            <>
              <p className="text-center text-lg">{props.description}</p>
            </>
          )}

          <div className="flex space-x-4">
            <div className="relative">
              <BentoButton className="flex items-center gap-2" id="share">
                <BsShare className="h-5 w-5" />
                Share Profile
              </BentoButton>
            </div>
            <BentoButton
              onClick={() => window.open("#", "_blank")}
              className="flex items-center gap-2"
              id="create"
            >
              <BsPencilSquare className="h-5 w-5" />
              Create Your Own
            </BentoButton>
          </div>
        </div>
        {props.links && props.links.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {props.links.map((item, index) => {
                return (
                  <div key={index}>
                    <a
                      target="_blank"
                      href={item.url}
                      id={item.uuid}
                      data-name={item.iconName}
                      className={`group relative block transform rounded-lg border-2 border-black bg-gray-800 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:rotate-3`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-8 w-8" />
                        <span className="text-lg font-semibold">
                          {item.name}
                        </span>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BentoDark;
