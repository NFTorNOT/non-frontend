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
import TrendingThemes from './svg/trendingThemes';
import axios from "axios";
import { ReactionTypes } from "../../utils/Constants";

export default function VoteImage() {
  const ipfs = "0x34...2745";
  const { userProfile } = useUserContext();
  const { getPostId } = useCurrentPublicationId();

  const [nftDetailsModal, setNftDetailsModal] = useState(false);
  const imageDetailsListRef = useRef([]);
  const [apiInProgress, setIsApiInProgress] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [wordOfTheDay, setWordOfTheDay] = useState();
  const [wordFetchInProgress, setWordFetchInProgress] = useState(false);
  const [themesData, setThemesData] = useState([]);
  const { isUserLoggedIn } = useAuthContext();
  const isVoteInProgress = useRef(false);
  const postIdRef = useRef();
  const childRefs = useRef();

  let themes = [];
  async function fetchLensPost() {
    let imagePaginationIdentifier = null;
    let canMakeNewRequest = null;
    do {
      setIsApiInProgress(true);
      const lensPostData = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/nfts`, {
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

      canMakeNewRequest = imagePaginationIdentifier && imageDetailsListRef.current.length <= 20;

      const lensPostIdsArr = lensPostResponseData.lens_posts_ids;
      const lenstPostsMap = lensPostResponseData.lens_posts;
      const lensPostImagesMap = lensPostResponseData.images;
      const lensPostTextMap = lensPostResponseData.texts;
      const usersMap = lensPostResponseData.users;
      const themesMap = lensPostResponseData.themes
      const lensPostDetails = [];

 

      for (let i = 1; i <= 3 && themes.length <= 3 ; i++) {
        
        const isAlreadyPresent = themes.some(el => el.themeName === themesMap[i]?.name);

        if(!isAlreadyPresent && themesMap[i]?.id && themesMap[i]?.name){
          themes.push({
            id: themesMap[i]?.id,
            themeName: themesMap[i]?.name
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
          handle: userObj.lens_profile_username
        });
      }
      imageDetailsListRef.current = imageDetailsListRef.current || [];
      imageDetailsListRef.current = imageDetailsListRef.current.concat(lensPostDetails);

      setIsApiInProgress(false);
      setImageIndex(imageDetailsListRef.current.length - 1);
      setSelectedTheme(imageDetailsListRef.current[imageIndex]?.themeName);
      childRefs.current = Array(imageDetailsListRef.current.length)
        .fill(0)
        .map((i) => React.createRef());
    } while (canMakeNewRequest);

  }

  useEffect(() => {
    fetchLensPost();
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

    if (isVoteInProgress.current) {
      return
    }
    setSelectedTheme(imageDetailsListRef.current[imageIndex]?.themeName);

    isVoteInProgress.current = true;

    const lensPostId =
      imageDetailsListRef.current[imageIndex]?.lensPostId;
    const publicationId =
      imageDetailsListRef.current[imageIndex]?.publicationId;

    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reaction`, {
      reaction: dir == "right" ? ReactionTypes.VOTED : ReactionTypes.IGNORED,
      lens_post_id: lensPostId,
    })
      .finally(() => {
        isVoteInProgress.current = false;
      });
    upvoteImage({ publicationId });
  }

  const swiped = (dir) => {
    submitVote(dir);
    swipeAnimation(dir);
    showNextImage();
    if (imageIndex <= 2) {
      fetchLensPost()
    }
  };

  const canSwipe = imageIndex >= 0;

  const swipeAnimation = async (dir) => {
    if (canSwipe && imageIndex < imageDetailsListRef.current.length) {
      await childRefs.current[imageIndex].swipe(dir);
    }
  };

  console.log("themes",themesData);

  return (
    <div>
      <div className={`${styles.secondTab}`}>
        <div className={`${styles.yellow} flex items-center justify-center gap-[5px]`}>
          <span>Trending Themes</span>
          <span><TrendingThemes /></span>
        </div>
        <div className={`${styles.wordOfDay} flex items-center justify-center`}>
          {imageDetailsListRef.current.length > 0 && themesData.map((item, index) => (
            <div className={`${selectedTheme === item.themeName ? 'text-[#ffffff] font-bold' : 'text-[#ffffff99]'} flex items-center`} key={index}>
              <span>
                <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" width="5" height="5" rx="2.5" fill="white" fillOpacity="0.6" />
                </svg>
              </span>
              #{item.themeName}
            </div>
          ))}
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
            ))}:{
            <div className='text-[#fff] font-bold mt-[100px]'>
              You have voted all lens post.
              </div>
          }
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
