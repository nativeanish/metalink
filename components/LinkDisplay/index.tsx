import React, { useEffect, useState } from "react";
import { FaLink, FaTimes, FaPen, FaSave } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import useProfile from "../../store/useProfile";

interface LinkDisplayProps {
  id: string;
}

export function LinkDisplay({ id }: LinkDisplayProps) {
  const getLink = useProfile((state) => state.getLink);
  const [link, setLink] = useState<null | {
    name: string;
    url: string;
    icon: IconType;
  }>(null);
  useEffect(() => {
    const link = getLink(id);
    setLink({
      name: link.name,
      url: link.url,
      icon: link.icon,
    });
    setName(link.name);
    setUrl(link.url);
  }, [id]);
  const onChange = useProfile((state) => state.onChange);
  const onClose = useProfile((state) => state.onDelete);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(link?.name || "");
  const [url, setUrl] = useState(link?.url || "");

  const handleSave = () => {
    onChange(id, name, url);
    setIsEditing(false);
  };

  return (
    <>
      {link ? (
        <div className="w-full transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <div className="relative bg-yellow-300 border-4 border-black p-4 shadow-brutal">
            <div className="flex items-center justify-between gap-4 mb-2">
              {/* Title and Icon */}
              <div className="flex items-center gap-2">
                <div className="bg-black p-2 rounded-full">
                  <>
                    {React.createElement(link.icon, {
                      className: "w-6 h-6 text-yellow-300",
                    })}
                  </>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-bold text-xl bg-white border-2 border-black px-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <h3 className="font-bold text-xl uppercase">{name}</h3>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className="p-2 bg-black text-yellow-300 hover:bg-yellow-300 hover:text-black transition-colors duration-300 rounded-full border-2 border-black"
                  aria-label={isEditing ? "Save" : "Edit"}
                >
                  {isEditing ? (
                    <FaSave className="w-4 h-4" />
                  ) : (
                    <FaPen className="w-4 h-4" />
                  )}
                </button>
                {!isEditing && (
                  <button
                    onClick={() => onClose(id)}
                    className="p-2 bg-black text-yellow-300 hover:bg-yellow-300 hover:text-black transition-colors duration-300 rounded-full border-2 border-black"
                    aria-label="Close"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* URL Display/Edit */}
            <div className="flex items-center gap-2 bg-white border-2 border-black p-2">
              <FaLink className="w-4 h-4 flex-shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full text-sm bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-black"
                />
              ) : (
                <span className="truncate text-sm">{url}</span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
