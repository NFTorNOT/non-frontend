import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useUserContext } from "../../context/UserContext";
import UserApi from "../../graphql/UserApi";
import LensHelper from "../../utils/LensHelper";
import styles from "./Userinfo.module.scss";

export default function UserInfo() {
  const [queryInProgress, setQueryInProgress] = useState(false);
  const { userProfile, setUserProfile } = useUserContext();
  const { address } = useAccount();

  async function createLensProfile() {
    let handle = prompt("Enter your handle to create Lens profile");
    if (handle == null || handle == "") {
      // user didn't enter anything in the prompt
    } else {
      try {
        const lensProfileResonse = await UserApi.createProfile({
          handle: handle,
        });

        if (lensProfileResonse.data.createProfile) {
          let txHash = lensProfileResonse.data.createProfile.txHash;

          console.log({ txHash });

          const indexedResult = await LensHelper.pollUntilIndexed({
            txHash,
          });
        }
      } catch (error) {
        console.log({ "create Profile Error": error });
      }
    }
  }

  async function defaultProfile() {
    try {
      const defaultProfileResponse = await UserApi.defaultProfile({
        walletAddress: address,
      });

      const defaultProfile = defaultProfileResponse?.data?.defaultProfile;

      console.log({ defaultProfile });

      if (defaultProfile) {
        setUserProfile(defaultProfile);
      } else {
        createLensProfile();
      }
      setQueryInProgress(false);
    } catch (error) {
      //TODO:handle error
    }
  }

  useEffect(() => {
    if (address) {
      setQueryInProgress(true);

      defaultProfile();
    }
  }, [address]);

  return (
    <div className={styles.container}>
      <span className={styles.nameContainer}>
        {queryInProgress ? "..." : userProfile.handle} User Name
      </span>
      <img className={styles.lens} src="/lens-logo.png" alt="lens" />
    </div>
  );
}
