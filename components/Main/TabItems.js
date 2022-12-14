import GenerateNFT from "../GenerateNFT";
import NFTOfTheDay from "../../pages/collect";
import VoteImage from "../../pages/vote";

export const TabNames = {
  NftOfTheDay: "NftOfTheDay",
  GenerateImage: "GenerateImage",
  VoteImage: "VoteImage",
};
export const TabItems = {
  [TabNames.NftOfTheDay]: {
    id: "Collect",
    tabName: "Collect 🔥 NFT’s",
    Component: () => <NFTOfTheDay />,
  },
  [TabNames.GenerateImage]: {
    id: "SubmitYourOwn",
    tabName: "Submit Your Own",
    Component: () => <GenerateNFT />,
  },
  [TabNames.VoteImage]: {
    id: "Vote",
    tabName: "Vote",
    Component: () => <VoteImage />,
  },
};

export const DEFAULT_TAB = TabItems[TabNames.GenerateImage];
