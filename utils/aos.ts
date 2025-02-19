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
import { ANT, ArconnectSigner, ARIO } from "@ar.io/sdk";
import useEdit from "../store/useEdit";

export async function register(
  uuid: string,
  name: string,
  design: string,
  upload_id: string,
  _: true | false
) {
  const isEdit = useEdit.getState().isEdit;
  if (name.startsWith("@")) {
    const ario = ARIO.init({})
    const info = await ario.getPrimaryName({ address: useAddress.getState().address! })
    if (info?.name && info.processId) {
      const ant = ANT.init({
        signer: new ArconnectSigner(window.arweaveWallet),
        processId: info.processId
      })
      await ant.setBaseNameRecord({
        transactionId: upload_id,
        ttlSeconds: 3600
      })
    } else {
      return false
    }
  }
  const type = useAddress.getState().type;
  let ether
  if (type === "metamask") {
    ether = new ethers.providers.Web3Provider(window.ethereum!);
  }
  const profile = {
    name: useProfile.getState().name,
    description: useProfile.getState().description,
    image: useProfile.getState().image,
    links: useProfile.getState().links,
  };
  const trans = await message({
    process: PROCESS,
    signer:
      type === "metamask"
        ? (createBrowserEthereumDataItemSigner(ether!) as any)
        : createDataItemSigner(window.arweaveWallet),
    tags: [
      {
        name: "Action",
        value: isEdit ? "update" : "register",
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
      {
        name: "transId",
        value: upload_id,
      },
    ],
    data: JSON.stringify(profile),
  });
  const res = await result({ process: PROCESS, message: trans });
  console.log(res)
  if (res.Messages[0].Data === "Maximum limit reached. Cannot create more links.") {
    throw new Error("Maximum limit reached. Cannot create more links.")
  }
  if (res.Messages[0].Data === "Added" || res.Messages[1].Data === "Updated" || res.Messages[1].Data === "Added" || res.Messages[0].Data === "Updated") {
    return true;
  } else {
    return false;
  }
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
      { name: "Action", value: "get_user_details" },
      { name: "address", value: address },
    ],
  });
  const state: {
    status: 0 | 1;
    data:
    | string
    | Array<{
      data: string, design: string, id: string, name: string, views: Array<{
        browser: string;
        date: string;
        id: string;
        ip: string;
        loadtime: string;
        name: string;
        os: string;
        timezone: string;
        wallet: string;
        clicks: Array<{
          name: string; id: string; date: string
        }>;
      }>
    }>;
  } = JSON.parse(awas.Messages[0].Data);
  if (state.data && Array.isArray(state.data)) {
    const transformedData = state.data.map(item => {
      let viewCounter = 1;
      return {
        ...item,
        views: item.views.map(view => ({
          ...view,
          id: String(viewCounter++),
          originalId: view.id,
          clicks: view.clicks?.map(click => ({
            ...click,
            name: click.name || 'Share'
          })) || []
        }))
      };
    });
    useData.setState({ state: transformedData })
  }
};

export const delete_page = async (id: string) => {
  try {
    const type = useAddress.getState().type;
    const txn = await message({
      process: PROCESS,
      signer:
        type === "metamask"
          ? (createBrowserEthereumDataItemSigner(new ethers.providers.Web3Provider(window.ethereum!)) as any)
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
    const res = msg.Messages[0].Data;
    if (res === "Deleted") {
      return true;
    } else {
      return false;
    }
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
