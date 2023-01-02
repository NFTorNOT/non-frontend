import React from "react";
import styles from "./Collect.module.scss";
import HallOfFlame from "./SubComponent/hallOfFlame";
import CollectNFT from "./SubComponent/CollectNFT";

export default function NFTOfTheDay() {
  return (
    <>
      <div className={`container ${styles.collectionsContainer} `}>
        <HallOfFlame />
        <CollectNFT />
      </div>
    </>
  );
}
