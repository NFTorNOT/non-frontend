import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HallOfFlame.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function HallOfFlame(props) {
  return (
    // <div className={`${styles.container}`}>
    // <div className="font-bold text-[20px] leading-[32px] text-[#ffffff]">
    //   Hall of Flame
    // </div>
    //   <div className={`${styles.carousel} mt-[17px]`}>
    //     {/* <button>prev</button>
    //     <button>next</button> */}
    //     <div className={styles.carouselItems}>
    //       <div className={`${styles.carouselItem}`}>
    //         <Image
    //           className={styles.carouselImage}
    //           src="https://static.plgworks.com/assets/images/hon/tree.jpg"
    //           alt="Lens Icon"
    //           width="30"
    //           height="30"
    //         />
    //       </div>
    //       <div className={styles.carouselItem}>
    //         <Image
    //           src="https://static.plgworks.com/assets/images/non/generate-default.png"
    //           alt="Lens Icon"
    //           width="30"
    //           height="30"
    //         />
    //       </div>
    //       <div className={styles.carouselItem}>
    //         <Image
    //           src="https://static.plgworks.com/assets/images/non/generate-default.png"
    //           alt="Lens Icon"
    //           width="30"
    //           height="30"
    //         />
    //       </div>
    //       <div className={styles.carouselItem}>
    //         <Image
    //           src="https://static.plgworks.com/assets/images/non/generate-default.png"
    //           alt="Lens Icon"
    //           width="30"
    //           height="30"
    //         />
    //       </div>
    //       <div className={styles.carouselItem}>
    //         <Image
    //           src="https://static.plgworks.com/assets/images/non/generate-default.png"
    //           alt="Lens Icon"
    //           width="30"
    //           height="30"
    //         />
    //       </div>
    //       <div className={styles.carouselItem}>
    //         <Image
    //           src="https://static.plgworks.com/assets/images/non/generate-default.png"
    //           alt="Lens Icon"
    //           width="30"
    //           height="30"
    //         />
    //       </div>
    //       <div className={styles.carouselItem}>
    //         <Image
    //           src="https://static.plgworks.com/assets/images/non/generate-default.png"
    //           alt="Lens Icon"
    //           width="30"
    //           height="30"
    //         />
    //       </div>
    //       <div className={styles.carouselItem}>
    //         <Image
    //           src="https://static.plgworks.com/assets/images/non/generate-default.png"
    //           alt="Lens Icon"
    //           width="30"
    //           height="30"
    //         />
    //       </div>
    //       <div className={styles.carouselItem}>
    //         <Image
    //           src="https://static.plgworks.com/assets/images/non/generate-default.png"
    //           alt="Lens Icon"
    //           width="30"
    //           height="30"
    //         />
    //       </div>
    // <div className={styles.carouselItem}>
    //   <Image
    //     src="https://static.plgworks.com/assets/images/non/generate-default.png"
    //     alt="Lens Icon"
    //     width="30"
    //     height="30"
    //   />
    // </div>
    //     </div>
    //   </div>
    // </div>

    <div className={`${styles.container}`}>
      <div className="font-bold text-[20px] leading-[32px] text-[#ffffff]">
        Hall of Flame
      </div>
      <button className={`${styles.prev} prev`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#666" />
      </svg>
      </button>
      <button className={`${styles.next} next`}>
        <svg
          width="11"
          height="19"
          viewBox="0 0 11 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.43934 0.43934C1.02513 -0.146447 1.97487 -0.146447 2.56066 0.43934L10.5607 8.43934C11.1464 9.02513 11.1464 9.97487 10.5607 10.5607L2.56066 18.5607C1.97487 19.1464 1.02513 19.1464 0.43934 18.5607C-0.146447 17.9749 -0.146447 17.0251 0.43934 16.4393L7.37868 9.5L0.43934 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.43934 0.43934Z"
            fill="white"
            fill-opacity="0.8"
          />
        </svg>
      </button>
      <div className={`${styles.carousel} mt-[17px]`} onClick={(e) => {
          e.stopPropagation();
        }}>
        <Swiper
          slidesPerView={9}
          spaceBetween={30}
          slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          modules={[Navigation]}
          loopedSlides={100}
          className={styles.carouselItems}
          navigation={{
            enabled: true,
            nextEl: ".next",
            prevEl: ".prev",
          }}
        >
          <SwiperSlide>
            <div className={`${styles.carouselItem}`}>
              <Image
                className={styles.carouselImage}
                src="https://static.plgworks.com/assets/images/hon/tree.jpg"
                alt="Lens Icon"
                width="30"
                height="30"
              />
              <div className={`${styles.trending} p-[5px] flex items-center`}>
                <span></span>
                <span className="font-medium text-[16px] leading-[26px] text-[#ffffff]">40</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.carouselItem}>
              <Image
                src="https://static.plgworks.com/assets/images/non/generate-default.png"
                alt="Lens Icon"
                width="30"
                height="30"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.carouselItem}>
              <Image
                src="https://static.plgworks.com/assets/images/non/generate-default.png"
                alt="Lens Icon"
                width="30"
                height="30"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.carouselItem}>
              <Image
                src="https://static.plgworks.com/assets/images/non/generate-default.png"
                alt="Lens Icon"
                width="30"
                height="30"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.carouselItem}>
              <Image
                src="https://static.plgworks.com/assets/images/non/generate-default.png"
                alt="Lens Icon"
                width="30"
                height="30"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.carouselItem}>
              <Image
                src="https://static.plgworks.com/assets/images/non/generate-default.png"
                alt="Lens Icon"
                width="30"
                height="30"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styles.carouselItem}`}>
              <Image
                className={styles.carouselImage}
                src="https://static.plgworks.com/assets/images/hon/tree.jpg"
                alt="Lens Icon"
                width="30"
                height="30"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.carouselItem}>
              <Image
                src="https://static.plgworks.com/assets/images/non/generate-default.png"
                alt="Lens Icon"
                width="30"
                height="30"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HallOfFlame;
