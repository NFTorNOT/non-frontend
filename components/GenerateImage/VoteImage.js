import styles from "./Vote.module.scss";
import React, { useEffect, useRef, useState, useMemo } from "react";
import PublicationApi, { ReactionType } from "../../graphql/PublicationApi";
import { useUserContext } from "../../context/UserContext";
import useCurrentPublicationId from "../../utils/useCurrentPublicationId";
import { Constants } from "../../utils/Constants";
import { ClipLoader } from "react-spinners";
import { useAuthContext } from "../../context/AuthContext";
import TinderCard from "react-tinder-card";
import NFTContractInfoModal from "./NFTContractInfoModal/NFTContractInfoModal";
import Not from "./svg/not";
import Hot from "./svg/hot";

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
  const { isUserLoggedIn } = useAuthContext();
  const postIdRef = useRef();
  const childRefs = useRef();

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
            const txHash = comment.metadata?.attributes?.filter(
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
    setImageIndex(imageDetailsListRef.current.length - 1);
    childRefs.current = Array(imageDetailsListRef.current.length)
      .fill(0)
      .map((i) => React.createRef());
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
    if (!isUserLoggedIn) {
      alert("Please sign in to vote");
      return;
    }

    if (imageIndex === imageDetailsListRef.current - 1) {
      return;
    }
    setImageIndex((imageIndex) => imageIndex - 1);
  }

  async function onHot() {
    if (!isUserLoggedIn) {
      alert("Please sign in to vote");
      return;
    }
    PublicationApi.addReaction({
      profileId: userProfile?.id,
      reactionType: ReactionType.UPVOTE,
      publicationId: imageDetailsListRef.current[imageIndex]?.publicationId,
    });
    showNextImage();
  }

  const swiped = (direction) => {
    if (direction === "right") {
      onHot();
    }
    if (direction === "left") {
      showNextImage();
    }
  };

  const canSwipe = imageIndex >= 0;

  const swipe = async (dir) => {
    if (canSwipe && imageIndex < imageDetailsListRef.current.length) {
      await childRefs.current[imageIndex].swipe(dir); // Swipe the card!
    }
  };

  return (
    <>
      <div className={`${styles.secondTab} mt-[40px] md:mt-0`}>
        <div className={styles.yellow}>Word of the day</div>
        <div className={styles.generatedTitle}>
          {wordFetchInProgress ? (
            <ClipLoader color={"#fff"} loading={true} size={15} />
          ) : (
            <div className={styles.wordOfDay}>{wordOfTheDay}</div>
          )}
        </div>
      </div>
      <div className="relative md:flex justify-center mt-[40px] md:mt-0 md:items-center">
        <NFTContractInfoModal
          visible={nftDetailsModal}
          onClose={() => setNftDetailsModal(false)}
          ipfsCid={ipfs}
          txHash={imageDetailsListRef.current[imageIndex]?.txHash}
        />
        <div
          className={`${styles.cardContainer} flex justify-center mb-[15px] order-2`}
        >
          {imageDetailsListRef.current.length > 0 &&
            imageDetailsListRef.current.map((character, index) => (
              <TinderCard
                ref={(ref) => (childRefs.current[index] = ref)}
                onSwipe={(dir) => swiped(dir)}
                className={`absolute pressable`}
                preventSwipe={["up", "down"]}
              >
                <div
                  className={`${styles.card}`}
                  style={{ backgroundImage: `url(${character.url})` }}
                >
                  <div className={styles.card_title_overlay}>
                    <div className={styles.card_title}>
                      <div className={styles.card_title_text}>
                        {character.title}
                      </div>
                    </div>
                    <div className={styles.nftInfo}>
                      <div className={styles.id}>{character.handle}</div>
                      <button
                        className={`${styles.nftButton} pb-[30px]`}
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
          className={`absolute md:relative left-0 ${styles.buttonClass}`}
          onClick={() => swipe("left")}
        >
          <Not />
        </button>

        <button
          className={`absolute md:relative right-0 order-last ${styles.buttonClass}`}
          onClick={() => swipe("right")}
        >
          <div className={`relative`}>
            <Hot />
          </div>
        </button>
      </div>
    </>
  );
}
