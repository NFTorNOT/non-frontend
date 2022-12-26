import React from "react";
import styles from "./logout.module.scss";
import Logout from "./svg/logout";
import SessionHelper from "../../utils/SessionHelper";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";

function LogoutModal({ shown, close }) {
  const { setIsUserLoggedIn } = useAuthContext();
  const router = useRouter();
  const logout = async () => {
    try {
      // const logoutResponse = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`
      // );
      // if (logoutResponse.data.success) {
      SessionHelper.clearSession();
      setIsUserLoggedIn(false);
      router.reload();
      // }
    } catch (error) {
      // console.log("error in logout", error);
    }
  };
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
          <div
            className="flex items-center cursor-pointer px-[10px] py-[6px] hover:bg-[#000000b3]"
            onClick={() => {
              logout();
            }}
          >
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
