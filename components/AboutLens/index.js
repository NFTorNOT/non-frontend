import React, { useEffect, useState } from "react";
import styles from "./AboutLens.module.scss";
const AboutLens = () => {
  const [shouldShowInfo, setShouldShowInfo] = useState(false);

  console.log({});

  useEffect(() => {
    const shouldShowOnBoarding = !!localStorage.getItem("shouldShowOnBoarding");

    if (!shouldShowOnBoarding) {
      setShouldShowInfo(true);
      setTimeout(() => {
        localStorage.setItem("shouldShowOnBoarding", false);
        setShouldShowInfo(false);
      }, 7000);
    }
    return () => {};
  }, []);

  return shouldShowInfo ? (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.text}>
          Lens is a composable and decentralised social graph. Creators take
          ownership of their content wherever they go in the digital garden of
          the decentralised internet. NFTorNot game is built on Lens Protocol 🌿
        </div>
        <div className={styles.subTitle}>
          <a href="" target="_blank">
            Learn more
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default AboutLens;
