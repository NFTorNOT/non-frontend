import React from "react";
import styles from "./hallOfFlameModal.module.scss";
import Image from "next/image";
import Close from "./SVG/close";
import Collect from "./SVG/collect";
import LeftArrow from "./SVG/leftArrow";
import RightArrow from "./SVG/rightArrow";
import HofCross from "./SVG/hofCross";

function HallOfFlameModal({
  shown,
  close,
  onLeftArrowClick,
  onRightArrowClick,
}) {
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
          <span>#Light</span>
          <span className={`${styles.dot} mx-[10px]`}></span>
          <span>#Space</span>
          <span className={`${styles.dot} mx-[10px]`}></span>
          <span>#Magical</span>
        </div>
        <button
          className="prev absolute top-0 bottom-0 left-[450px]"
          onClick={onLeftArrowClick}
        >
          <LeftArrow />
        </button>
        <button
          className="next absolute top-0 bottom-0 right-[450px]"
          onClick={onRightArrowClick}
        >
          <RightArrow />
        </button>
        <div
          className={`${styles.card} flex items-center justify-center mt-[20px]`}
          style={{
            backgroundImage: `url(https://static.plgworks.com/assets/images/hon/vespa.jpg)`,
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
            <span>42</span>
          </div>
          <div className={`${styles.nftDetails} p-[15px]`}>
            <div className="flex items-start justify-between">
              <div className={styles.nftTitle}>
                The Magical Land of Auroras and Buildings
              </div>
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
                <span>@harshit</span>
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
      </div>
    </div>
  ) : null;
}

export default HallOfFlameModal;
