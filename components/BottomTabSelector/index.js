import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../Main/TabItems";
import styles from "./BottomTabSelector.module.scss";
import { TwitterShareButton, TelegramShareButton } from "react-share";
import TwitterIcon from "./svg/TwitterIcon";
import TelegramIcon from "./svg/TelegramIcon";
import QuestionMarkIcon from "./svg/QuestionMarkIcon";
import Link from "next/link";

export default function BottomTabSelector() {
  const { currentTab, onTabChange } = useBottomTab();
  const routesMap = {
    SubmitYourOwn: "/generate-image",
    Collect: "/collect",
    Vote: "/",
  };

  return (
    <div className="grid grid-cols-5 items-center">
      <div className="flex items-center mt-[12px] md:mt-0 justify-items-start">
        <div className={`${styles.howItWorks} flex items-center justify-start cursor-pointer relative`}>
          <QuestionMarkIcon />
          <div className={`${styles.hiwText} text-[#ffffff] font-medium absolute w-[100px] left-[25px] top-0`}>How it works</div>
          <div className={styles.hiwSpace}></div>
        </div>
        <TwitterShareButton
          className={`${styles.twitterShare} cursor-pointer ml-[15px] flex`}
          url={"https://plgworks.com/"}
          title={"Sharing text goes Here"}
        >
          <span className="z-10 pl-[5px]">
            <TwitterIcon/>
          </span>
          <span className={`${styles.twitterText} pl-[5px] text-[#ffffff] font-medium`}>Share on Twitter</span>
        </TwitterShareButton>
      </div>
      <div
        className={`${styles.container} grid grid-cols-3 content-center gap-[8px] p-[8px] md:rounded-[100px] w-full col-span-3`}
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
      <div className="font-medium text-[16px] leading-[26px] text-[#ffffff99] text-end items-center">
        Made with <span className="text-[#FA5C00]">🧡</span> by PLG
      </div>
    </div>
  );
}
