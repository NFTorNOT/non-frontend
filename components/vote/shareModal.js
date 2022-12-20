import React from "react";
import styles from "./shareModal.module.scss";
import TwitterIcon from "../BottomTabSelector/svg/TwitterIcon";
import TelegramIcon from "../BottomTabSelector/svg/TelegramIcon";

function ShareModal({ visible, onClose }) {
  if (!visible) {
    return null;
  }
  return (
    <div className={`${styles.popup}`}>
      <div className="cursor-default relative">
        <div className="absolute top-[5px] right-[5px] cursor-pointer" onClick={onClose}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.18671 7.00015L13.4367 1.75849C13.5936 1.60157 13.6818 1.38874 13.6818 1.16682C13.6818 0.944903 13.5936 0.732074 13.4367 0.575155C13.2798 0.418235 13.067 0.330078 12.845 0.330078C12.6231 0.330078 12.4103 0.418235 12.2534 0.575155L7.01171 5.82515L1.77004 0.575155C1.61312 0.418235 1.40029 0.330078 1.17838 0.330078C0.956457 0.330078 0.743628 0.418235 0.586709 0.575155C0.429789 0.732074 0.341632 0.944903 0.341632 1.16682C0.341632 1.38874 0.429789 1.60157 0.586709 1.75849L5.83671 7.00015L0.586709 12.2418C0.508602 12.3193 0.446606 12.4115 0.404299 12.513C0.361992 12.6146 0.34021 12.7235 0.34021 12.8335C0.34021 12.9435 0.361992 13.0524 0.404299 13.154C0.446606 13.2555 0.508602 13.3477 0.586709 13.4252C0.664178 13.5033 0.756345 13.5653 0.857895 13.6076C0.959444 13.6499 1.06837 13.6717 1.17838 13.6717C1.28839 13.6717 1.39731 13.6499 1.49886 13.6076C1.60041 13.5653 1.69257 13.5033 1.77004 13.4252L7.01171 8.17515L12.2534 13.4252C12.3308 13.5033 12.423 13.5653 12.5246 13.6076C12.6261 13.6499 12.735 13.6717 12.845 13.6717C12.9551 13.6717 13.064 13.6499 13.1655 13.6076C13.2671 13.5653 13.3592 13.5033 13.4367 13.4252C13.5148 13.3477 13.5768 13.2555 13.6191 13.154C13.6614 13.0524 13.6832 12.9435 13.6832 12.8335C13.6832 12.7235 13.6614 12.6146 13.6191 12.513C13.5768 12.4115 13.5148 12.3193 13.4367 12.2418L8.18671 7.00015Z"
              fill="white"
            />
          </svg>
        </div>
        <ul className="text-[#ffffff99] bg-[#00000099] pl-[16px] py-[19px] rounded-[8px] min-w-[160px] text-[16px] font-medium">
          <li className="mb-[20px] flex items-center cursor-pointer">
            <span>
              <TwitterIcon />
            </span>
            <span className="pl-[6px]">Facebook</span>
          </li>
          <li className="flex items-center cursor-pointer">
            <span>
              <TelegramIcon />
            </span>
            <span className="pl-[6px]">Telegram</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ShareModal;
