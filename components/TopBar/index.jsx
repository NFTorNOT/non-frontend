import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
import NONLogo from "../NONLogo";
import SignInButton from "./SignInButton";
import ToastIcon from "./ToastIcon";
import styles from "./TopBar.module.scss";

export const notify = ({ text }) =>
  toast.custom((t) => (
    <div
      className={`${t.visible ? "animate-enter" : "animate-leave"} ${
        styles.toastContainer
      } max-w-md bg-white shadow-lg rounded-[16px] pointer-events-auto flex justify-center items-center ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 p-4 ">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0 pt-0.5">
            <ToastIcon />
          </div>
          <p className={styles.toastText}>{text}</p>
        </div>
      </div>
    </div>
  ));

export default function TopBar() {
  const { isUserLoggedIn } = useAuthContext();
  const { userProfile } = useUserContext();

  useEffect(() => {
    if (isUserLoggedIn && Object.values(userProfile).length > 0) {
      notify({ text: "You’re on the Lens Testnet" });
    }

    return () => {};
  }, [isUserLoggedIn]);

  return (
    <div className={styles.container}>
      <NONLogo />
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 4000 }}
        />
      </div>

      <SignInButton />
    </div>
  );
}
