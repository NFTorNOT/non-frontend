import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
import styles from "./AboutLens.module.scss";
const AboutLens = () => {
  const [shouldShowInfo, setShouldShowInfo] = useState(false);
  const { isUserLoggedIn } = useAuthContext();
  const { userProfile } = useUserContext();

  useEffect(() => {
    if (!isUserLoggedIn || userProfile?.isFirstTimeUser) {
      setShouldShowInfo(true);
      setTimeout(() => {
        setShouldShowInfo(false);
      }, 7000);
    }
    return () => {};
  }, [userProfile, isUserLoggedIn]);

  return shouldShowInfo ? (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.text}>
          Lens is a composable and decentralised social graph. Creators take
          ownership of their content wherever they go in the digital garden of
          the decentralised internet. NFTorNot game is built on Lens Protocol 🌿
        </div>
        <div className={styles.subTitle}>
          <a href="https://www.lens.xyz/" target="_blank" rel="noreferrer">
            Learn more
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default AboutLens;
