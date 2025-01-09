import { FaExternalLinkAlt } from "react-icons/fa";
import {
  FaWindows,
  FaApple,
  FaLinux,
  FaAndroid,
  FaChrome as Chrome,
  FaFirefox as Firefox,
  FaSafari as Safari,
  FaEdge as Edge,
  FaGlobe as Globe,
} from "react-icons/fa";
import { ClickHistory, Link } from "./types";

interface ClickHistoryTableProps {
  clickHistory: ClickHistory[];
  links: Link[];
}

export function ClickHistoryTable({
  clickHistory,
  links,
}: ClickHistoryTableProps) {
  return (
    <div className="bg-white border-4 border-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Recent Link Clicks</h2>
      <p className="text-gray-600 mb-4">
        Track when your links were clicked and additional metrics
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left border-b-2 border-gray-800">Link</th>
              <th className="p-2 text-left border-b-2 border-gray-800">
                Clicked At
              </th>
              <th className="p-2 text-left border-b-2 border-gray-800">
                Browser
              </th>
              <th className="p-2 text-left border-b-2 border-gray-800">OS</th>
              <th className="p-2 text-left border-b-2 border-gray-800">
                Timezone
              </th>
              <th className="p-2 text-left border-b-2 border-gray-800">
                Page Load Time
              </th>
              <th className="p-2 text-left border-b-2 border-gray-800">
                Web3 Wallets
              </th>
              <th className="p-2 text-left border-b-2 border-gray-800">
                IP Address
              </th>
            </tr>
          </thead>
          <tbody>
            {clickHistory.map((click) => (
              <tr key={click.id} className="border-b border-gray-300">
                <td className="p-2">
                  <a
                    href={links.find((l) => l.id === click.linkId)?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    {click.linkTitle}
                    <FaExternalLinkAlt className="ml-1 w-4 h-4" />
                  </a>
                </td>
                <td className="p-2">
                  {new Date(click.clickedAt).toLocaleString()}
                </td>
                <td className="p-2">
                  {click.browser === "Chrome" && (
                    <div className="flex flex-row justify-start items-start">
                      <Chrome className="w-5 h-5" />
                      <p className="ml-1">Chrome</p>
                    </div>
                  )}
                  {click.browser === "Firefox" && (
                    <div className="flex flex-row justify-start items-start">
                      <Firefox className="w-5 h-5" />
                      <p className="ml-1">Firefox</p>
                    </div>
                  )}
                  {click.browser === "Safari" && (
                    <div className="flex flex-row justify-start items-start">
                      <Safari className="w-5 h-5" />
                      <p className="ml-1">Safari</p>
                    </div>
                  )}
                  {click.browser === "Edge" && (
                    <div className="flex flex-row justify-start items-start">
                      <Edge className="w-5 h-5" />
                      <p className="ml-1">Edge</p>
                    </div>
                  )}
                  {!["Chrome", "Firefox", "Safari", "Edge"].includes(
                    click.browser
                  ) && (
                    <div className="flex flex-row justify-start items-start">
                      <Globe className="w-5 h-5" />
                      <p className="ml-1">{click.browser}</p>
                    </div>
                  )}
                </td>
                <td className="p-2 ">
                  {click.os === "Windows" && (
                    <div className="flex flex-row items-start justify-start">
                      <FaWindows className="w-5 h-5 mr-2" />{" "}
                      <p className="ml-1">Windows</p>
                    </div>
                  )}
                  {click.os === "macOS" && (
                    <div className="flex flex-row items-start justify-start">
                      <FaApple className="w-5 h-5 mr-2" />{" "}
                      <p className="ml-1">macOS</p>
                    </div>
                  )}
                  {click.os === "Linux" && (
                    <div className="flex flex-row items-start justify-start">
                      <FaLinux className="w-5 h-5 mr-2" />{" "}
                      <p className="ml-1">Linux</p>
                    </div>
                  )}
                  {click.os === "iOS" && (
                    <div className="flex flex-row items-start justify-start">
                      <FaApple className="w-5 h-5 mr-2" />{" "}
                      <p className="ml-1">iOS</p>
                    </div>
                  )}
                  {click.os === "Android" && (
                    <div className="flex flex-row items-start justify-start">
                      <FaAndroid className="w-5 h-5 mr-2" />{" "}
                      <p className="ml-1">Android</p>
                    </div>
                  )}
                </td>
                <td className="p-2">{click.timezone}</td>
                <td className="p-2">{click.pageLoadTime}</td>
                <td className="p-2">
                  {click.web3Wallets.join(", ") || "None"}
                </td>
                <td className="p-2">{click.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
