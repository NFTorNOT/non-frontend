import GenerateNFT from "../GenerateNFT";
import NFTOfTheDay from "../NFTOfTheDay";
import VoteImage from "../VoteImage";

export const TabNames = {
  NftOfTheDay: "NftOfTheDay",
  GenerateImage: "GenerateImage",
  VoteImage: "VoteImage",
};
export const TabItems = {
  [TabNames.NftOfTheDay]: {
    id: "NFT of the day",
    tabName: "NFT of the day",
    Component: () => <NFTOfTheDay />,
  },
  [TabNames.GenerateImage]: {
    id: "Generate Image",
    tabName: "Generate Image",
    Component: () => <GenerateNFT />,
  },
  [TabNames.VoteImage]: {
    id: "Vote",
    tabName: "Vote",
    Component: () => <VoteImage />,
  },
};

export const DEFAULT_TAB = TabItems[TabNames.GenerateImage];
