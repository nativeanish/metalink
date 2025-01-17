import Bowser from "bowser";
import ShareButton from "./share";
import { uuidv7 } from "uuidv7";
import { createDataItemSigner, message } from "@permaweb/aoconnect";
const PROCESS = "nMM8c6RbcZ-ZXwhM2jVPOfDpT2cGTu-JHT7fFx05_iQ";
export const self = "https://metapaths.ar.io";
declare global {
  interface Window {
    Arweave: any;
    solana: any;
    ethereum: any;
  }
}
var id: string;
const key = "";
const signer = createDataItemSigner(JSON.parse(key));
window.addEventListener("load", async () => {
  // Page Load Time
  const navigationEntry = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;
  const loadTime =
    navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime;
  console.log(`Page Load Time: ${loadTime}ms`);

  // Current Date
  const currentDate = Date.now();

  const agent = Bowser.getParser(window.navigator.userAgent);

  // Timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Wallet
  const wallet = [];
  if (window.Arweave) {
    wallet.push("arweave");
  }
  if (window.solana) {
    wallet.push("solana");
  }
  if (window.ethereum) {
    wallet.push("ethereum");
  }
  console.log(`Wallet: ${wallet}`);
  //ip address
  const re = await fetch("https://api.ipify.org?format=json");
  const ip = (await re.json()).ip || "";
  // Page Id
  const _id =
    document.querySelector('meta[name="uuid"]')?.getAttribute("content") || "";
  id = uuidv7();
  // Name
  const name =
    document.querySelector('meta[name="arns_name"]')?.getAttribute("content") ||
    "";
  await message({
    signer,
    process: PROCESS,
    tags: [
      {
        name: "Action",
        value: "register_view",
      },
      {
        name: "id",
        value: _id,
      },
      {
        name: "pageid",
        value: id,
      },
      {
        name: "date",
        value: currentDate.toString(),
      },
      {
        name: "browser",
        value: agent.getBrowserName(),
      },
      {
        name: "os",
        value: agent.getOSName(),
      },
      {
        name: "ip",
        value: ip,
      },
      {
        name: "timezone",
        value: timeZone,
      },
      {
        name: "loadtime",
        value: loadTime,
      },
      {
        name: "wallet",
        value: wallet ? wallet.join(",") : "",
      },
      {
        name: "name",
        value: name,
      },
    ],
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const shareButton = new ShareButton(); // Create a single instance

  document.addEventListener("click", async (event: MouseEvent) => {
    if (event.target) {
      if ((event.target as HTMLButtonElement).tagName === "BUTTON") {
        if ((event.target as HTMLElement).id === "create") {
          window.open(self, "_blank");
        }
        if ((event.target as HTMLElement).id === "share") {
          // Use the existing instance to handle the share functionality
          shareButton;
        }
      }
      if ((event.target as HTMLElement).closest("a")) {
        const anchor = (event.target as HTMLElement).closest(
          "a"
        ) as HTMLElement;
        console.log(anchor);
        const id_click = anchor.getAttribute("id") || "";
        const name = anchor.getAttribute("data-name") || "";
        await message({
          process: PROCESS,
          signer,
          tags: [
            { name: "Action", value: "register_click" },

            {
              name: "id",
              value: id_click,
            },
            {
              name: "viewid",
              value: id,
            },
            {
              name: "date",
              value: Date.now().toString(),
            },
            {
              name: "name",
              value: name,
            },
          ],
        });
      }
    }
  });
});
