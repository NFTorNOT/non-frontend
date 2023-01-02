import Modal from "react-modal";
import React from "react";
import styles from "./openClaimedHandle.module.scss";
import LensIcon from "../LensIcon";
const OpenClaimedHandleModal = ({ onRequestClose, isOpen }) => {
  const customModalStyles = {
    content: {
      background: "rgba(0, 0, 0, 0.8)",
      height: "fit-content",
      width: "fit-content",
      margin: "auto",
      backdropFilter: "blur(60px)",
      borderRadius: "16px",
      padding: "0px",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.6)",
    },
  };
  return (
    <Modal
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      style={customModalStyles}
    >
      <div className={`${styles.ModalContainer}`}>
        <div>
          <p className={styles.header}>Unable to sign-in</p>
          <p className={`${styles.claimText}`}>
            You do not have a lenster account. Claim your handle on lens to log
            into NFTorNot.
          </p>
          <div
            className={`flex ml-[10px] text-center align-center justify-center box-border items-center w-[214px] h-[40px] bg-[#ABFE2C] text-[#00501E] backdrop-blur rounded-[4px] gap-[8px] cursor-pointer border-[1px] border-solid border-black/20`}
            onClick={() => {
              window.open("https://claim.lens.xyz/", "_blank");
              onRequestClose();
            }}
          >
            <LensIcon />
            <p>Claim your handle</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OpenClaimedHandleModal;
