import React, { useState, useEffect } from "react";
import { LinkPerformanceData } from "./types";
import { LinkSelector } from "./LinkSelector";
import { PerformanceChart } from "./PerformanceChart";
import { QuickStats } from "./QuickStats";
import { LinkViewsTable } from "./tables/LinkViewsTable";
import { ClickHistoryTable } from "./tables/ClickHistoryTable";
import { delete_page, get_state } from "../../utils/aos";
import useAddress from "../../store/useAddress";
import useData, {
  _state,
  get_links,
  getLinkPerformanceDataByDate,
} from "../../store/useData";
import useProfile from "../../store/useProfile";
import AllLink from "../../utils/AllLink";
import themes from "../../constants/themes";
import { useNavigate } from "react-router-dom";
import useEdit from "../../store/useEdit";
import useArns from "../../store/useArns";
import AnimatedBackground from "../AnimatedBackground";
export default function DashboardChild({
  reload,
}: {
  reload: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const state = useData((state) => state.state);
  const [selectedLink, setSelectedLink] = useState<_state>(state[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chartData, setChartData] = useState<LinkPerformanceData[]>(
    getLinkPerformanceDataByDate(selectedLink)
  );
  const address = useAddress((state) => state.address);
  const clear = useProfile((state) => state.clear);
  const setLink = useProfile((state) => state.setLink);
  const navigate = useNavigate();
  useEffect(() => {
    if (address) {
      get_state(address);
    }
  }, [address]);
  useEffect(() => {
    setChartData(getLinkPerformanceDataByDate(selectedLink));
  }, [selectedLink, setChartData]);

  useEffect(() => {
    setChartData(getLinkPerformanceDataByDate(selectedLink));
  }, [selectedLink]);

  const handleLinkChange = (link: _state) => {
    setSelectedLink(link);
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    setedit(false);
    setUUid("");
  }, []);
  const setedit = useEdit((state) => state.setIsEdit);
  const setUUid = useEdit((state) => state.setUUid);
  const onRemove = useData((state) => state.onRemove);
  const handleEdit = (linkId: string) => {
    const __state = state.find((e) => e.id === linkId);
    if (__state) {
      const find = __state.data;
      if (find) {
        const data: {
          name?: string;
          description?: string;
          image?: string;
          links?: Array<{
            name: string;
            url: string;
            uuid: string;
            iconName: string;
            className: string;
            arweave: Array<string>;
          }>;
        } = JSON.parse(find);
        clear();
        if (data.name && data.name.length > 0) {
          useProfile.setState({ name: data.name });
        }
        if (data.description && data.description.length > 0) {
          useProfile.setState({ description: data.description });
        }
        if (data.image && data.image.length > 0) {
          useProfile.setState({ image: data.image });
          useProfile.setState({ image_type: "url" });
        }
        if (data.links && data.links.length > 0) {
          data.links.forEach((e) => {
            const d = AllLink.find((f) => f.name === e.iconName);
            if (d) {
              setLink({
                name: e.name,
                url: e.url,
                icon: d.icon,
                uuid: e.uuid,
                iconName: e.iconName,
                className: e.className,
                arweave: e.arweave,
              });
            }
          });
        }
        const has = themes.find((e) => e.title === __state.design);
        if (has) {
          setedit(true);
          setUUid(__state.id);
          useArns.setState({ arns: __state.name });
          navigate(`/editor?theme=${has.title}&view=${has.view}`);
        }
      }
    }
  };

  const handleDelete = async (linkId: string) => {
    const msd = await delete_page(linkId);
    if (msd) {
      onRemove(linkId);
      setSelectedLink(state[0]);
    }
    return;
  };

  return (
    <div>
      {state && state.length > 0 ? (
        <div className="min-h-screen sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div>
              <LinkSelector
                selectedLink={selectedLink}
                links={state}
                isDropdownOpen={isDropdownOpen}
                onLinkChange={handleLinkChange}
                onDropdownToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                reload={reload}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <PerformanceChart data={chartData} title={selectedLink.name} />
              </div>
              <div className="lg:col-span-1">
                <QuickStats links={selectedLink} />
              </div>
            </div>

            <div className="space-y-6">
              <LinkViewsTable data={selectedLink.views} />
              <ClickHistoryTable data={get_links(selectedLink)} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="relative flex items-center justify-center min-h-screen bg-yellow-300 -mt-28">
            <div className="absolute inset-0 z-0">
              <AnimatedBackground />
            </div>
            <div
              className="relative z-10 bg-white p-8 border-4 border-black"
              style={{ boxShadow: "8px 8px 0 0 #000, 16px 16px 0 0 #000" }}
            >
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 border-8 border-black flex items-center justify-center">
                  <span className="text-6xl font-bold">?</span>
                </div>
                <p
                  className="mt-8 mb-8 text-3xl font-bold text-black uppercase tracking-widest text-center"
                  style={{ fontFamily: '"Courier New", Courier, monospace' }}
                >
                  No Data Found
                </p>
                <button
                  className="bg-black text-white text-xl font-bold py-3 px-6 uppercase tracking-widest border-4 border-black transition-all duration-200 ease-in-out hover:bg-white hover:text-black"
                  style={{
                    fontFamily: '"Courier New", Courier, monospace',
                    boxShadow: "4px 4px 0 0 #000",
                  }}
                  onClick={() => navigate("/theme")}
                >
                  Create One
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
