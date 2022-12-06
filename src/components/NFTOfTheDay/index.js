import { useContract, useSigner } from "wagmi";
import { Constants } from "../../utils/Constants";
import NFTOfTheDayAbis from "../../abis/NFTOfTheDayAbi.json";
import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import moment from "moment";

export default function NFTOfTheDay() {
  const { data: signer } = useSigner();
  const contract = useContract({
    abi: NFTOfTheDayAbis,
    address: Constants.NFT_OF_THE_DAY_CONTRACT_ADDRESS,
    signerOrProvider: signer,
  });

  const [loading, setLoading] = useState(false);
  const [nftOfTheDayLink, setNftOfTheDayLink] = useState();

  async function fetchLink() {
    setLoading(true);
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    const startOfHourTimestamp = moment(
      currentTimestampInSeconds * 1000
    ).startOf("hour");

    console.log("startOfHourTimestamp -----------", startOfHourTimestamp);
    const lastEpochTimestamp = Math.floor(
      startOfHourTimestamp.valueOf() / 1000 - 60 * 60
    );
    let link = "https://testnet.lenster.xyz/u/nftornot.test";
    try {
      const publicationId = await contract.getPublicationIdForTimestamp(
        lastEpochTimestamp
      );
      link = `https://testnet.lenster.xyz/posts/${publicationId}`;
    } catch (error) {
      console.error("Error while getting publication Id");
    }
    setNftOfTheDayLink(link);
    setLoading(false);
  }

  useEffect(() => {
    fetchLink();
  }, []);
  return (
    <div>
      {loading ? (
        <CircleLoader />
      ) : (
        <a href={nftOfTheDayLink} className="text-white font-bold">
          Go to NFT of the day Post.{" "}
        </a>
      )}
    </div>
  );
}
