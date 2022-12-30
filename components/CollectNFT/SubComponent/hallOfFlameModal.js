import React, { useRef } from "react";
import styles from "./hallOfFlameModal.module.scss";
import Image from "next/image";
import Collect from "./SVG/collect";
import LeftArrow from "./SVG/leftArrow";
import RightArrow from "./SVG/rightArrow";
import HofCross from "./SVG/hofCross";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";
import { TRENDING_THEMES } from "../../../utils/Constants";

function HallOfFlameModal({
  shown,
  close,
  hallOfFlameData,
  initialSlide,
  onCollectNow,
}) {
  const Themes = TRENDING_THEMES;
  return shown ? (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => {
        // do not close modal if anything inside modal content is clicked
        e.stopPropagation();
      }}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <button onClick={close} className="absolute top-0 right-0">
          <HofCross />
        </button>
        <button className="modalPrev absolute top-0 bottom-0 left-[450px]">
          <LeftArrow />
        </button>
        <button className="modalNext absolute top-0 bottom-0 right-[450px]">
          <RightArrow />
        </button>

        <Swiper
          initialSlide={initialSlide}
          slidesPerView={1}
          spaceBetween={30}
          slidesPerGroup={1}
          modules={[Navigation]}
          className={`${styles.carouselItems} flex items-center rounded-[10px]`}
          navigation={{
            enabled: true,
            nextEl: ".modalNext",
            prevEl: ".modalPrev",
          }}
        >
          {hallOfFlameData.length > 0 &&
            hallOfFlameData.map((ele, index) => {
              console.log("hallOfFlameData", { ele });
              return (
                <SwiperSlide key={index}>
                  <div className="w-full">
                    <div className="flex items-center justify-center">
                      <span className="mr-[8px] font-bold text-[20px] leading-[32px] text-[#ffffff]">
                        Hall of Flame
                      </span>
                      <span>
                        <Image
                          src="https://static.plgworks.com/assets/images/non/flame-icon.png"
                          alt="Lens Icon"
                          width="19"
                          height="19"
                        />
                      </span>
                    </div>
                    <div className="flex items-center justify-center mt-[15px] font-bold text-[20px]">
                      {Themes.length > 0 &&
                        Themes.map((item, index) => {
                          return (
                            <>
                              <span
                                className={`${
                                  ele?.theme?.name == item.name
                                    ? "text-[#fff]"
                                    : "text-[#ffffff99]"
                                }`}
                              >
                                #{item.name}
                              </span>
                              {index < Themes.length - 1 ? (
                                <span
                                  className={`${styles.dot} mx-[10px]`}
                                ></span>
                              ) : null}
                            </>
                          );
                        })}
                    </div>
                    <div
                      className={`${styles.card} flex items-center justify-center mt-[20px]`}
                      style={{
                        backgroundImage: `url(${ele.image})`,
                      }}
                    >
                      <div
                        className={`${styles.upvoteCount} flex items-center justify-center`}
                      >
                        <span className="pr-[10px]">
                          <Image
                            src="https://static.plgworks.com/assets/images/non/flame-icon.png"
                            alt="Lens Icon"
                            width="23"
                            height="27"
                          />
                        </span>
                        <span>{ele.totalVotes}</span>
                      </div>
                      <div className={`${styles.nftDetails} p-[15px]`}>
                        <div className="flex items-start justify-between">
                          <div className={styles.nftTitle}>{ele.title}</div>
                          <div>
                            <Image
                              src="https://static.plgworks.com/assets/images/non/vote/lens-icon.png"
                              alt="Lens icon"
                              width="20"
                              height="20"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-[14px] mb-[22px]">
                          <div className="flex items-center font-medium text-[#ffffff99] text-[16px] leading-[26px]">
                            <span>{ele.handle}</span>
                            <span>.</span>
                            <span>Follow</span>
                          </div>
                          <div className="flex items-center font-medium text-[#ffffff99] text-[16px] leading-[26px]">
                            <span></span>
                            <span>Show Prompt</span>
                          </div>
                        </div>
                        {ele.hasCollected ? (
                          <button
                            className={`${styles.collectButton} flex items-center justify-center py-[7px]`}
                          >
                            <span>
                              <Collect />
                            </span>
                            <span className="font-bold text-[16px] leading-[26px] ml-[8px]">
                              You have already collected this
                            </span>
                          </button>
                        ) : (
                          <button
                            className={`${styles.collectButton} flex items-center justify-center py-[7px]`}
                            onClick={() => onCollectNow(ele)}
                          >
                            <span>
                              <Collect />
                            </span>
                            <span className="font-bold text-[16px] leading-[26px] ml-[8px]">
                              Collect Now
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  ) : null;
}

export default HallOfFlameModal;
