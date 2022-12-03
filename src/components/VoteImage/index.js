import styles from "./Main.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { useContract, useProvider, useSigner } from "wagmi";
import PublicationApi, { ReactionType } from "../../graphql/PublicationApi";
import { Constants } from "../../utils/Constants";
import { useUserContext } from "../../context/UserContext";
import NFTOfTheDayAbis from '../../abis/NFTOfTheDayAbi.json'
import moment from 'moment'
import { ethers } from "ethers";

export default function VoteImage() {
  const wordOfTheDay = "Light";
  const ipfs = "0x34...2745";
  const { userProfile } = useUserContext();
  // const provider = useProvider();
  const provider = new ethers.providers.InfuraProvider('maticmum');
  const contract = useContract({
    abi: NFTOfTheDayAbis,
    address: Constants.NFT_OF_THE_DAY_CONTRACT_ADDRESS,
    signerOrProvider: provider,
  });

  const [nftDetailsModal, setNftDetailsModal] = useState(false);
  const imageDetailsListRef = useRef([]);
  const [apiInProgress, setIsApiInProgress] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  async function getPostId() {
    const currentTimestampInSeconds = Math.floor(Date.now()/1000);
    const startOfHourTimestamp = moment(currentTimestampInSeconds * 1000).startOf('hour');

    console.log('startOfHourTimestamp -----------', startOfHourTimestamp, Math.floor(startOfHourTimestamp.valueOf()/1000));
    let publicationId = '0x5671-0x0b';
    try{
      publicationId = await contract.getPublicationIdForTimestamp(Math.floor(startOfHourTimestamp.valueOf()/1000))
    }
    catch(error){
      console.error('Error while getting publication Id');
    }
    
    return publicationId;
  }

  async function fetchImages() {
    setIsApiInProgress(true);
    try {
      const postId = await getPostId();
      let nextPageCursor = null;
      let imageDetails = [];
      do {
        const apiResponseData = (
          await PublicationApi.fetchCommentsFromPostId({
            postId,
            cursor: nextPageCursor,
            profileId: userProfile.id
          })
        ).data;
        const publications = apiResponseData.publications;
        const comments = publications.items;
        nextPageCursor = publications.pageInfo.next;
        const filteredImageDetails = comments
          // .filter((comment) => comment.appId === Constants.LENS_APP_ID)
          .filter((comment) => {
            return comment.reaction == null;
          })
          .map((comment) => {
            const publicationId = comment?.id;
            const handle = comment.profile?.handle;
            const cid = comment.metadata?.image?.split("ipfs://")?.[1];
            const txHash = comment.metadata?.attributes?.map(
              (attribute) => attribute.traitType === "NFTtxHash"
            )?.[0].value;
            return {
              publicationId,
              url: `https://${cid}.ipfs.dweb.link`,
              title: "",
              txHash: txHash,
              handle,
            };
          });
        imageDetails = [...imageDetails, ...filteredImageDetails];
      } while (nextPageCursor);
      imageDetailsListRef.current = imageDetails;
    } catch (error) {
      console.log({ error });
    }
    setIsApiInProgress(false);
    setImageIndex(0);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  var sectionStyle = {
    backgroundImage: `url(${imageDetailsListRef.current[imageIndex]?.url})`,
  };

  function showNextImage() {
    if (imageIndex === imageDetailsListRef.current - 1) {
      return;
    }
    setImageIndex((imageIndex) => imageIndex + 1);
  }

  async function onHot() {
    console.log({pubId: imageDetailsListRef.current[imageIndex]?.publicationId})
    PublicationApi.addReaction({
      profileId: userProfile?.id,
      reactionType: ReactionType.UPVOTE,
      publicationId: imageDetailsListRef.current[imageIndex]?.publicationId,
    });
    showNextImage();
  }

  return (
    <>
      <div className={styles.wrapper}>
        <img
          alt="wrong"
          onClick={showNextImage}
          src={"/not.png"}
          className={styles.bb}
        />
        <div className={styles.secondTab}>
          <div className={styles.yellow}>Word of the day</div>
          <center>
            <div className={styles.wordOfDay}>"{wordOfTheDay}"</div>
          </center>

          <div
            style={{
              display: "grid",
            }}
          >
            <div className={styles.generatedImagePrompts} style={sectionStyle}>
              <div className={styles.end}>
                <div className={styles.promt}>
                  {imageDetailsListRef.current[imageIndex]?.title}
                </div>
                <div className={styles.nftInfo}>
                  <div className={styles.id}>
                    {imageDetailsListRef.current[imageIndex]?.handle}
                  </div>
                  <button
                    className={styles.nftButton}
                    onClick={() => setNftDetailsModal(true)}
                  >
                    NFT contract info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img
          alt="right"
          onClick={onHot}
          src={"/hot.png"}
          className={styles.bb}
        />
      </div>
      {nftDetailsModal && (
        <div className={styles.popup} onClick={() => setNftDetailsModal(false)}>
          <div className={styles.nftContractInfo}>
            <div className={styles.nfttext}>NFT contract information</div>

            <div className={styles.polygon}>
              <img
                src="https://static.nftornot.com/Ipfs-logo-1024-ice-text+1.png"
                alt="ipfs"
              ></img>
              <span>IPFS metadata: </span>
              <span>{ipfs}</span>
            </div>
            <div className={styles.polygon}>
              <img
                src="https://static.nftornot.com/polygon-matic-logo+2.png"
                alt="polygon"
              ></img>
              <span>Polygon transaction:</span>
              <span>{imageDetailsListRef.current.txHash}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
