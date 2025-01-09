import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import AllLink from "../../utils/AllLink";
import { uuidv7 } from "uuidv7";
import { IconType } from "react-icons/lib";
import useProfile from "../../store/useProfile";
export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState(AllLink);
  const searchRef = useRef<HTMLDivElement>(null);
  const setLink = useProfile((state) => state.setLink);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSave = (name: string, icon: IconType) => {
    const link = AllLink.find((item) => item.name === name);
    if (link) {
      setLink({
        name,
        icon,
        url: "",
        uuid: uuidv7(),
        iconName: name,
        className: link.className,
        arweave: link.arweave,
      });
      setQuery("");
    }
  };
  useEffect(() => {
    if (query) {
      setFilteredSuggestions(
        AllLink.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [query]);

  return (
    <div ref={searchRef} className="relative w-full  mx-auto font-mono">
      {/* Search Container */}
      <div className="relative  bg-yellow-300 border-4 border-black">
        {/* Black offset background for brutalist effect */}
        <div className="absolute -right-2 -bottom-2 w-full h-full bg-black" />

        {/* Search input */}
        <div className="relative flex items-center bg-yellow-300 p-4 z-10 ">
          <FaSearch className="w-6 h-6 mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="ADD LINKS ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-black placeholder-black 
                      focus:outline-none uppercase font-bold"
          />
        </div>
      </div>

      {/* Suggestions Drawer */}
      {isOpen && (
        <div className="absolute w-full mt-4 border-4 border-black bg-yellow-300 z-20">
          {/* White offset background */}
          <div className="absolute -right-2 -bottom-2 w-full h-full bg-white" />

          {/* Suggestions list */}
          <div className="relative z-10">
            {filteredSuggestions.length > 0 ? (
              <div className="divide-y-2 divide-black">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-black hover:text-[#FFE135] cursor-pointer 
                             transition-colors font-bold flex items-center justify-between"
                    onClick={() => {
                      handleSave(suggestion.name, suggestion.icon);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full`}>
                        <suggestion.icon className="w-5 h-5" />
                      </div>
                      <span>{suggestion.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 font-bold flex items-center gap-3">
                <FaSearch className="w-5 h-5" />
                <span>NO RESULTS FOUND</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
