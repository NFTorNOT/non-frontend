import React from "react";
import Image from "next/image";
import styles from './CollectNFT.module.scss';

function CollectNFT(props) {
  return (
    <div className="mt-[40px]">
      <div className="text-[#ffffff] font-bold text-[20px] leading-[32px]">
        Collect NFTs
      </div>
      <div className="grid grid-cols-2 gap-5 max-h-[512px] overflow-y-scroll mt-[16px]">
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
