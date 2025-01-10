import ConnectButton from "../../components/ConnectButton";
import DeviceMockup from "../../components/DeviceMockUp";
import ImageUploader from "../../components/Editor/ImageUploader";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import SearchBar from "../../components/SearchBar";
import { LinkDisplay } from "../../components/LinkDisplay";
import useProfile from "../../store/useProfile";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import themes from "../../constants/themes";
import BentoDark from "../../theme/BentoDark";
import { FaUpload } from "react-icons/fa";
import ClassicLight from "../../theme/ClassicLight";
import ClassicDark from "../../theme/ClassicDark";
import ClassicBrut from "../../theme/ClassicBrut";
import BentoLight from "../../theme/BentoLight";
import useAddress from "../../store/useAddress";
import ENS from "../../Image/ENS";
import { ethers } from "ethers";
import AllLink from "../../utils/AllLink";
import { uuidv7 } from "uuidv7";

function Editor() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Access the 'theme' query parameter
  const _theme = searchParams.get("theme");
  const theme = themes.find((t) => t.title === _theme);
  const view = searchParams.get("view");
  useEffect(() => {
    if (!theme) {
      navigate("/theme");
    }
  }, [theme, view]);

  const name = useProfile((state) => state.name);
  const setName = useProfile((state) => state.setName);
  const description = useProfile((state) => state.description);
  const setDescription = useProfile((state) => state.setDescription);
  const link = useProfile((state) => state.links);
  const image = useProfile((state) => state.image);
  const type = useAddress((state) => state.type);
  const address = useAddress((state) => state.address);
  const fetchens = async () => {
    if (
      type === "metamask" &&
      window.ethereum &&
      window.ethereum.request &&
      window.ethereum.isMetaMask
    ) {
      try {
        if (address && ethers.utils.isAddress(address)) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const ensName = await provider.lookupAddress(address);
          if (ensName) {
            const resolver = await provider.getResolver(ensName);
            if (resolver) {
              const name = (await resolver.getText("name")) || ensName;
              const description = await resolver.getText("description");
              const image = await resolver.getText("avatar");
              const web = await resolver.getText("url");
              const twitter = await resolver.getText("com.twitter");
              const github = await resolver.getText("com.github");
              if (name && name.length > 0) {
                useProfile.setState({ name: name });
              }
              if (description && description.length > 0) {
                useProfile.setState({ description: description });
              }
              if (image && image.length > 0) {
                useProfile.setState({ image: image });
                useProfile.setState({ image_type: "url" });
              }
              if (github && github.length > 0) {
                const _github = AllLink.find((e) => e.name === "Github");
                if (_github) {
                  useProfile.getState().setLink({
                    name: _github.name,
                    url: `https://github.com/${github}`,
                    icon: _github.icon,
                    uuid: uuidv7(),
                    iconName: _github.name,
                    className: _github.className,
                    arweave: _github.arweave,
                  });
                }
              }
              if (twitter && twitter.length > 0) {
                const _twitter = AllLink.find((e) => e.name === "X");
                if (_twitter) {
                  useProfile.getState().setLink({
                    name: _twitter.name,
                    url: `https://x.com/${twitter}`,
                    icon: _twitter.icon,
                    uuid: uuidv7(),
                    iconName: _twitter.name,
                    className: _twitter.className,
                    arweave: _twitter.arweave,
                  });
                }
              }
              if (web && web.length > 0) {
                const website = AllLink.find((e) => e.name === "Web");
                if (website) {
                  useProfile.getState().setLink({
                    name: website.name,
                    url: web,
                    icon: website.icon,
                    uuid: uuidv7(),
                    iconName: website.name,
                    className: website.className,
                    arweave: website.arweave,
                  });
                }
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div
      id="main"
      className="h-screen bg-yellow-300 p-6 font-mono relative overflow-hidden flex flex-col"
    >
      <nav className="flex items-center justify-between mb-4 relative z-10">
        <div className="text-2xl font-bold bg-black text-white px-4 py-2">
          <span className="text-yellow-300">META</span>Link
        </div>
        <ConnectButton />
      </nav>
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Panel - 25% */}
        <div className="w-1/4 flex flex-col gap-6  border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-auto bg-white items-center">
          <h2 className="text-2xl font-bold uppercase border-b-4 border-black pb-4">
            Edit Content
          </h2>
          <ImageUploader />
          {type === "metamask" && (
            <div>
              <button
                className="flex items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] justify-center gap-x-2 border-2 border-black bg-white p-2
                     font-mono font-bold transition-all duration-200 hover:-translate-y-0.5 
                     hover:bg-gray-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0"
                onClick={() => fetchens()}
              >
                <ENS />
                <div>Fetch from ENS</div>
              </button>
            </div>
          )}
          <Input value={name} onChange={(e) => setName(e)} width="w-full" />
          <TextArea
            value={description}
            onChange={(e) => setDescription(e)}
            width="w-full"
          />
          <SearchBar />
          {link.map((l, e) => (
            <LinkDisplay key={e} id={l.uuid} />
          ))}
          <button
            onClick={() => navigate(`/publish?theme=${theme?.title}`)}
            className="flex w-full items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] justify-center gap-x-2 border-2 border-black bg-yellow-300 p-2
                     font-mono font-bold transition-all duration-200 hover:-translate-y-0.5 
                     hover:bg-yellow-400 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0"
          >
            <FaUpload className="h-4 w-4" />
            Upload
          </button>
        </div>

        {/* Right Panel - 75% */}
        <div className="w-3/4 overflow-auto relative z-0">
          <DeviceMockup _view={view || "mobile"}>
            {theme?.title === "BentoDark" && (
              <BentoDark
                name={name}
                description={description}
                image={image}
                links={link}
              />
            )}
            {theme?.title === "classicLight" && (
              <ClassicLight
                name={name}
                description={description}
                image={image}
                links={link}
              />
            )}
            {theme?.title === "classicDark" && (
              <ClassicDark
                name={name}
                description={description}
                image={image}
                links={link}
              />
            )}
            {theme?.title === "classicBrut" && (
              <ClassicBrut
                name={name}
                description={description}
                image={image}
                links={link}
              />
            )}
            {theme?.title === "BentoLight" && (
              <BentoLight
                name={name}
                description={description}
                image={image}
                links={link}
              />
            )}
          </DeviceMockup>
        </div>
      </div>
    </div>
  );
}

export default Editor;
