import { Web3Storage } from "web3.storage";

class IPFSHelper {
  constructor() {
    this.storage = new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY,
    });
  }

  async uploadFilesToIFPS(files) {
    const cid = await this.storage.put(files);
    return cid;
  }

  async uploadDataToIPFS(data) {
    const cid = await this.storage.put(
      [
        new File([JSON.stringify(data)], "metadata.json", {
          type: "application/json",
        }),
      ],
      { wrapWithDirectory: false }
    );

    console.log({ cid });
    return cid;
  }
}

export default new IPFSHelper();
