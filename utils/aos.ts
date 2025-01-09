import {
  createDataItemSigner,
  dryrun,
  message,
  result,
} from "@permaweb/aoconnect";
import { PROCESS } from "../constants";
import useProfile from "../store/useProfile";
import useData from "../store/useData";

export async function register(uuid: string, name: string, design: string) {
  const profile = {
    name: useProfile.getState().name,
    description: useProfile.getState().description,
    image: useProfile.getState().image,
    links: useProfile.getState().links,
  };
  const trans = await message({
    process: PROCESS,
    signer: createDataItemSigner(window.arweaveWallet),
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
    const txn = await message({
      process: PROCESS,
      signer: createDataItemSigner(window.arweaveWallet),
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
  return false;
};
