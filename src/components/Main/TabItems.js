import GenerateNFT from "../GenerateNFT";
import NFTOfTheDay from "../NFTOfTheDay";
import VoteImage from "../VoteImage";

export const TabItems = [
  {
    id: "NFT of the day",
    tabName: "NFT of the day",
    Component: () => <NFTOfTheDay />,
  },
  {
    id: "Generate Image",
    tabName: "Generate Image",
    Component:() =>  <GenerateNFT />,
  },
  {
    id: "Vote",
    tabName: "Vote",
    Component: () => <VoteImage />,
  },
];

export const DEFAULT_TAB = TabItems[0];
