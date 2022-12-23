import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./SubmitForVoteModal.module.scss";
import Collect from "./svg/Collect";
import MessageCircle from "./svg/MessageCircle";
import Wallet from "./svg/Wallet";

function SubmitForVoteModal({
  visible,
  setsubmitToVoteModal,
  clickHandler,
  submitToVoteApiInProgress,
}) {
  const infoMap = [
    {
      svgIcon: <MessageCircle />,
      desc: "When you submit your NFT generation, a post is made on Lenster",
    },
    {
      svgIcon: <Collect />,
      desc: "People can collect your NFT on NFT or Not and Lenster",
    },
    {
      svgIcon: <Collect />,
      desc: "Proceeds from all collects will go to your wallet",
    },
  ];
  if (!visible) {
    return null;
  }
  return (
    <div className={styles.popup}>
      <div
        className={`${styles.submitForVoteInfo} py-[40px] px-[30px] relative`}
      >
        <div
          className="absolute top-[20px] right-[10px] text-[#fff] text-[16px] cursor-pointer"
          onClick={() => setsubmitToVoteModal(false)}
        >
          Close
        </div>
        <div className="text-[#fff] font-bold text-[20px] leading-[32px]">
          Submit your generations
        </div>
        {infoMap.map((item, index) => (
          <div className="" key={index}>
            {item.svgIcon}
            <div className="text-[#fff] text-[16px]">{item.desc}</div>
          </div>
        ))}
        {submitToVoteApiInProgress ? (
          <ClipLoader color={"#fff"} loading={true} size={15} />
        ) : (
          <button
            className={`${styles.submitVote}`}
            onClick={() => clickHandler()}
          >
            + Submit for voting{" "}
          </button>
        )}
      </div>
    </div>
  );
}

export default SubmitForVoteModal;
