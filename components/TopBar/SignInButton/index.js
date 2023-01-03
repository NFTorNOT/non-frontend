import { useRef, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useAuthContext } from "../../../context/AuthContext";
import Image from "next/image";
import AuthApi from "../../../graphql/AuthApi";
import SessionHelper from "../../../utils/SessionHelper";
import UserInfo from "../../UserInfo";
import styles from "./SignInButton.module.scss";
import WalletConnect from "./WalletConnect/WalletConnect";
import SignInModal from "../../SignInModal";
import UserApi from "../../../graphql/UserApi";
import { useUserContext } from "../../../context/UserContext";
import { axiosInstance } from "../../../AxiosInstance";
import EnableDispatcherModal from "../../EnableDispatcherModal";
import AboutLens from "../../AboutLens";
import OpenClaimedHandleModal from "../../OpenClaimedHandalModal";
import { useRouter } from "next/router";

export const SignIn = ({ onSignIn, isLoading }) => {
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
  const [open, setOpen] = useState(false);
  const { signMessageAsync } = useSignMessage();
  const { setIsUserLoggedIn } = useAuthContext();
  const userProfileRef = useRef();
  const messageText = useRef();
  const signedMessageSignature = useRef();
  const { setUserProfile, userProfile } = useUserContext();
  const accessTokenRef = useRef();
  const refreshTokenRef = useRef();
  const router = useRouter();

  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowEnableDispatcherModal, setShouldShowEnableDispatcherModal] =
    useState(false);
  const [shouldShowClaimedHandleModal, setShoouldShowClaimedHandleModal] =
    useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

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
                console.log("error signing in 1: ", error);
                setIsLoading(false);
              })
              .finally(() => {
                setIsLoading(false);
                handleClose();
              });
          })
          .catch((error) => {
            console.log("error signing in 2: ", error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log("error signing in 3: ", error);
        setIsLoading(false);
      });
  }

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
        setShoouldShowClaimedHandleModal(true);
        // createLensProfile();
      }
    } catch (error) {}
  }

  async function login() {
    let loginParams = {
      lens_profile_id: userProfileRef.current?.id,
      lens_profile_username: userProfileRef.current?.handle,
      wallet_address: address,
      signed_message: signedMessageSignature.current,
      message: messageText.current,
    };

    if (userProfileRef.current?.picture) {
      loginParams.lens_profile_image_url =
        userProfileRef.current?.picture?.original?.url;
    }

    try {
      const loginResponse = await axiosInstance.post(`/connect`, loginParams);

      if (loginResponse.data.success) {
        const resposeData = loginResponse.data.data;

        const users = resposeData.users;
        const currentUser = resposeData.current_user;
        const images = resposeData.images;

        let userDetails = Object.values(users).find((user) => {
          return user.id == currentUser.user_id;
        });
        userDetails.isFirstTimeUser = currentUser?.is_first_time_user;

        let userImage = Object.values(images)?.find((image) => {
          return image.id == userDetails.lens_profile_image_id;
        });

        console.log(typeof userDetails, userDetails);

        userDetails.imageUrl = userImage?.url ? "" : userImage?.url;
        SessionHelper.handleSessionTokens({
          accessToken: accessTokenRef.current,
          refreshToken: refreshTokenRef.current,
        });
        setUserProfile(userDetails);
        setIsUserLoggedIn(true);

        const dispatcherAddress = userProfileRef?.current?.dispatcher?.address;

        if (!dispatcherAddress) {
          setShouldShowEnableDispatcherModal(true);
        }
      }
    } catch (error) {
      console.log("error", error);
      setIsUserLoggedIn(false);
    }
  }

  console.log({ shouldShowClaimedHandleModal });

  return (
    isUserLoggedIn !== undefined && (
      <>
        {isUserLoggedIn && isConnected ? (
          <UserInfo />
        ) : (
          <>
            <WalletConnect
              openSignInModal={handleOpen}
              onSignIn={onSignIn}
              isLoading={isLoading}
            />
          </>
        )}
        {open ? (
          <SignInModal
            onSignIn={onSignIn}
            onRequestClose={handleClose}
            isOpen={open}
            onSignInComplete={handleClose}
          />
        ) : null}
        {shouldShowEnableDispatcherModal ? (
          <EnableDispatcherModal
            userProfile={userProfileRef.current}
            onClose={() => setShouldShowEnableDispatcherModal(false)}
          />
        ) : null}
        <AboutLens />
        <OpenClaimedHandleModal
          isOpen={shouldShowClaimedHandleModal}
          onRequestClose={() => {
            router.reload();
            setShoouldShowClaimedHandleModal(false);
          }}
        />
      </>
    )
  );
}
