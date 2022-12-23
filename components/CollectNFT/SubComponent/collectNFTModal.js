import React from "react";
import styles from "./collectModal.module.scss";
import Collect from "./SVG/collect";
import Close from "./SVG/close";
import Image from "next/image";

function CollectNFTModal({ shown, close }) {
  return shown ? (
    <div
      className={styles.modalBackdrop}
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        className={`${styles.modalContent} relative`}
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span>
              <Collect />
            </span>
            <span className="ml-[8px] font-bold text-[16px] leading-[26px] text-[#ffffff]">
              Fee Collect
            </span>
          </div>
          <button onClick={close}>
            <Close />
          </button>
        </div>
        <div className={`${styles.nftTitle} mt-[8px]`}>
          The Forgotten Prince of The Kingdom of Eternal Sunlight
        </div>
        <div className={`${styles.nftOwner} mt-[8px]`}>
          Proceeds from the Collect will go to{" "}
          <span className="text-[#ffffff]">@harshit</span>
        </div>
        <div className={`${styles.nftFee} mt-[14px] flex items-center`}>
          <span>
            <Image
              src="https://static.plgworks.com/assets/images/non/wmatic-icon.png"
              alt="Lens Icon"
              width="26"
              height="26"
            />
          </span>
          <span className="ml-[8px]">1 WMATIC</span>
        </div>
        <div className={`${styles.collectorCount} flex items-center`}>
          <span>
            <Image
              src="https://static.plgworks.com/assets/images/non/collectors.png"
              alt="Lens Icon"
              width="26"
              height="26"
            />
          </span>
          <span className="ml-[12px]">2 Collectors</span>
        </div>
        <button className={`${styles.collectButton} flex items-center justify-center py-[7px] mt-[20px]`}>
            <span>
                <Collect />
            </span>
            <span className="pl-[11px]">Collect Now</span>
        </button>
      </div>
    </div>
  ) : null;
}

export default CollectNFTModal;
