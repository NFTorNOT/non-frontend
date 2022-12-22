import React from "react";
import styles from "./logout.module.scss";
import Logout from "./svg/logout";
import SessionHelper from "../../utils/SessionHelper";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";

function LogoutModal({ shown, close }) {
  const { setIsUserLoggedIn } = useAuthContext();
  const router = useRouter();
  const logout = () => {
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
        <div className="py-[10px] px-[5px]">
          <div className="flex items-center cursor-pointer px-[10px] py-[6px] hover:bg-[#000000b3]" onClick={() => {logout()}}>
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
