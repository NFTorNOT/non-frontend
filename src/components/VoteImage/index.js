import styles from "./Main.module.scss";
import React, { useState } from "react";

export default function VoteImage() {
  const wordOfTheDay = "Light";
  const imageurl = "https://static.nftornot.com/img.png";
  const cross = "https://static.nftornot.com/Frame+24.png";
  const right = "https://static.nftornot.com/hot.png";
  var sectionStyle = {
    backgroundImage: `url(${imageurl})`,
  };
  const promt = "The Forgotten Prince of The Kingdom of Eternal Sunlight";
  const id = "@harshit.lens";
  const polygon = "0x34...2745";
  const ipfs = "0x34...2745";

  const [nftDetailsModal, setNftDetailsModal] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <img alt="wrong" src={cross} className={styles.bb} />
        <div className={styles.secondTab}>
          <div className={styles.yellow}>Word of the day</div>
          <center>
            <div className={styles.wordOfDay}>"{wordOfTheDay}"</div>
          </center>

          <div
            style={{
              display: "grid",
            }}
          >
            <div className={styles.generatedImagePrompts} style={sectionStyle}>
              <div className={styles.end}>
                <div className={styles.promt}>{promt}</div>
                <div className={styles.nftInfo}>
                  <div className={styles.id}>{id}</div>
                  <button
                    className={styles.nftButton}
                    onClick={() => setNftDetailsModal(true)}
                  >
                    NFT contract info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img alt="right" src={right} className={styles.bb} />
      </div>
      {nftDetailsModal && (
        <div className={styles.popup} onClick={() => setNftDetailsModal(false)}>
          <div className={styles.nftContractInfo}>
            <div className={styles.nfttext}>NFT contract information</div>

            <div className={styles.polygon}>
              <img
                src="https://static.nftornot.com/Ipfs-logo-1024-ice-text+1.png"
                alt="ipfs"
              ></img>
              <span>IPFS metadata: </span>
              <span>{ipfs}</span>
            </div>
            <div className={styles.polygon}>
              <img
                src="https://static.nftornot.com/polygon-matic-logo+2.png"
                alt="polygon"
              ></img>
              <span>Polygon transaction:</span>
              <span>{polygon}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
