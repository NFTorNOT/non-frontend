import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { DEFAULT_TAB, TabNames } from "../components/Main/TabItems";

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
  console.log({ router });
  const [currentTab, setCurrentTab] = useState(
    router.pathname == "/collect" ? TabNames.NftOfTheDay : DEFAULT_TAB
  );

  function onTabChange(tab) {
    setCurrentTab(tab);
  }
  return (
    <BottomTabContext.Provider value={{ currentTab, onTabChange }}>
      {children}
    </BottomTabContext.Provider>
  );
};
