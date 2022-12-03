import { ethers } from "ethers";
import moment from "moment";
import { useContract } from "wagmi";
import NFTOfTheDayAbis from "../abis/NFTOfTheDayAbi.json";
import { Constants } from "./Constants";

export default function useCurrentPublicationId() {
    const provider = new ethers.providers.InfuraProvider('maticmum');
    const contract = useContract({
      abi: NFTOfTheDayAbis,
      address: Constants.NFT_OF_THE_DAY_CONTRACT_ADDRESS,
      signerOrProvider: provider,
    });

  async function getPostId() {
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    const startOfHourTimestamp = moment(
      currentTimestampInSeconds * 1000
    ).startOf("hour");

    console.log(
      "startOfHourTimestamp -----------",
      startOfHourTimestamp,
      Math.floor(startOfHourTimestamp.valueOf() / 1000)
    );
    let publicationId = "0x5671-0x0b";
    try {
      publicationId = await contract.getPublicationIdForTimestamp(
        Math.floor(startOfHourTimestamp.valueOf() / 1000)
      );
    } catch (error) {
      console.error("Error while getting publication Id");
    }

    return publicationId;
  }

  return {
    getPostId
  }
}
