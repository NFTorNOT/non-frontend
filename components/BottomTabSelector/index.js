import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../Main/TabItems";
import styles from "./BottomTabSelector.module.scss";
import { TwitterShareButton } from "react-share";
import TwitterIcon from "./svg/TwitterIcon";
import QuestionMarkIcon from "./svg/QuestionMarkIcon";
import Link from "next/link";
import { axiosInstance } from "../../AxiosInstance";
import { useEffect, useState } from "react";
import { useCollectedNFTModalContext } from "../../context/CollectedNFTModalContext";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";

export default function BottomTabSelector() {
  const { currentTab, onTabChange } = useBottomTab();
  const routesMap = {
    SubmitYourOwn: "/generate-image",
    Collect: "/collect",
    Vote: "/",
  };
  const { isUpvoted } = useCollectedNFTModalContext();
  const [recentlyCollectedNFTS, setRecentCollectedNFTS] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const { isUserLoggedIn } = useAuthContext();

  const handlePLGClick = () => {
    const plgURL = "https://plgworks.com/";
    window.open(plgURL, "_blank");
  };

  const handleHowItWorks = () => {
    const plgURL =
      "https://www.notion.so/plgworks/NFT-or-Not-61e944ba261f49a2805c73468c92a43a";
    window.open(plgURL, "_blank");
  };

  async function fetchRecentUpVotedNFTS() {
    if (!isUserLoggedIn) {
      return;
    }
    try {
      setIsLoading(true);
      const recentUpvotedNFTSResponse = await axiosInstance.get(
        `/recent-upvoted-nfts`
      );
      const recentUpvotedNFTSData = recentUpvotedNFTSResponse.data.data;
      if (!recentUpvotedNFTSData) {
        return;
      }
      const recentUpvotedLensPostIdsArr = recentUpvotedNFTSData.lens_posts_ids;
      const recentUpvotedLensPostsMap = recentUpvotedNFTSData.lens_posts;
      const recentUpvotedLensPostImagesMap = recentUpvotedNFTSData.images;
      const recentUpvotedLensPostDetails = [];

      for (let cnt = 0; cnt < recentUpvotedLensPostIdsArr.length; cnt++) {
        const lensPost =
          recentUpvotedLensPostsMap[recentUpvotedLensPostIdsArr[cnt]];

        if (!lensPost) {
          continue;
        }

        let imageId = lensPost.image_id;
        let imageObj =
          recentUpvotedLensPostImagesMap &&
          recentUpvotedLensPostImagesMap[imageId];

        recentUpvotedLensPostDetails.push({
          url: imageObj.url,
        });
      }

      setRecentCollectedNFTS(recentUpvotedLensPostDetails.reverse());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  const { route } = useRouter();
  console.log({ route });

  useEffect(() => {
    setTimeout(() => {
      fetchRecentUpVotedNFTS();
    }, 1000);
  }, [isUpvoted]);
  return (
    <>
      {route == "/collect" ? (
        <div className={styles.bottomContainer}></div>
      ) : null}
      <div className={`${styles.background} grid grid-cols-5 items-center`}>
        <div className="flex items-center mt-[12px] md:mt-0 justify-items-start">
          <div
            className={`${styles.howItWorks} flex items-center justify-start cursor-pointer relative`}
          >
            <QuestionMarkIcon />
            <button
              onClick={handleHowItWorks}
              className={`${styles.hiwText} text-[#ffffff] font-medium absolute w-[100px] left-[25px] top-0`}
            >
              How it works
            </button>
            <div className={styles.hiwSpace}></div>
          </div>
          <TwitterShareButton
            className={`${styles.twitterShare} cursor-pointer ml-[15px] flex`}
            url={"https://plgworks.com/"}
            title={"Sharing text goes Here"}
          >
            <span className="z-10 pl-[5px]">
              <TwitterIcon />
            </span>
            <span
              className={`${styles.twitterText} pl-[5px] text-[#ffffff] font-medium`}
            >
              Share on Twitter
            </span>
          </TwitterShareButton>
        </div>
        <div
          className={`${styles.container} grid grid-cols-3 content-center gap-[8px] p-[8px] md:rounded-[100px] w-full col-span-3 relative z-10`}
        >
          {Object.values(TabItems).map((tab) => {
            const isSelected = tab.id === currentTab.id;
            const tabId = tab.id;
            return (
              <Link href={routesMap[tabId]} key={tab.id}>
                <div
                  key={tab.id}
                  onClick={() => onTabChange(tab)}
                  id={tab.id}
                  className={`${styles.tabContainer} ${
                    isSelected ? styles.selectedTab : {}
                  }`}
                  title={tab.tabName}
                >
                  {tab.tabName}
                </div>
              </Link>
            );
          })}
        </div>

        <div className={`${styles.collectedNfts}`}>
          {recentlyCollectedNFTS.length > 0 &&
            currentTab.tabName == "Vote" &&
            recentlyCollectedNFTS.map((ele, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${ele.url})`,
                  }}
                  className="collectedNft absolute left-[24%] top-[85%] w-[200px] h-[200px] rounded-[10px]"
                ></div>
              );
            })}
        </div>

        <button
          className="font-medium text-[16px] leading-[26px] text-[#ffffff99] text-end items-center"
          onClick={handlePLGClick}
        >
          Made with <span className="text-[#FA5C00]">🧡</span> by PLG
        </button>
      </div>
    </>
  );
}
