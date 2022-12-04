import styles from "./Main.module.scss";
import React, { useEffect, useRef, useState } from "react";
import PublicationApi, { ReactionType } from "../../graphql/PublicationApi";
import { useUserContext } from "../../context/UserContext";
import useCurrentPublicationId from "../../utils/useCurrentPublicationId";
import { Constants } from "../../utils/Constants";

export default function VoteImage() {
  const wordOfTheDay = "Light";
  const ipfs = "0x34...2745";
  const { userProfile } = useUserContext();
  // const provider = useProvider();
  const {getPostId} = useCurrentPublicationId()

  const [nftDetailsModal, setNftDetailsModal] = useState(false);
  const imageDetailsListRef = useRef([]);
  const [apiInProgress, setIsApiInProgress] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

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
