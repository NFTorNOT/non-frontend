import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./CollectNFT.module.scss";
import collectNFTModalStyles from "./collectModal.module.scss";
import CollectNFTModal from "./collectNFTModal";
import Collect from "./SVG/collect";
import { axiosInstance } from "../../../AxiosInstance";
import { useAuthContext } from "../../../context/AuthContext";
import { ClipLoader } from "react-spinners";
import SignInButton from "../../TopBar/SignInButton";

function CollectNFT(props) {
  const [modalShown, toggleModal] = useState(false);
  const { isUserLoggedIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState();

  const [collectData, setCollectData] = useState([]);
  let hasNextPageIdentifier = useRef(null);

  const fetchCollectData = async () => {
    try {
      setIsLoading(true);
      const collectApiResponse = await axiosInstance.get("collect-nfts", {
        params: {
          pagination_identifier: hasNextPageIdentifier.current,
        },
      });

      if (collectApiResponse.data.success) {
        const collectData = collectApiResponse.data.data;
        const lensPosts = collectData?.lens_posts_ids;
        const lensPostDetails = collectData?.lens_posts;
        const lensPostDetailsImages = collectData?.images;
        const lensPostDetailsTexts = collectData?.texts;
        const currentUserLensPostRelations =
          collectData?.current_user_lens_post_relations;
        const users = collectData?.users;
        const nextPagePayload =
          collectData.meta && collectData.meta.next_page_payload;
        hasNextPageIdentifier.current =
          nextPagePayload && nextPagePayload.pagination_identifier;
        hasNextPageIdentifier.current = collectData?.meta?.next_page_payload;
        let data = [];
        for (let i = 0; i < lensPosts.length; i++) {
          const lensPostDetail = Object.values(lensPostDetails)?.find(
            (post) => post.id == lensPosts[i]
          );
          console.log({ lensPostDetail });
          const lensPostImageDetail = Object.values(
            lensPostDetailsImages
          )?.find((image) => image.id == lensPostDetail.image_id);
          const lensPostTextDetails = Object.values(lensPostDetailsTexts)?.find(
            (text) => text.id == lensPostDetail.description_text_id
          );

          const currentUserLensPostRelation = Object.values(
            currentUserLensPostRelations
          )?.find(
            (lensPost) =>
              lensPost.id == lensPostDetail.current_user_lens_post_relation_id
          );

          const ownerUser = Object.values(users)?.find(
            (user) => user.id == lensPostDetail.owner_user_id
          );

          let postData = {
            title: lensPostDetail?.title,
            description: lensPostTextDetails?.text,
            image: lensPostImageDetail?.url,
            lensPublicationId: lensPostDetail?.lens_publication_id,
            lensProfileOwnerAddress: ownerUser.lens_profile_owner_address,
            hasCollected:
              !!currentUserLensPostRelation?.collect_nft_transaction_hash,
            handle: ownerUser?.lens_profile_username,
          };

          data.push(postData);
        }
        setCollectData(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const showModal = (ele) => {
    setModalData(ele);
    toggleModal(!modalShown);
  };

  useEffect(() => {
    fetchCollectData();
  }, [isUserLoggedIn]);

  const handleScroll = (event) => {
    console.log({ event });
    const target = event.target;

    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      console.log("reached end", hasNextPageIdentifier.current);
      if (hasNextPageIdentifier.current) {
        fetchCollectData();
      }
    }
  };

  return (
    <div className={`${styles.collectNft} mt-[40px]  min-h-0`}>
      <CollectNFTModal
        modalData={modalData}
        shown={modalShown}
        close={() => {
          toggleModal(false);
        }}
      />
      <div className="text-[#ffffff] font-bold text-[20px] leading-[32px]">
        Collect NFTs
      </div>

      {isLoading ? (
        <div className="text-center">
          <ClipLoader />
        </div>
      ) : null}

      {!isUserLoggedIn && !isLoading ? (
        <div className="bg-[#00000099] text-[#ffffff] text-[20px] mt-[16px] h-[512px] flex items-center justify-center">
          <div className="text-center font-medium text-[16px] ">
            <div>Oops! It's Empty</div>
            <div className="flex items-center mt-[5px]">
              <span className="leading-[26px]">Sign in to view your </span>
              <span className="mx-[5px]">
                <Image
                  src="https://static.plgworks.com/assets/images/non/flame-icon.png"
                  alt="Lens Icon"
                  width="19"
                  height="19"
                />
              </span>
              <span className="leading-[26px]">NFT's </span>
            </div>
            <div className="mt-[20px]">
              <SignInButton />
            </div>
            {/* <button
              className={`flex justify-center box-border items-center px-[24px] py-[7px] bg-[#ABFE2C] text-[#00501E] backdrop-blur rounded-[20px] gap-[8px] cursor-pointer border-[1px] border-solid border-black/20 mt-[20px]`}
            >
              <Image
                src="https://static.plgworks.com/assets/images/non/lens-icon.png"
                alt="Lens Icon"
                width="20"
                height="20"
              />
              Sign in with Lens
            </button> */}
          </div>
        </div>
      ) : null}

      {collectData.length == 0 && !isLoading ? (
        <div className="bg-[#00000099] text-[#ffffff] text-[20px] mt-[16px] h-[512px] flex items-center justify-center">
          <div className="text-center font-medium text-[16px] ">
            <div>Oops! It's Empty</div>
            <div className="flex items-center">
              <span className="leading-[26px]">Looks like you haven't </span>
              <span className="mx-[5px]">
                <Image
                  src="https://static.plgworks.com/assets/images/non/flame-icon.png"
                  alt="Lens Icon"
                  width="19"
                  height="19"
                />
              </span>
              <span className="leading-[26px]">any NFT's yet.. vote your</span>
            </div>
            <div className="leading-[26px]">favourites to start collecting</div>
            <button
              className={`${collectNFTModalStyles.collectButton} flex  justify-center py-[7px] mt-[20px]`}
            >
              <span className="pl-[11px]">Vote Now!</span>
            </button>
          </div>
        </div>
      ) : null}

      {collectData.length > 0 && !isLoading && (
        <div
          className={`${styles.scroll} grid grid-cols-2 gap-5 max-h-[512px] overflow-y-scroll mt-[16px]`}
          onScroll={handleScroll}
        >
          {collectData.length > 0 &&
            collectData.map((ele, index) => {
              return (
                <div key={index} className="rounded-[12px] relative">
                  <img className="w-full" src={ele.image} alt="Lens Icon" />
                  <div className={`${styles.nftDetails} p-[15px]`}>
                    <div className="flex items-start justify-between">
                      <span className={`${styles.nftTitle}`}>{ele?.title}</span>
                      <span>
                        <Image
                          src="https://static.plgworks.com/assets/images/non/vote/lens-icon.png"
                          alt="Lens icon"
                          width="20"
                          height="20"
                        />
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-[14px] mb-[22px]">
                      <div className="flex items-center font-medium text-[#ffffff99] text-[16px] leading-[26px]">
                        <span>{ele?.handle}</span>
                        <span>.</span>
                        <span>Follow</span>
                      </div>
                      <div className="flex items-center font-medium text-[#ffffff99] text-[16px] leading-[26px]">
                        <span></span>
                        <span>Show Prompt</span>
                      </div>
                    </div>
                    <button
                      className={`${styles.collectButton} flex items-center justify-center py-[7px]`}
                      onClick={() => {
                        showModal(ele);
                      }}
                    >
                      <span>
                        <Collect />
                      </span>
                      <span className="font-bold text-[16px] leading-[26px] ml-[8px]">
                        Collect Now
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}

          {/* <div className={styles.emptyImageCell}>
          <Image
            src="https://static.plgworks.com/assets/images/non/generate-default.png"
            alt="Lens Icon"
            width="60"
            height="60"
          />
        </div> */}
        </div>
      )}
    </div>
  );
}

export default CollectNFT;
