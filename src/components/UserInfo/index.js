import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import UserApi from "../../graphql/UserApi";
import styles from "./Userinfo.module.css";

export default function UserInfo() {
  const [queryInProgress, setQueryInProgress] = useState(false);
  const [handle, setHandle] = useState();
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      console.log("fetching profiles for ", { address });
      setQueryInProgress(true);
      UserApi.profiles({ ownedBy: address })
        .then((profilesResponse) => {
          const error = profilesResponse.error;
          if (error) {
            throw new Error(error.message);
          }

          const profiles = profilesResponse.data.profiles.items;
          if (profiles.length === 0) {
            // TODO: Create profile model.
          } else {
            let defaultProfile = profiles.filter(
              (profile) => profile.isDefault
            );
            if (defaultProfile.length === 0) {
              defaultProfile = profiles[0];
            }
            setHandle(defaultProfile.handle);
          }
        })
        .catch((error) => {
          console.error("Error while fetching profiles: ", error);
        })
        .finally(() => {
          setQueryInProgress(false);
        });
    }
  }, [address]);

  return (
    <div className={styles.container}>
      <span className={styles.nameContainer}>
        {queryInProgress ? "..." : handle}
      </span>
      <img className={styles.lens} src="/lens-logo.png" alt="lens" />
    </div>
  );
}
