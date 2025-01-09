import { IconType } from "react-icons/lib";
import { create } from "zustand";
type Link = {
  name: string;
  url: string;
  icon: IconType;
  uuid: string;
  iconName: string;
  className: string;
  arweave: Array<string>;
};
interface Props {
  name: string;
  image: string;
  image_type: string;
  set_image_type: (image_type: string) => void;
  description: string;
  links: Array<Link>;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setImage: (image: string) => void;
  setLink: (link: Link) => void;
  onSave: (uuid: string, name: string, url: string) => void;
  onDelete: (uuid: string) => void;
  getLink: (uuid: string) => Link;
  onChange: (uuid: string, name?: string, url?: string) => void;
  clear: () => void;
}
const useProfile = create<Props>((set, get) => ({
  name: "",
  image_type: "image/svg+xml",
  set_image_type: (image_type) => set({ image_type }),
  image: "",
  description: "",
  links: [],
  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setImage: (image) => set({ image }),
  setLink: (link) => set((state) => ({ links: [...state.links, link] })),
  onSave: (id, name, url) =>
    set((state) => ({
      links: state.links.map((l) => (l.uuid === id ? { ...l, name, url } : l)),
    })),
  onDelete: (id) =>
    set((state) => ({ links: state.links.filter((l) => l.uuid !== id) })),
  getLink: (id) => {
    const link = get().links.find((l) => l.uuid === id);
    if (!link) throw new Error(`Link with id ${id} not found`);
    return link;
  },
  clear: () => set({ name: "", image: "", description: "", links: [] }),
  onChange: (id, name, url) => {
    if (name || url) {
      set((state) => ({
        links: state.links.map((l) =>
          l.uuid === id ? { ...l, name: name || l.name, url: url || l.url } : l
        ),
      }));
    }
  },
}));

export default useProfile;
