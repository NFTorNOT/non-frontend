import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./HallOfFlame.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HallOfFlameModal from "./hallOfFlameModal";
import { axiosInstance } from "../../../AxiosInstance";
import CollectNFTModal from "./collectNFTModal";

function HallOfFlame(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const swiperRef = useRef();

  let hasNextPageIdentifier = useRef(null);

  const [hallOfFlameData, setHallOfFlameData] = useState([]);
  const allData = useRef([]);

  const activeIndex = useRef(0);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      do {
        const hallOfFlameResponse = await axiosInstance.get(
          "/hall-of-flame-nfts",
          {
            params: {
              pagination_identifier: hasNextPageIdentifier.current,
            },
          }
        );
        if (hallOfFlameResponse.data.success) {
          const hallOfFlameData = hallOfFlameResponse.data.data;
          const lensPosts = hallOfFlameData?.lens_posts_ids;
          const lensPostDetails = hallOfFlameData?.lens_posts;
          const lensPostDetailsImages = hallOfFlameData?.images;
          const lensPostDetailsTexts = hallOfFlameData?.texts;
          const lensPostsTheme = hallOfFlameData?.themes;
          const currentUserLensPostRelations =
            hallOfFlameData?.current_user_lens_post_relations;
          const users = hallOfFlameData?.users;
          const nextPagePayload =
            hallOfFlameData.meta && hallOfFlameData.meta.next_page_payload;
          hasNextPageIdentifier.current =
            nextPagePayload && nextPagePayload.pagination_identifier;
          let data = [];
          for (let i = 0; i < lensPosts.length; i++) {
            const lensPostDetail = Object.values(lensPostDetails)?.find(
              (post) => post.id == lensPosts[i]
            );
            console.log({ lensPostDetail });
            const lensPostImageDetail = Object.values(
              lensPostDetailsImages
            )?.find((image) => image.id == lensPostDetail?.image_id);
            const lensPostTextDetails = Object.values(
              lensPostDetailsTexts
            )?.find((text) => text.id == lensPostDetail?.description_text_id);

            const currentUserLensPostRelation = currentUserLensPostRelations
              ? Object.values(currentUserLensPostRelations)?.find(
                  (lensPost) =>
                    lensPost.id ==
                    lensPostDetail?.current_user_lens_post_relation_id
                )
              : null;

            const ownerUser = Object.values(users)?.find(
              (user) => user.id == lensPostDetail?.owner_user_id
            );

            const currentTheme = Object.values(lensPostsTheme)?.find(
              (theme) => theme.id == lensPostDetail?.theme_id
            );

            let postData = {
              title: lensPostDetail?.title,
              lensPublicationId: lensPostDetail?.lens_publication_id,
              lensProfileOwnerAddress: ownerUser.lens_profile_owner_address,
              lensId: lensPostDetail?.id,
              description: lensPostTextDetails?.text,
              image: lensPostImageDetail?.url,
              totalVotes: lensPostDetail?.total_votes,
              hasCollected:
                !!currentUserLensPostRelation?.collect_nft_transaction_hash,
              handle: ownerUser?.lens_profile_username,
              theme: currentTheme,
            };

            data.push(postData);
          }
          allData.current = [...allData.current, ...data];
          setHallOfFlameData(data);
          setIsLoading(false);
        }
      } while (hasNextPageIdentifier.current);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onItemClick = (ele, index) => {
    console.log("swiper ref", swiperRef.current.activeIndex);
    activeIndex.current = index;
    setShowModal(!showModal);
  };

  const onCollectNowClicked = (ele) => {
    setModalData(ele);
    setShowCollectModal(true);
  };

  return (
    <div className={`${styles.container} min-w-0`}>
      <HallOfFlameModal
        shown={showModal}
        hallOfFlameData={allData.current}
        initialSlide={activeIndex.current}
        close={() => {
          setShowModal(false);
        }}
        onCollectNow={(modalData) => {
          onCollectNowClicked(modalData);
        }}
      />
      {showCollectModal ? (
        <CollectNFTModal
          modalData={modalData}
          shown={showCollectModal}
          close={() => {
            setShowCollectModal(false);
          }}
        />
      ) : null}
      <div className="flex items-center">
        <div className="font-bold text-[20px] leading-[32px] text-[#ffffff] mr-[8px]">
          Hall of Flame
        </div>
        <div>
          <Image
            src="https://static.plgworks.com/assets/images/non/flame-icon.png"
            alt="Lens Icon"
            width="19"
            height="19"
          />
        </div>
      </div>
      <div className="relative">
        <button className={`${styles.prev} prev`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="19"
            fill="none"
            viewBox="0 0 18 32"
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity=".8"
              strokeWidth="4"
              d="M15.75 29.417 2.333 16 15.75 2.583"
            />
          </svg>
        </button>
        <button className={`${styles.next} next`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="19"
            fill="none"
            viewBox="0 0 18 32"
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity=".8"
              strokeWidth="4"
              d="M2.25 2.583 15.667 16 2.25 29.417"
            />
          </svg>
        </button>
        <div
          className={`${styles.carousel} mt-[12px]`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Swiper
            slidesPerView={9}
            spaceBetween={30}
            slidesPerGroup={1}
            loopFillGroupWithBlank={true}
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className={styles.carouselItems}
            navigation={{
              enabled: true,
              nextEl: ".next",
              prevEl: ".prev",
            }}
          >
            {allData.current.length > 0 &&
              allData.current.map((ele, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div
                      className={`${styles.carouselItem}`}
                      onClick={() => {
                        onItemClick(ele, index);
                      }}
                    >
                      <Image
                        className={styles.carouselImage}
                        src={ele?.image}
                        alt="Lens Icon"
                        width="30"
                        height="30"
                      />
                      <div
                        className={`${styles.trending} p-[5px] flex items-center`}
                      >
                        <span>
                          <Image
                            src="https://static.plgworks.com/assets/images/non/flame-icon.png"
                            alt="Lens Icon"
                            width="19"
                            height="19"
                          />
                        </span>
                        <span className="font-medium text-[16px] leading-[26px] text-[#ffffff] ml-[3px]">
                          {ele.totalVotes}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            {/* <SwiperSlide>
              <div
                className={`${styles.carouselItem}`}
                onClick={() => {
                  toggleModal(!modalShown);
                }}
              >
                <Image
                  className={styles.carouselImage}
                  src="https://static.plgworks.com/assets/images/hon/green.jpg"
                  alt="Lens Icon"
                  width="30"
                  height="30"
                />
                <div className={`${styles.trending} p-[5px] flex items-center`}>
                  <span>
                    <Image
                      src="https://static.plgworks.com/assets/images/non/flame-icon.png"
                      alt="Lens Icon"
                      width="19"
                      height="19"
                    />
                  </span>
                  <span className="font-medium text-[16px] leading-[26px] text-[#ffffff] ml-[3px]">
                    43
                  </span>
                </div>
              </div>
            </SwiperSlide> */}

            {/* {shouldShowEmptyData
              ? emptyData.map((ele, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className={styles.carouselItem}>
                        <Image
                          src="https://static.plgworks.com/assets/images/non/generate-default.png"
                          alt="Lens Icon"
                          width="30"
                          height="30"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })
              : null} */}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default HallOfFlame;
