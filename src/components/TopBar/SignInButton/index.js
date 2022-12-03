import { useCallback, useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useAuthContext } from "../../../context/AuthContext";
import AuthApi from "../../../graphql/AuthApi";
import UserApi from "../../../graphql/UserApi";
import { Constants } from "../../../utils/Constants";
import UserInfo from "../../UserInfo";
import styles from "./SignInButton.module.css";
import WalletConnect from "./WalletConnect/WalletConnect";

const SignIn = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { signMessageAsync } = useSignMessage();
  const { setIsUserLoggedIn } = useAuthContext();
  async function onSignIn() {
    setIsLoading(true);
    AuthApi.queryChallengeText({ address })
      .then((challengeApiResponse) => {
        if (challengeApiResponse.error) {
          throw new Error(challengeApiResponse.error.message);
        }
        const text = challengeApiResponse.data.challenge.text;
        signMessageAsync({ message: text })
          .then((signature) => {
            AuthApi.verifySignature({
              signature,
              address,
            })
              .then((verifyResponse) => {
                const { accessToken, refreshToken } =
                  verifyResponse.data.authenticate;
                setIsUserLoggedIn(true);
                sessionStorage.setItem(
                  Constants.SESSION_STORAGE_ACCESS_TOKEN_KEY,
                  accessToken
                );
                sessionStorage.setItem(
                  Constants.SESSION_STORAGE_REFRESH_TOKEN_KEY,
                  refreshToken
                );
              })
              .catch((error) => {
                console.error("error signing in: ", error);
                setIsLoading(false);
              })
              .finally(() => {
                setIsLoading(false);
              });
          })
          .catch((error) => {
            console.error("error signing in: ", error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("error signing in: ", error);
        setIsLoading(false);
      });
  }
  return (
    <div className={styles.btnContainer}>
      {isLoading ? (
        <span>Signing in...</span>
      ) : (
        <>
          <img
            className={styles.lensRoot}
            src="/lens-root.png"
            alt="lens-root"
          />
          <button onClick={onSignIn}>Sign in with lens</button>
        </>
      )}
    </div>
  );
};
export default function SignInButton() {
  const {isUserLoggedIn} = useAuthContext()
  const { isConnected } = useAccount();

  return (
    <div>
      {isUserLoggedIn ? (
        <UserInfo />
      ) : (
        <div className={styles.container}>
          {isConnected ? <SignIn /> : <WalletConnect />}
        </div>
      )}
    </div>
  );
}
