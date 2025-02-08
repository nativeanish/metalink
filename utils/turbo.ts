// import { WebIrys } from "@irys/sdk";
import useAddress from "../store/useAddress";
import { ethers } from "ethers";
import { TurboFactory, ArconnectSigner, } from "@ardrive/turbo-sdk/web";

// export default async function turbo(data: string | Buffer, type: string) {
//   let ether;
//   let wallet;
//   const _type = useAddress.getState().type;
//   if (_type === "metamask") {
//     ether = new ethers.providers.Web3Provider(window.ethereum!);
//     wallet = { rpcUrl: "", name: "ethersv5", provider: ether };
//   }
//   const irys = new WebIrys({
//     url: "https://turbo.ardrive.io",
//     token: _type === "metamask" ? "ethereum" : "arweave",
//     wallet: _type === "metamask" ? wallet : { provider: window.arweaveWallet },
//   });
//   await irys.ready();
//   const upload = await irys.upload(data, {
//     tags: [{ name: "Content-Type", value: type }],
//   });
//   return upload.id;
// }

export default async function turbo(data: string | Buffer, type: string) {
  let turbo;
  const _type = useAddress.getState().type;
  if (_type === "arconnect") {
    const signer = new ArconnectSigner(window.arweaveWallet)
    turbo = TurboFactory.authenticated({
      signer: signer,
      token: "arweave"
    })
  }
  if (_type === "metamask" && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ethSigner = provider.getSigner();
    const wrappedSigner = ethSigner as unknown as import('@ardrive/turbo-sdk').EthereumWalletSigner;
    turbo = TurboFactory.authenticated({
      token: "ethereum",
      walletAdapter: {
        getSigner: () => wrappedSigner
      }
    });

  }
  if (turbo) {
    const buf = typeof data === "string" ? Buffer.from(data) : data
    const uploadResult = await turbo.uploadFile({
      fileStreamFactory: () => buf,
      fileSizeFactory: () => buf.byteLength,
      signal: AbortSignal.timeout(10_000),
      dataItemOpts: {
        tags: [
          {
            name: "Content-Type",
            value: type,
          },
        ],
      },
    })
    return uploadResult.id
  }
  throw new Error("Error in Uploading")
}