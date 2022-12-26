import styles from "./Vote.module.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import PublicationApi, { ReactionType } from "../../graphql/PublicationApi";
import { useUserContext } from "../../context/UserContext";
import useCurrentPublicationId from "../../utils/useCurrentPublicationId";
import { ClipLoader } from "react-spinners";
import { useAuthContext } from "../../context/AuthContext";
import NonCard from "../nonCard";
import NFTContractInfoModal from "./NFTContractInfoModal/NFTContractInfoModal";
import Not from "./svg/not";
import Hot from "./svg/hot";
import TrendingThemeDefault from "./TrendingThemeDefault";
import ClickOnHot from "./svg/clickOnHot";
import axios, { all } from "axios";
import { ReactionTypes } from "../../utils/Constants";
import VoteCard from "./voteCard";

export default function VoteImage() {
  const ipfs = "0x34...2745";
  const { userProfile } = useUserContext();
  const { getPostId } = useCurrentPublicationId();

  const [nftDetailsModal, setNftDetailsModal] = useState(false);
  const imageDetailsListRef = useRef([]);
  const [apiInProgress, setIsApiInProgress] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [themesData, setThemesData] = useState([]);
  const [isNotButtonClicked, setIsNotButtonClicked] = useState(false);
  const [isHotButtonClicked, setIsHotButtonClicked] = useState(false);
  const [data, setData] = useState([]);

  const { isUserLoggedIn } = useAuthContext();
  const isVoteInProgress = useRef(false);

  const childRefs = useRef();

  const PAGINATION_ITEM_COUNT = 4;

  const allData = useRef([]);

  const consumedData = useRef([]);

  let hasNextPageIdentifier = useRef(null);

  let themes = [];
  async function fetchLensPost() {
    const lensPostData = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/nfts`,
      {
        params: {
          pagination_identifier: hasNextPageIdentifier.current,
        },
      }
    );

    const lensPostResponseData =
      lensPostData && lensPostData.data && lensPostData.data.data;

    if (!lensPostResponseData) {
      // TODO:DS : Show Response Err
      return;
    }

    const nextPagePayload =
      lensPostResponseData.meta && lensPostResponseData.meta.next_page_payload;
    hasNextPageIdentifier.current =
      nextPagePayload && nextPagePayload.pagination_identifier;

    const lensPostIdsArr = lensPostResponseData.lens_posts_ids;
    const lenstPostsMap = lensPostResponseData.lens_posts;
    const lensPostImagesMap = lensPostResponseData.images;
    const lensPostTextMap = lensPostResponseData.texts;
    const usersMap = lensPostResponseData.users;
    const themesMap = lensPostResponseData.themes;
    const lensPostDetails = [];

    for (let i = 1; i <= 3 && themes.length <= 3; i++) {
      const isAlreadyPresent = themes.some(
        (el) => el.themeName === themesMap[i]?.name
      );

      if (!isAlreadyPresent && themesMap[i]?.id && themesMap[i]?.name) {
        themes.push({
          id: themesMap[i]?.id,
          themeName: themesMap[i]?.name,
        });
      }
    }

    setThemesData(themes);

    for (let cnt = 0; cnt < lensPostIdsArr.length; cnt++) {
      const lensPost = lenstPostsMap[lensPostIdsArr[cnt]];

      if (!lensPost) {
        continue;
      }

      const descriptionTextId = lensPost.description_text_id,
        imageId = lensPost.image_id,
        owneUserId = lensPost.owner_user_id,
        themeId = lensPost.theme_id,
        imageObj = lensPostImagesMap && lensPostImagesMap[imageId],
        textObj = lensPostTextMap && lensPostTextMap[descriptionTextId],
        themesObj = themesMap && themesMap[themeId],
        userObj = usersMap && usersMap[owneUserId];

      lensPostDetails.push({
        publicationId: lensPost.lens_publication_id,
        lensPostId: lensPostIdsArr[cnt],
        themeName: themesObj.name,
        url: imageObj.url,
        title: lensPost.title,
        txHash: lensPost.nft_mint_transaction_hash,
        description: textObj.text,
        handle: userObj.lens_profile_username,
      });
    }

    makeData(lensPostDetails);
  }

  function makeData(dataList) {
    allData.current = [...allData.current, ...dataList];
  }

  const loadMore = async (isFirstTime) => {
    const shouldSliceNextSetOfData =
      consumedData.current.length - 1 - imageIndex;

    if (isFirstTime || shouldSliceNextSetOfData <= 1) {
      await slicedNextSetOfData(isFirstTime);
    }
  };

  async function slicedNextSetOfData(isFirstTime) {
    if (
      isFirstTime ||
      (allData.current.length - consumedData.current.length <
        PAGINATION_ITEM_COUNT &&
        hasNextPageIdentifier.current)
    ) {
      if (isFirstTime) {
        do {
          await fetchLensPost();
        } while (allData.current.length <= 0 && hasNextPageIdentifier.current);
      } else {
        await fetchLensPost();
      }
    }
    let sliceNextSetOfData = allData.current.slice(
      consumedData.current.length,
      consumedData.current.length + PAGINATION_ITEM_COUNT
    );
    consumedData.current = [...consumedData.current, ...sliceNextSetOfData];
    childRefs.current = Array(consumedData.current.length)
      .fill(0)
      .map((i) => React.createRef());
    setSelectedTheme(consumedData.current[imageIndex]?.themeName);
  }

  useEffect(() => {
    setData(
      consumedData.current
        .slice(imageIndex, imageIndex + PAGINATION_ITEM_COUNT)
        .reverse()
    );

    return () => {};
  }, [imageIndex, consumedData.current.length]);

  useEffect(() => {
    setTimeout(async () => {
      await loadMore(true);
    }, 2000);
  }, []);

  function showNextImage() {
    setImageIndex((imageIndex) => imageIndex + 1);
    setSelectedTheme(consumedData.current[imageIndex]?.themeName);
  }

  async function upvoteImage({ publicationId }) {
    try {
      const res = await PublicationApi.addReaction({
        profileId: userProfile?.id,
        reactionType: ReactionType.UPVOTE,
        publicationId: publicationId.toString(),
      });
    } catch (error) {
      console.log({ error });
    }
  }

  const submitVote = (dir) => {
    if (!isUserLoggedIn) {
      alertUserToSignIn();
      return;
    }
    if (isVoteInProgress.current) {
      return;
    }
    setSelectedTheme(consumedData.current[imageIndex]?.themeName);

    isVoteInProgress.current = true;

    const lensPostId = consumedData.current[imageIndex]?.lensPostId;
    const publicationId = consumedData.current[imageIndex]?.publicationId;

    console.log({ lensPostId, publicationId });
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reaction`, {
        reaction: dir == "right" ? ReactionTypes.VOTED : ReactionTypes.IGNORED,
        lens_post_id: lensPostId,
      })
      .finally(() => {
        isVoteInProgress.current = false;
      });
    upvoteImage({ publicationId });
  };

  function alertUserToSignIn() {
    alert("Please sign in to vote");
  }

  const swiped = async (dir) => {
    if (!isUserLoggedIn) {
      alertUserToSignIn();
      return;
    }
    submitVote(dir);
    swipeAnimation(dir);
    await loadMore();
    showNextImage();
  };

  const canSwipe = imageIndex >= 0;

  const swipeAnimation = async (dir) => {
    if (canSwipe && imageIndex < consumedData.current.length) {
      await childRefs.current[imageIndex]?.swipe(dir);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <TrendingThemeDefault selectedTheme={selectedTheme} />
      <div className="relative md:flex justify-center md:items-center mt-[40px]">
        <NFTContractInfoModal
          visible={nftDetailsModal}
          onClose={() => setNftDetailsModal(false)}
          ipfsCid={ipfs}
          txHash={consumedData.current[imageIndex]?.txHash}
        />

        <div
          className={`${styles.cardContainer} flex justify-center mb-[15px] order-2 aspect-[512/512] h-[520px] cursor-grab ${styles.voteCards}`}
        >
          {data.length > 0 &&
            data.map((character, index) => (
              <NonCard
                ref={(ref) => (childRefs.current[imageIndex] = ref)}
                onSwipe={(dir) => submitVote(dir)}
                className={`absolute pressable ${styles.voteCard}`}
                preventSwipe={["up", "down"]}
                key={character.publicationId}
              >
                <VoteCard character={character}></VoteCard>
              </NonCard>
            ))}
        </div>
        {consumedData.current.length > 0 ? (
          <>
            <button
              className={`absolute md:relative left-0`}
              disabled={isNotButtonClicked}
              onClick={() => {
                if (!isUserLoggedIn) {
                  alertUserToSignIn();
                  return;
                }
                swiped("left");
                setIsNotButtonClicked(true);
                setTimeout(() => {
                  setIsNotButtonClicked(false);
                }, 2000);
              }}
            >
              <div
                className={`${styles.buttonClassNot} ${
                  !isNotButtonClicked ? `block` : `hidden`
                } m-[8px]`}
              >
                <Not />
              </div>
              <div className={`${isNotButtonClicked ? `block` : `hidden`}`}>
                <ClickOnHot />
              </div>
            </button>

            <button
              className={`absolute md:relative right-0 order-last`}
              disabled={isHotButtonClicked}
              onClick={() => {
                if (!isUserLoggedIn) {
                  alertUserToSignIn();
                  return;
                }
                swiped("right");
                setIsHotButtonClicked(true);
                setTimeout(() => {
                  setIsHotButtonClicked(false);
                }, 2000);
              }}
            >
              <div
                className={`${styles.buttonClassHot} ${
                  !isHotButtonClicked ? `block` : `hidden`
                } m-[8px]`}
              >
                <Hot />
              </div>
              <div className={`${isHotButtonClicked ? `block` : `hidden`}`}>
                <Image
                  src="https://static.plgworks.com/assets/images/non/vote/hotButtonClick.png"
                  alt="Lens Icon"
                  width="72"
                  height="72"
                />
              </div>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
