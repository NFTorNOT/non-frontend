import styles from "./Vote.module.scss";
import React, { useEffect, useRef, useState } from "react";
import PublicationApi, { ReactionType } from "../../graphql/PublicationApi";
import { useUserContext } from "../../context/UserContext";
import useCurrentPublicationId from "../../utils/useCurrentPublicationId";
import { Constants } from "../../utils/Constants";
import { ClipLoader } from "react-spinners";
import { useAuthContext } from "../../context/AuthContext";
import TinderCard from "react-tinder-card";

export default function VoteImage() {
  const ipfs = "0x34...2745";
  const { userProfile } = useUserContext();
  // const provider = useProvider();
  const { getPostId } = useCurrentPublicationId();

  const [nftDetailsModal, setNftDetailsModal] = useState(false);
  const imageDetailsListRef = useRef([]);
  const [apiInProgress, setIsApiInProgress] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [wordOfTheDay, setWordOfTheDay] = useState();
  const [wordFetchInProgress, setWordFetchInProgress] = useState(false);
  const { isUserLoggedIn } = useAuthContext()
  const postIdRef = useRef();

  async function fetchImages() {
    setIsApiInProgress(true);
    try {
      const postId = postIdRef.current;
      console.log("fetching postId", { postId });
      let nextPageCursor = null;
      let imageDetails = [];
      do {
        const apiResponseData = (
          await PublicationApi.fetchCommentsFromPostId({
            postId,
            cursor: nextPageCursor,
            profileId: userProfile.id,
          })
        ).data;

        const publications = apiResponseData.publications;
        const comments = publications.items;
        nextPageCursor = publications.pageInfo.next;
        console.log("comments ", { comments });
        const filteredImageDetails = comments
          .filter((comment) => comment.appId === Constants.LENS_APP_ID)
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
              url: `https://nftornot.infura-ipfs.io/ipfs/${cid}`,
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
    console.log({ arr: imageDetailsListRef.current });
    setIsApiInProgress(false);
    setImageIndex(0);
  }

  async function fetchWordOfTheDay() {
    console.log("fetching word");
    setWordFetchInProgress(true);
    postIdRef.current = await getPostId();
    console.log("post id", { pid: postIdRef.current });
    const response = await PublicationApi.fetchPublication(postIdRef.current);
    console.log({ response });
    const postDescription = response.data?.publication?.metadata?.description;
    setWordOfTheDay(postDescription);
    setWordFetchInProgress(false);
    fetchImages();
  }

  useEffect(() => {
    fetchWordOfTheDay();
  }, []);

  var sectionStyle = {
    // backgroundImage: `url(${imageDetailsListRef.current[imageIndex]?.url})`,
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

  const swiped = (direction) => {
    if (direction === 'right') {
      onHot();
    }
    if (direction === 'left') {
      showNextImage();
    }
  };

  return (
    <>
    <div className={styles.secondTab}>
      <div className={styles.yellow}>Word of the day</div>
      <div className={styles.generatedTitle}>
        {wordFetchInProgress ? (
            <ClipLoader color={"#fff"} loading={true} size={15} />
          ) : (
            <div className={styles.wordOfDay}>"{wordOfTheDay}"</div>
          )}
      </div>  
  </div>  
    <div className="relative md:flex justify-center">
      <div className={`${styles.cardContainer} flex justify-center mb-[15px] order-2`}>
          {imageDetailsListRef.current.length > 0 && imageDetailsListRef.current.map((character) => (
          <TinderCard
            onSwipe={(dir) => swiped(dir)}
            className={`absolute pressable`}
            preventSwipe={["up", "down"]}
          >
            <div className={`${styles.card}`}
              style={{ backgroundImage: `url(${character.url})` }}
            >
 
              <div className={styles.card_title_overlay}>
                <div className={styles.card_title}>
                  <div className={styles.card_title_text}>
                    {character.title}
                  </div>
                </div>
                <div className={styles.nftInfo}>
                  <div className={styles.id}>
                    {character.handle}
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
          </TinderCard>
        ))}
      </div>
      <button
        className={`absolute left-[20px] md:relative md:left-0`}
        onClick={showNextImage}>
        <img src={"/not.png"} />
      </button>

      <button
        className={`absolute right-[20px] md:relative md:right-0 order-last`}
        onClick={onHot}>
        <div className="relative">
          <img
            alt="right"
            src={"/hot.png"}
          />
        </div>
      </button>
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
