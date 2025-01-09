import { WebIrys } from "@irys/sdk";
export default async function turbo(data: string | Buffer, type: string) {
  const irys = new WebIrys({
    url: "https://turbo.ardrive.io",
    token: "arweave",
    wallet: { provider: window.arweaveWallet },
  });
  await irys.ready();
  const upload = await irys.upload(data, {
    tags: [{ name: "Content-Type", value: type }],
  });
  return upload.id;
}
