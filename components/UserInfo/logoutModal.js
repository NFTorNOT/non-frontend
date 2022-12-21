import React, { useEffect } from "react";
import styles from "./logout.module.scss";
import Logout from "./svg/logout";
import SessionHelper from "../../utils/SessionHelper";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";

function LogoutModal({ shown, close }) {
  const { setIsUserLoggedIn, isUserLoggedIn } = useAuthContext();
  const router = useRouter();
  const logout = () => {
    console.log("helper check");
    SessionHelper.clearSession();
    setIsUserLoggedIn(false);
    router.reload();
  }
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
          <div className="flex items-center cursor-pointer" onClick={() => {logout()}}>
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
