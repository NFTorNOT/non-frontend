import { useBottomTab } from "../../context/BottomTabContext";
import BottomTabSelector from "../BottomTabSelector";
import TopBar from "../TopBar";
import styles from "./Main.module.scss";

export default function Main() {
  const { currentTab } = useBottomTab();
  const { Component } = currentTab;
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <TopBar />
        <Component />
        <BottomTabSelector />
      </div>
    </div>
  );
}
