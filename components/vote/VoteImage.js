import styles from "./Vote.module.scss";
import React, { useEffect, useRef, useState } from "react";
import PublicationApi, { ReactionType } from "../../graphql/PublicationApi";
import { useUserContext } from "../../context/UserContext";
import useCurrentPublicationId from "../../utils/useCurrentPublicationId";
import { ClipLoader } from "react-spinners";
import { useAuthContext } from "../../context/AuthContext";
import NonCard from "../nonCard";
import NFTContractInfoModal from "./NFTContractInfoModal/NFTContractInfoModal";
import Not from "./svg/not";
import Hot from "./svg/hot";
import axios from "axios";

export default function VoteImage() {
  const ipfs = "0x34...2745";
  const { userProfile } = useUserContext();
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

  let imagePaginationIdentifier = null;

  async function fetchLensPost() {
    setIsApiInProgress(true);
    const lensPostData = await axios.get("https://nftornot.quick-poc.com/api/nfts", {
      params: {
        pagination_identifier: imagePaginationIdentifier,
      },
    });

    const lensPostResponseData =
      lensPostData && lensPostData.data && lensPostData.data.data;

    if (!lensPostResponseData) {
      // TODO:DS : Show Response Err
      return;
    }

    const nextPagePayload =
      lensPostResponseData.meta && lensPostResponseData.meta.next_page_payload;
    imagePaginationIdentifier =
      nextPagePayload && nextPagePayload.pagination_identifier;

    const lensPostIdsArr = lensPostResponseData.lens_posts_ids;
    const lenstPostsMap = lensPostResponseData.lens_posts;
    const lensPostImagesMap = lensPostResponseData.images;
    const lensPostTextMap = lensPostResponseData.texts;
    const usersMap = lensPostResponseData.users;
    const lensPostDetails = [];

    for (let cnt = 0; cnt < lensPostIdsArr.length; cnt++) {
      const lensPost = lenstPostsMap[lensPostIdsArr[cnt]];

      if (!lensPost) {
        continue;
      }

      const descriptionTextId = lensPost.description_text_id,
        imageId = lensPost.image_id,
        owneUserId = lensPost.owner_user_id,
        imageObj = lensPostImagesMap && lensPostImagesMap[imageId],
        textObj = lensPostTextMap && lensPostTextMap[descriptionTextId],
        userObj = usersMap && usersMap[owneUserId];

      lensPostDetails.push({
        publicationId: lensPost.lens_publication_id,
        lensPostId: lensPostIdsArr[cnt],
        url: imageObj.url,
        title: lensPost.title,
        txHash: lensPost.nft_mint_transaction_hash,
        description: textObj.text,
        handle: userObj.lens_profile_username
      });
    }
    imageDetailsListRef.current = lensPostDetails;

    // imageDetailsListRef.current = imageDetailsListRef.current || [];
    // imageDetailsListRef.current = imageDetailsListRef.current.concat(lensPostDetails);

    console.log("lensPostDetails", lensPostDetails);
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
    fetchLensPost();
  }

  useEffect(() => {
    fetchWordOfTheDay();
  }, []);

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

  async function upvoteImage({ publicationId }) {
    try {
      const res = await PublicationApi.addReaction({
        profileId: userProfile?.id,
        reactionType: ReactionType.UPVOTE,
        publicationId: publicationId.toString(),
      });

      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  }

  const submitVote = (dir) => {
    const lensPostId =
      imageDetailsListRef.current[imageIndex]?.lensPostId;
    const publicationId =
      imageDetailsListRef.current[imageIndex]?.publicationId;

    axios.post("https://nftornot.quick-poc.com/api/reaction", {
      reaction: dir == "right" ? "VOTED" : "IGNORED",
      lens_post_id: lensPostId,
    });
    upvoteImage({ publicationId });
  }

  const swiped = (dir) => {
    submitVote(dir);
    swipeAnimation(dir);
    showNextImage();
    // if (imageIndex <= 2){
    //   fetchLensPost()
    // }
  };

  const canSwipe = imageIndex >= 0;

  const swipeAnimation = async (dir) => {
    if (canSwipe && imageIndex < imageDetailsListRef.current.length) {
      await childRefs.current[imageIndex].swipe(dir);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${styles.secondTab}`}>
        <div className={styles.yellow}>Word of the day</div>
        <div className={styles.generatedTitle}>
          {wordFetchInProgress ? (
            <ClipLoader color={"#fff"} loading={true} size={15} />
          ) : (
            <div className={styles.wordOfDay}>{wordOfTheDay}</div>
          )}
        </div>
      </div>
      <div className="relative md:flex justify-center mt-[10px] md:items-center">
        <NFTContractInfoModal
          visible={nftDetailsModal}
          onClose={() => setNftDetailsModal(false)}
          ipfsCid={ipfs}
          txHash={imageDetailsListRef.current[imageIndex]?.txHash}
        />
        <div
          className={`${styles.cardContainer} flex justify-center mb-[15px] order-2 aspect-[512/512]`}
        >
          {imageDetailsListRef.current.length > 0 &&
            imageDetailsListRef.current.map((character, index) => (
              <NonCard
                ref={(ref) => (childRefs.current[index] = ref)}
                onSwipe={(dir) => submitVote(dir)}
                className={`absolute pressable`}
                preventSwipe={["up", "down"]}
                key={index}
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
              </NonCard>
            ))}
        </div>
        <button
          className={`absolute md:relative left-0 ${styles.buttonClass}`}
          onClick={() => swiped("left")}
        >
          <Not />
        </button>

        <button
          className={`absolute md:relative right-0 order-last ${styles.buttonClass}`}
          onClick={() => swiped("right")}
        >
          <div className={`relative`}>
            <Hot />
          </div>
        </button>
      </div>
    </div>
  );
}
