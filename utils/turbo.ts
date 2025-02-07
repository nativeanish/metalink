import { WebIrys } from "@irys/sdk";
import useAddress from "../store/useAddress";
import { ethers } from "ethers";
import { TurboFactory, ArconnectSigner } from "@ardrive/turbo-sdk/web";
import { InjectedEthereumSigner } from "arbundles/web";

export default async function turbo(data: string | Buffer, type: string) {
  let ether;
  let wallet;
  const _type = useAddress.getState().type;
  if (_type === "metamask") {
    ether = new ethers.providers.Web3Provider(window.ethereum!);
    wallet = { rpcUrl: "", name: "ethersv5", provider: ether };
  }
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

// export async function run(data: string | Buffer, type: string) {
//   let signer;
//   const _type = useAddress.getState().type;
//   if (_type === "metamask") {
//     const ether = new ethers.providers.Web3Provider(window.ethereum!);
//     signer = new InjectedEthereumSigner(ether)
//   }
//   if (_type === "arconnect") {
//     await window.arweaveWallet.connect([
//       "ACCESS_ADDRESS",
//       "SIGN_TRANSACTION",
//       "ACCESS_PUBLIC_KEY",
//       "SIGNATURE",
//     ])
//     signer = new ArconnectSigner(window.arweaveWallet)
//   }
//   const turbo = TurboFactory.authenticated({
//     signer: signer
//   })
//   const manifestString = JSON.stringify(data)
//   const encoder = new TextEncoder()
//   const manifestUint8Array = encoder.encode(manifestString)
//   const uploadResult = await turbo.uploadFile({
//     fileStreamFactory: () => Buffer.from(manifestUint8Array),
//     fileSizeFactory: () => manifestUint8Array.byteLength,
//     signal: AbortSignal.timeout(10_000),
//     dataItemOpts: {
//       tags: [
//         {
//           name: "Content-Type",
//           value: type,
//         },
//       ],
//     },
//   })
// }