import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../Main/TabItems";
import styles from "./BottomTabSelector.module.scss";
import { TwitterShareButton, TelegramShareButton } from "react-share";
import TwitterIcon from './svg/TwitterIcon';
import TelegramIcon from './svg/TelegramIcon';
import QuestionMarkIcon from './svg/QuestionMarkIcon';

export default function BottomTabSelector() {
  const { currentTab, onTabChange } = useBottomTab();
  return (
    <div className='flex'>
      <div className='basis-2/12  flex items-center'>
        <QuestionMarkIcon />
        <span className='text-[16px] text-[#fff] pl-[10px]'>How does this work?</span>
      </div>
      <div className={`${styles.container} basis-8/12`}>
        {Object.values(TabItems).map((tab) => {
          const isSelected = tab.id === currentTab.id;
          return (
            <div
              key={tab.id}
              onClick={() => onTabChange(tab)}
              id={tab.id}
              className={`${styles.tabContainer} ${isSelected ? styles.selectedTab : {}
                }`}
              title={tab.tabName}
            >
              {tab.tabName}
            </div>
          );
        })}
      </div>
      <div className='basis-2/12 flex items-center justify-end gap-[20px]'>

        <TwitterShareButton
          url={'https://diffusion.quick-poc.com/outputs/000237.3249342071.png'}
          title={'Sharing text goes Here'}
        >
          <TwitterIcon />
        </TwitterShareButton>
        <TelegramShareButton
          url={'https://diffusion.quick-poc.com/outputs/000237.3249342071.png'}
          title={'Sharing text goes Here'}
        >
          <TelegramIcon />
        </TelegramShareButton>
      </div>
    </div>
  );
}
