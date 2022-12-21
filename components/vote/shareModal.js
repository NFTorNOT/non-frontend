import React from "react";
import styles from "./shareModal.module.scss";
import { TwitterShareButton, TelegramShareButton } from "react-share";
import TwitterIcon from "../BottomTabSelector/svg/TwitterIcon";
import TelegramIcon from "../BottomTabSelector/svg/TelegramIcon";

function ShareModal({ visible, onClose }) {
  if (!visible) {
    return null;
  }
  return (
    <div className={`${styles.modalBackdrop}`} onClick={onClose}>
      <div className={`${styles.popup}`}>
        <div className="cursor-default relative">
          <div className="text-[#ffffff99] bg-[#00000099] pl-[16px] py-[19px] rounded-[8px] min-w-[160px] text-[16px] font-medium">
            <TwitterShareButton
              className="mb-[20px] flex cursor-pointer"
              url={"https://plgworks.com/"}
              title={"Sharing text goes Here"}
            >
              <div className="flex items-center">
                <div>
                  <TwitterIcon />
                </div>
                <div className="pl-[6px]">Twitter</div>
              </div>
            </TwitterShareButton>
            <TelegramShareButton
              className="flex items-center cursor-pointer"
              url={"https://plgworks.com/"}
              title={"Sharing text goes Here"}
            >
              <div>
                <TelegramIcon />
              </div>
              <div className="pl-[6px]">Telegram</div>
            </TelegramShareButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
