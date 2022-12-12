import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useUserContext } from "../../context/UserContext";
import UserApi from "../../graphql/UserApi";
import styles from "./Userinfo.module.scss";

export default function UserInfo() {
  const [queryInProgress, setQueryInProgress] = useState(false);
  const { userProfile, setUserProfile } = useUserContext();
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setQueryInProgress(true);

      UserApi.defaultProfile({ walletAddress: address })
        .then((profilesResponse) => {
          const error = profilesResponse.error;
          if (error) {
            throw new Error(error.message);
          }

          console.log({ res: profilesResponse.data });

          if (profilesResponse.data.defaultProfile) {
            setUserProfile(profilesResponse.data.defaultProfile);
          } else {
            //TODO:create a profile
          }
        })
        .catch((error) => {
          console.log("Error while fetching profiles: ", error);
        })
        .finally(() => {
          setQueryInProgress(false);
        });
    }
  }, [address]);

  return (
    <div className={styles.container}>
      <span className={styles.nameContainer}>
        {queryInProgress ? "..." : userProfile.handle}
      </span>
      <img className={styles.lens} src="/lens-logo.png" alt="lens" />
    </div>
  );
}
