import Bowser from "bowser";
import ShareButton from "./share";
import { uuidv7 } from "uuidv7";
import { self, url } from "./constant";

declare global {
  interface Window {
    Arweave: any;
    solana: any;
    ethereum: any;
  }
}
var id: string;
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
  const response = await fetch(`${url}/register_view`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageId: id,
      id: _id,
      loadtime: loadTime.toString(),
      date: currentDate.toString(),
      browser: agent.getBrowserName(),
      os: agent.getOSName(),
      timezone: timeZone,
      name,
      wallet: wallet.join(","),
      ip,
    }),
  });
  console.log(await response.json());
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
        const response = await fetch(`${url}/register_click`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            viewId: id,
            id: id_click,
            name,
            date: Date.now().toString(),
          }),
        });
        console.log(await response.json());
      }
    }
  });
});
