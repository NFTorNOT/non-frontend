import React, { useState } from "react";
import Image from "next/image";
import styles from "./CollectNFT.module.scss";
import CollectNFTModal from "./collectNFTModal";
import Collect from "./SVG/collect";

function CollectNFT(props) {
  const [modalShown, toggleModal] = useState(false);

  const url = "https://static.plgworks.com/assets/images/hon/vespa.jpg";
  return (
    <div className={`${styles.collectNft} mt-[40px] grid min-h-0`}>
      <div className="text-[#ffffff] font-bold text-[20px] leading-[32px]">
        Collect NFTs
      </div>
      <div className="grid grid-cols-2 gap-5 max-h-[512px] overflow-y-scroll mt-[16px]">
        <div className="rounded-[12px] relative">
          <img src={url} alt="Lens Icon" />
          <div className={`${styles.nftDetails} p-[15px]`}>
            <div className="flex items-start justify-between">
              <span className={`${styles.nftTitle}`}>
                The Forgotten Prince of The Kingdom of Eternal Sunlight
              </span>
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
              onClick={() => {
                toggleModal(!modalShown);
              }}
            >
              <span>
                <Collect />
              </span>
              <span className="font-bold text-[16px] leading-[26px] ml-[8px]">
                Collect Now
              </span>
            </button>
            <CollectNFTModal
              shown={modalShown}
              close={() => {
                toggleModal(false);
              }}
            />
          </div>
        </div>
        <div className="rounded-[12px]">
          <img src={url} alt="Lens Icon" />
        </div>
        <div className={styles.emptyImageCell}>
          <Image
            src="https://static.plgworks.com/assets/images/non/generate-default.png"
            alt="Lens Icon"
            width="60"
            height="60"
          />
        </div>
        <div className={styles.emptyImageCell}>
          <Image
            src="https://static.plgworks.com/assets/images/non/generate-default.png"
            alt="Lens Icon"
            width="60"
            height="60"
          />
        </div>
        <div className={styles.emptyImageCell}>
          <Image
            src="https://static.plgworks.com/assets/images/non/generate-default.png"
            alt="Lens Icon"
            width="60"
            height="60"
          />
        </div>
        <div className={styles.emptyImageCell}>
          <Image
            src="https://static.plgworks.com/assets/images/non/generate-default.png"
            alt="Lens Icon"
            width="60"
            height="60"
          />
        </div>
        <div className={styles.emptyImageCell}>
          <Image
            src="https://static.plgworks.com/assets/images/non/generate-default.png"
            alt="Lens Icon"
            width="60"
            height="60"
          />
        </div>
        <div className={styles.emptyImageCell}>
          <Image
            src="https://static.plgworks.com/assets/images/non/generate-default.png"
            alt="Lens Icon"
            width="60"
            height="60"
          />
        </div>
      </div>
    </div>
  );
}

export default CollectNFT;
