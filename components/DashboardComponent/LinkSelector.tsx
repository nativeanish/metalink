import { FaChevronDown, FaGlobe, FaPlus, FaTrash } from "react-icons/fa";
import { _state } from "../../store/useData";
import { TbReload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

interface LinkSelectorProps {
  selectedLink: _state;
  links: Array<_state>;
  isDropdownOpen: boolean;
  onLinkChange: (link: _state) => void;
  onDropdownToggle: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  reload: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LinkSelector({
  selectedLink,
  links,
  isDropdownOpen,
  onLinkChange,
  onDropdownToggle,
  onDelete,
  reload,
}: LinkSelectorProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white border-4 border-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 mb-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Select a Page</h2>
      <p className="text-gray-600 mb-4">
        Choose a link to view its performance and manage it
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-[300px]">
          <button
            onClick={onDropdownToggle}
            className="w-full p-2 border-2 border-gray-800 bg-white flex justify-between items-center"
          >
            {selectedLink.name}
            <FaChevronDown
              className={`transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onLinkChange(link)}
                  className="w-full p-2 text-left hover:bg-gray-100"
                >
                  {link.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {/* <button
            onClick={() => onEdit(selectedLink.id)}
            className="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-800 bg-white hover:bg-gray-100 flex items-center justify-center"
          >
            <FaEdit className="w-4 h-4 mr-2" /> Edit
          </button> */}
          <button
            className="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-800 bg-white hover:bg-gray-100 flex items-center justify-center"
            onClick={() => navigate("/theme")}
          >
            <FaPlus className="w-4 h-4 mr-2" />
            New
          </button>
          <button
            onClick={() => onDelete(selectedLink.id)}
            className="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-800 bg-white hover:bg-gray-100 flex items-center justify-center text-red-600 hover:text-red-800"
          >
            <FaTrash className="w-4 h-4 mr-2" /> Delete
          </button>
          <button
            onClick={() => reload(true)}
            className="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-800 bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 hover:text-gray-900"
          >
            <TbReload className="w-4 h-4 mr-2" /> Reload
          </button>
          <button
            onClick={() => {
              console.log(selectedLink.name);
              if (selectedLink.name.startsWith("@")) {
                window.open(`https://${selectedLink.name}.ar.io`, "_blank");
              } else {
                window.open(
                  `https://${selectedLink.name}_metalinks.ar.io`,
                  "_blank"
                );
              }
            }}
            className="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-800 bg-white hover:bg-gray-100 flex items-center justify-center text-blue-600 hover:text-blue-800"
          >
            <FaGlobe className="w-4 h-4 mr-2" /> View
          </button>
        </div>
      </div>
    </div>
  );
}
