import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { DEFAULT_TAB, TabItems, TabNames } from "../components/Main/TabItems";

export const BottomTabContext = React.createContext({
  currentTab: false,
  onTabChange: () => {},
});

export function useBottomTab() {
  const { currentTab, onTabChange } = useContext(BottomTabContext);

  return {
    currentTab,
    onTabChange,
  };
}

export const BottomTabProvider = ({ children }) => {
  const router = useRouter();
  if (router.pathname == "/collect") {
  }
  let tab = "";

  if (router.pathname == "/collect") {
    tab = TabItems[TabNames.NftOfTheDay];
  } else if (router.pathname == "/generate-image") {
    tab = TabItems[TabNames.GenerateImage];
  } else {
    tab = DEFAULT_TAB;
  }

  const [currentTab, setCurrentTab] = useState(tab);

  function onTabChange(tab) {
    setCurrentTab(tab);
  }
  return (
    <BottomTabContext.Provider value={{ currentTab, onTabChange }}>
      {children}
    </BottomTabContext.Provider>
  );
};
