import { WebIrys } from "@irys/sdk";
import useAddress from "../store/useAddress";
import { ethers } from "ethers";
export default async function turbo(data: string | Buffer, type: string) {
  const ether = new ethers.providers.Web3Provider(window.ethereum!);
  const wallet = { rpcUrl: "", name: "ethersv5", provider: ether };
  const _type = useAddress.getState().type;
  const irys = new WebIrys({
    url: "https://turbo.ardrive.io",
    token: _type === "metamask" ? "ethereum" : "arweave",
    wallet: _type === "metamask" ? wallet : { provider: window.arweaveWallet },
  });
  await irys.ready();
  const upload = await irys.upload(data, {
    tags: [{ name: "Content-Type", value: type }],
  });
  return upload.id;
}
