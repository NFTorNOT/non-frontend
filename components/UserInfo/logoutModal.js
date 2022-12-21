import React from "react";
import styles from "./logout.module.scss";
import Logout from "./svg/logout";

function LogoutModal({ shown, close }) {
  return shown ? (
    <div
      className={styles.modalBackdrop}
      onClick={() => {
        close();
      }}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="py-[16px] px-[15px]">
          <div className="flex items-center cursor-pointer">
            <span>
              <Logout />
            </span>
            <span className="text-[16px] leading-[26px] font-medium text-[#ffffff] pl-[8px]">
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default LogoutModal;
