import React, { useContext, useState } from "react";
import { DEFAULT_TAB } from "../components/Main/TabItems";

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
  const [currentTab, setCurrentTab] = useState(DEFAULT_TAB);

  function onTabChange(tab) {
    setCurrentTab(tab);
  }
  return (
    <BottomTabContext.Provider value={{ currentTab, onTabChange }}>
      {children}
    </BottomTabContext.Provider>
  );
};
