import {
  createDataItemSigner,
  dryrun,
  message,
  result,
} from "@permaweb/aoconnect";
import { PROCESS } from "../constants";
import useProfile from "../store/useProfile";
import useData from "../store/useData";
import useAddress from "../store/useAddress";
import { ethers } from "ethers";
import { createData, InjectedEthereumSigner } from "arbundles/web";

export async function register(uuid: string, name: string, design: string) {
  const ether = new ethers.providers.Web3Provider(window.ethereum!);
  const profile = {
    name: useProfile.getState().name,
    description: useProfile.getState().description,
    image: useProfile.getState().image,
    links: useProfile.getState().links,
  };
  const type = useAddress.getState().type;
  const trans = await message({
    process: PROCESS,
    signer:
      type === "metamask"
        ? (createBrowserEthereumDataItemSigner(ether) as any)
        : createDataItemSigner(window.arweaveWallet),
    tags: [
      {
        name: "Action",
        value: "register",
      },
      {
        name: "id",
        value: uuid,
      },
      {
        name: "name",
        value: name,
      },
      {
        name: "design",
        value: design,
      },
    ],
    data: JSON.stringify(profile),
  });
  const res = await result({ process: PROCESS, message: trans });
  console.log(res);
}

export async function check_name(handle: string) {
  const _trans = await dryrun({
    process: PROCESS,
    tags: [
      {
        name: "Action",
        value: "check",
      },
      {
        name: "name",
        value: handle,
      },
    ],
  });
  const che: { data: string; status: 1 | 0 } = JSON.parse(
    _trans.Messages[0].Data
  );
  if (che.status === 1 && che.data === "present") {
    return false;
  }
  return true;
}

export const get_state = async (address: string) => {
  useData.getState().clear();
  const awas = await dryrun({
    process: PROCESS,
    tags: [
      { name: "Action", value: "get_State" },
      { name: "id", value: address },
    ],
  });
  const state: {
    status: 0 | 1;
    data:
      | string
      | Array<{ data: string; design: string; id: string; name: string }>;
  } = JSON.parse(awas.Messages[0].Data);
  if (state.status && typeof state.data !== "string") {
    for (let i = 0; i < state.data.length; i++) {
      const element = state.data[i];
      useData.getState().setState({
        data: element.data,
        design: element.design,
        id: element.id,
        name: element.name,
        views: [],
      });
      const res = await dryrun({
        process: PROCESS,
        tags: [
          { name: "Action", value: "get_view" },
          { name: "id", value: element.id },
        ],
      });
      const data: {
        status: 0 | 1;
        data:
          | Array<{
              browser: string;
              date: string;
              id: string;
              ip: string;
              loadtime: string;
              name: string;
              os: string;
              timezone: string;
              wallet: string;
            }>
          | string;
      } = JSON.parse(res.Messages[0].Data);
      if (data.status && typeof data.data !== "string") {
        for (let j = 0; j < data.data.length; j++) {
          const viewElement = data.data[j];
          useData.getState().setView(element.id, {
            browser: viewElement.browser,
            date: viewElement.date,
            id: JSON.stringify(j + 1),
            originalId: viewElement.id,
            ip: viewElement.ip,
            loadtime: viewElement.loadtime,
            name: viewElement.name,
            os: viewElement.os,
            timezone: viewElement.timezone,
            wallet: viewElement.wallet,
            clicks: [],
          });
          const res = await dryrun({
            process: PROCESS,
            tags: [
              {
                name: "Action",
                value: "get_click",
              },
              {
                name: "id",
                value: viewElement.id,
              },
            ],
          });
          const click: {
            status: 0 | 1;
            data: string | Array<{ name: string; id: string; date: string }>;
          } = JSON.parse(res.Messages[0].Data);
          if (click.status === 1 && typeof click.data !== "string") {
            for (const clickElement of click.data) {
              useData.getState().setClick(element.id, JSON.stringify(j + 1), {
                name: clickElement.name,
                id: clickElement.id,
                date: clickElement.date,
              });
            }
          }
        }
      }
    }
  }
};

export const delete_page = async (id: string) => {
  try {
    const ether = new ethers.providers.Web3Provider(window.ethereum!);
    const type = useAddress.getState().type;

    const txn = await message({
      process: PROCESS,
      signer:
        type === "metamask"
          ? (createBrowserEthereumDataItemSigner(ether) as any)
          : createDataItemSigner(window.arweaveWallet),
      tags: [
        {
          name: "Action",
          value: "delete",
        },
        {
          name: "id",
          value: id,
        },
      ],
    });
    const msg = await result({
      process: PROCESS,
      message: txn,
    });
    console.log(msg);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export function createBrowserEthereumDataItemSigner(
  ethersProvider: ethers.providers.Web3Provider
) {
  /**
   * createDataItem can be passed here for the purposes of unit testing
   * with a stub
   */
  const signer = async ({ data, tags, target, anchor }: any) => {
    const ethersSigner = ethersProvider.getSigner();

    const provider = {
      getSigner: () => ({
        signMessage: async (message: string) => {
          return await ethersSigner.signMessage(message);
        },
      }),
    };

    const ethSigner = new InjectedEthereumSigner(provider as any);
    await ethSigner.setPublicKey();

    const dataItem = createData(data, ethSigner, { tags, target, anchor });

    console.log(dataItem);

    const res = await dataItem
      .sign(ethSigner)
      .then(async () => ({
        id: await dataItem.id,
        raw: await dataItem.getRaw(),
      }))
      .catch((e) => {
        console.error(e);
        return null; // Handle errors gracefully
      });

    console.dir(
      {
        valid: await InjectedEthereumSigner.verify(
          ethSigner.publicKey,
          await dataItem.getSignatureData(),
          dataItem.rawSignature
        ),
        signature: dataItem.signature,
        owner: dataItem.owner,
        tags: dataItem.tags,
        id: dataItem.id,
        res,
      },
      { depth: 2 }
    );

    return res;
  };

  return signer;
}
