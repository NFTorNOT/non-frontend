import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./HallOfFlame.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HallOfFlameModal from "./hallOfFlameModal";

function HallOfFlame(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const swiperRef = useRef();
  const data = [1, 2, 3, 4];
  const emptyData = [1, 2, 3, 4, 5];
  const shouldShowEmptyData = data.length !== 9;

  const onItemClick = (ele) => {
    setModalData(ele);
  };

  console.log({ shouldShowEmptyData });
  return (
    <div className={`${styles.container} min-w-0`}>
      <HallOfFlameModal
        shown={showModal}
        close={() => {
          setShowModal(false);
        }}
        onLeftArrowClick={() => {
          swiperRef.current?.slidePrev();
        }}
        onRightArrowClick={() => swiperRef.current?.slideNext()}
      />
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
            // loop={true}
            loopFillGroupWithBlank={true}
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            loopedSlides={100}
            className={styles.carouselItems}
            navigation={{
              enabled: true,
              nextEl: ".next",
              prevEl: ".prev",
            }}
          >
            {data.length > 0 &&
              data.map((ele, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div
                      className={`${styles.carouselItem}`}
                      onClick={() => {
                        setShowModal(!showModal);
                      }}
                    >
                      <Image
                        className={styles.carouselImage}
                        src="https://static.plgworks.com/assets/images/hon/green.jpg"
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
                          43
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

            {shouldShowEmptyData
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
              : null}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default HallOfFlame;
