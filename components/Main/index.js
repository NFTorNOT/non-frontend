import { useBottomTab } from "../../context/BottomTabContext";

export default function Main() {
  const { currentTab } = useBottomTab();
  const { Component } = currentTab;
  return (
    <Component />
  );
}
