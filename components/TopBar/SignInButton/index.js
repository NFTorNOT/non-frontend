import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useAuthContext } from "../../../context/AuthContext";
import Image from "next/image";
import AuthApi from "../../../graphql/AuthApi";
import SessionHelper from "../../../utils/SessionHelper";
import UserInfo from "../../UserInfo";
import styles from "./SignInButton.module.scss";
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
                SessionHelper.handleSessionTokens({
                  accessToken,
                  refreshToken,
                });
              })
              .catch((error) => {
                console.log("error signing in: ", error);
                setIsLoading(false);
              })
              .finally(() => {
                setIsLoading(false);
              });
          })
          .catch((error) => {
            console.log("error signing in: ", error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log("error signing in: ", error);
        setIsLoading(false);
      });
  }
  return (
    <div
      className={`${styles.btnContainer} rounded-full btn btn-green p-[10px] transition`}
    >
      {isLoading ? (
        <span>Signing in...</span>
      ) : (
        <>
          <Image
            src="https://static.plgworks.com/assets/images/non/lens-icon.png"
            alt="Lens Icon"
            width="20"
            height="20"
          />
          <button onClick={onSignIn}>Sign in with lens</button>
        </>
      )}
    </div>
  );
};
export default function SignInButton() {
  const { isUserLoggedIn } = useAuthContext();
  const { isConnected } = useAccount();

  return (
    isUserLoggedIn !== undefined && (
      <>
        {isUserLoggedIn && isConnected ? (
          <UserInfo />
        ) : (
          <>{isConnected ? <SignIn /> : <WalletConnect />}</>
        )}
      </>
    )
  );
}
