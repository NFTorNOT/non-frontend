import { useEffect, useRef, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useAuthContext } from "../../../context/AuthContext";
import Image from "next/image";
import AuthApi from "../../../graphql/AuthApi";
import SessionHelper from "../../../utils/SessionHelper";
import UserInfo from "../../UserInfo";
import styles from "./SignInButton.module.scss";
import WalletConnect from "./WalletConnect/WalletConnect";
import SignInModal from "../../SignInModal";
import { useSignInModalContext } from "../../../context/SignInModalContext";
import axios from "axios";
import UserApi from "../../../graphql/UserApi";
import { useUserContext } from "../../../context/UserContext";

export const SignIn = ({ onSignInComplete }) => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { signMessageAsync } = useSignMessage();
  const { setIsUserLoggedIn } = useAuthContext();
  const { isSignInProcess } = useSignInModalContext();
  const userProfileRef = useRef();
  const messageText = useRef();
  const signedMessageSignature = useRef();
  const { setUserProfile } = useUserContext();
  const accessTokenRef = useRef();
  const refreshTokenRef = useRef();

  console.log({ isSignInProcess });

  useEffect(() => {
    if (isSignInProcess) {
      console.log("how many times");
      onSignIn();
    }
  }, []);

  async function getDefaultProfile() {
    try {
      const defaultProfileResponse = await UserApi.defaultProfile({
        walletAddress: address,
      });

      const defaultProfile = defaultProfileResponse?.data?.defaultProfile;
      userProfileRef.current = defaultProfile;

      if (defaultProfile) {
        login();
      } else {
        // createLensProfile();
      }
    } catch (error) {}
  }

  async function login() {
    try {
      const loginResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/connect`,

        {
          lens_profile_id: userProfileRef.current?.id,
          lens_profile_username: userProfileRef.current?.handle,
          lens_profile_image_url: userProfileRef.current?.picture,
          wallet_address: address,
          signed_message: signedMessageSignature.current,
          message: messageText.current,
        }
      );

      console.log({ loginResponse });

      if (loginResponse.data.success) {
        document.cookie = "keyofcookie=valueofcookie";
        const resposeData = loginResponse.data.data;
        console.log("here", { resposeData });
        const users = resposeData.users;
        const currentUser = resposeData.current_user;
        const images = resposeData.images;

        let userDetails = Object.values(users).find((user) => {
          return user.id == currentUser.user_id;
        });

        let userImage = Object.values(images)?.find((image) => {
          return image.id == userDetails.lens_profile_image_id;
        });

        console.log(typeof userDetails, userDetails);

        userDetails.imageUrl = userImage?.url ? "" : userImage?.url;
        SessionHelper.handleSessionTokens({
          accessToken: accessTokenRef.current,
          refreshToken: refreshTokenRef.current,
        });

        console.log({ userDetails });
        setUserProfile(userDetails);
        setIsUserLoggedIn(true);
      }
    } catch (error) {
      console.log("error", error);
      setIsUserLoggedIn(false);
    }
  }
  async function onSignIn() {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    AuthApi.queryChallengeText({ address })
      .then((challengeApiResponse) => {
        if (challengeApiResponse.error) {
          throw new Error(challengeApiResponse.error.message);
        }
        const text = challengeApiResponse.data.challenge.text;
        messageText.current = text;
        signMessageAsync({ message: text })
          .then((signature) => {
            signedMessageSignature.current = signature;
            AuthApi.verifySignature({
              signature,
              address,
            })
              .then((verifyResponse) => {
                const { accessToken, refreshToken } =
                  verifyResponse.data.authenticate;
                accessTokenRef.current = accessToken;
                refreshTokenRef.current = refreshToken;
                getDefaultProfile();
              })
              .catch((error) => {
                console.log("error signing in: ", error);
                setIsLoading(false);
              })
              .finally(() => {
                setIsLoading(false);
                onSignInComplete?.();
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
      className={`${styles.btnContainer} btn btn-green px-[10px] md:px-[20px] transition`}
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
  const { setIsSignInProcess } = useSignInModalContext();
  const { isConnected } = useAccount();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setIsSignInProcess(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setIsSignInProcess(true);
  };

  console.log({ isConnected, isUserLoggedIn });

  return (
    isUserLoggedIn !== undefined && (
      <>
        {isUserLoggedIn && isConnected ? (
          <UserInfo />
        ) : (
          <>
            {isConnected ? (
              <SignIn />
            ) : (
              <WalletConnect openSignInModal={handleOpen} />
            )}
          </>
        )}
        <SignInModal
          onRequestClose={handleClose}
          isOpen={open}
          onSignInComplete={handleClose}
        />
      </>
    )
  );
}
