import Bowser from "bowser";
import ShareButton from "./share";
import { uuidv7 } from "uuidv7";
import { message } from "@permaweb/aoconnect";
import { ArweaveSigner, createData } from "warp-arbundles";
const PROCESS = "nMM8c6RbcZ-ZXwhM2jVPOfDpT2cGTu-JHT7fFx05_iQ";
export const self = "https://metalinks.ar.io";
declare global {
  interface Window {
    Arweave: any;
    solana: any;
    ethereum: any;
  }
}
var id: string;
const key = `{"kty":"RSA","n":"0nMraZeMPqyEAcWsqFNCTr6ga_QxZRdYKROuamIkjEzpNHjR5KwaKRd5KAU3cnWfHcWhQCqUnv74y98ZBeYOE3vDz4qA8c9jVuRPcABCAAeg78-DFus0pcPpYmw2jQ2898CT88NO2DjgWCP-kjIKFuFD3WLNxykcynj5cW0CGeBv-Y4Tf1bEq7uJFpwUE1aq13oMJ8CBs8LwxwiB8Z5-XkJMjl9l_m1bv7H-3r_L90mup-vf_6QkpYoIFEK33DHbdBgxNiRkzCs_O6tQ65J_pth2MoO8W4nFyrqe-QxoZGmwvgw7HkRrRqDJxvtL0KP0u2vtrpWISKnkAEmQHjJBA-kiS74wLAtaBi8hW-wV99EJOSPXA4T_wj2SZENwPZ5Mdhx6wd_MYS8m-cpsNNQ7Ue4po0f_jOOWrwpsSK_XZI366i7zJDj66yDOfRelNCBcHnbSXKTX1BrnvXErk4C_6MpZpDdGiZRDcNiFvUaeZp352Wputy0EdXkCUgcNiMqwdgLAeN40NL4t29JzQCVyvlYxOEHFj6_Ku_DORpUlVpqyu7V1-uKh7cK83074iQISytWtsEkwpEvvtJCtp6ieC9LBZh426uPSDnj-QVXkZwpns6sKgGtMZLOnNPd-5yMZCrGjKd6RHARJj9yLltNncdyazW6dV3GVYhnyRl7vsns","e":"AQAB","d":"YhpC_f2h6GN2Q_c4ldz-F4Qgd0KFtijMNZXRpBDtFaQSwB2kRpN9vHMPTPsljktLac8DbMyMrJOSOkNdQFUucaGrtXdMxaxWFB7o8v6DxczIlpHm-4uYZr-tb26ffWCOmvWgYq1Ed2IIHr5kwRTnhCPthWm2IGXHYJFFQr08kgCAYlZ7O0yg8KdC8BHBAATSLhFcUjmYnMo-gKG0JYSrRthkJKhO_OxQrUtV0tOYysWD0A6SRHLpjGuMeZliaRiqwvM2GZWckVqFpxSk67PGouncK48igo92bxtQ2SsSDOEB_Y3pDyJ42ZtBhGsHvBJ6FtZonY5iUfE0cnfYYWMuz8H0v2MjbDAyGZVAfnjMXseRlpbn0Ez7SR1YAKdhLSFqi-IL6N07bgk8U8G-_Mw-jAO2hHuMWsoOF7m_OPOpfBu-Fi1-nXzhZ0Zq19M3VMmozJUlma0oraNkdJcyef_7KSkBpTRYvT9eyzE9FsFSKYLcadAWg5ywKKOhKxFB8dN5Wo-3wFiADWcVlpU_eLOhMhGBXqHk2awRiiHJvI4gCXS5bJj-s_YVjNX6Bat3te84MfYglOfIHAGGlhRDcaMyCUBcO6xYDn_Zw34ECYoXTeh-DiA0Ws2cDbhV0OoOQWU-lBSOLivPZGW4A9yUegSyL01msQ7nw082aBh6_dlUXlE","p":"63BBg4Su9f8l7CspXPDlMEH7eKz74Mni3z5vbAlXkwHmL4D6pJMqlWLutKwP_RhPuQ2XE0U2BQw6ps1CzdZ61QhcrkAObB7QeH0c9Hel6co-mwRpr7TwpsPeGQfZzhUkiRVyBfej_WtKj_haXbghljU4ZM2-YZ7Zs2-W08Gc5QSOQUMTZ6MXhbGBMJDUnmVIGVicf1CCwgUr_kjX0TXWdu00VheuYykIBb36dde9dIEj_uv73KP_SVEOS0mZoOYvoGw1HR9c4roDCL2Ep8k-J-jNsvYv1uUE_yoiEdzsSLcGqXsLKo2k5rRDrdYriAYL3-en_uHspr64Lqih7hW4UQ","q":"5NQ9AH8OsbYMLhzZvvBitTiqV-Fl8VB2238sjuL3Zs-5PptkO-MfoG2_EsLd7SSOgjJ3L_co25vmB65VwO8jPOcw0vNwvVIe5ANPN_QrAwBQrFY-hKVfZTCwatz2ZDhq-CCAZAwEyiXcc2UI3Ad3erYUood_DN5PKdC79ZfwsfSbK49abNbKg16uOnJUxrNRJve0MCIjaFzwAPf8pBi7RawRqDN3juHW8JGk4xJLjBwdOyobBTmZw4MuLjeKB6MbzGQqWamAwcenBQPeDPfiy6lj3rGQ0EbqwatZD2luSBez-Oukh3aJNdatsdeF7FvQPDEbtg4QI2APmhbDVnmXCw","dp":"o_WhKj4Uuivd9QJ548e_VEQfJIMTRhBSdrW8UriOzEneS-a-pi320eH76saIu_FaU70rILhqTkmd7tuzUjWzhPg10wO5B4LOG5rFt1o7qPy3bK0-DKctkHWHDldxTxtaPj05Ev7KrYkye-CwzeOVQE3_3_OISeOeKF_l4cJLyRHLH5few6XIk8px9ahm6YgPFden5OHkrcl8QbHo2kFsAZZfhDUptNS2SYlsCvUbcy8cKkOdOqLa_ev80GGJI4wqTsYMlyNoRFzWEBgrcc2sA48U8TSRTE5hlHF7GIWJ53nOoeiWdiP-Wsve9gjYd_n9-wgQ7mfXrqfTDGtTmcJ2gQ","dq":"yC4zP1_nhudvOFfc1QCOGWL9AewYtkZh9BsI6-b572MA9xgRU6KZZEsdwFfgtTgpwxRK2BcsExIK5eVI94M8HGdTevekRLq2c1nBz302s2VvLZQ1FO1myqsRairrETmZun8UUnGBLyZ3-CsG2RVfHGZ1HsnSB3vjXP1RsMO-uK73n9_EhzpP5yTI3jBuoXT1JVXEt-blesLy4qYOya8pBQZGXBLKIKDI26NNz6eNl4BwwfVPtf5x2WvE1oGXqp6yDtgBhHaYQO1b2zNK6aVhLjF9QK-ts8aWT96KBsWAyGiT9MqQIEE-P28SfGXCrsaTIFUFnPoofAnpHC-VquyriQ","qi":"cMQkqm7A7v9UmZ3zC6H0VGdxaqCM0tnls75qp711XLEIYE8ZbX4MM7OVzlLWdTKSdKIgO4L3fYkKoJ3LNkhVJ52RNzSFjhHMgvXJZDqjqrPCTlwMxItwl-Y6PEw2XYx59_3RSyP28Tmle13EQ_0iUIdR4Xnlx7h3Dm4yc1kDO0dudJ9A1-Rex0W4yOqOOhGDnGnrFLOM9E2Hsn0RknSM73VWqBezSVXkCqVMHsiZL96O0ViGIOAAaqkoys2r9jpU55upKv6WA7XJ1lcWb371QUDi9KpsMa-Pzm3mLjOfR1snL4qGs_aKvbs-wyfbIO6_tFkNIbRnLuN4cpWYgdQF3w"}`;
const signer = createDataItemSignerFromJWK(key);
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
        value: loadTime.toString(),
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

function createDataItemSignerFromJWK(jwk: string) {
  const signer = async ({
    data,
    tags,
    target,
    anchor,
  }: Record<string, any>) => {
    const signer = new ArweaveSigner(JSON.parse(jwk));
    const dataItem = createData(data, signer, { tags, target, anchor });
    return dataItem.sign(signer).then(async () => ({
      id: await dataItem.id,
      raw: await dataItem.getRaw(),
    }));
  };

  return signer;
}
