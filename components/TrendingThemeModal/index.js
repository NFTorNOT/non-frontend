import React from "react";
import ReactModal from "react-modal";
import HowItWorksSvg from "./HowItWorksSvg";
import styles from "./TrendingTheme.module.scss";

function TrendingThemeModal({ onRequestClose, isOpen }) {
  const customStyles = {
    content: {
      background:
        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 41.15%)",
      height: "fit-content",
      width: "fit-content",
      margin: "auto",
      backdropFilter: "blur(60px)",
      borderRadius: "16px",
      borderColor: "#000000",
      padding: "0px",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.6)",
    },
  };
  return (
    <ReactModal
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      style={customStyles}
    >
      <div className={`${styles.ModalContainer}`}>
        <div className={styles.headerContainer}>
          <HowItWorksSvg />
          <div className={styles.heading}>What are Trending Themes?</div>
        </div>
        <div className={styles.details}>
          Participate in the fun by generating images based on the themes that
          are trending on our platform.
        </div>
        <div
          className={`w-full min-w-[156px] h-[40px] rounded-[40px] flex items-center justify-center z-10 cursor-pointer gap-[8px] ${styles.Buttonbg}`}
          onClick={() => {
            onRequestClose();
          }}
        >
          <div
            className={`not-italic font-bold text-[16px] leading-[160%] text-center text-[#FFFFFF] py-[7px]${styles.ButtonText}`}
          >
            Sounds good
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default TrendingThemeModal;
