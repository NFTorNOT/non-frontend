import NONLogo from "../NONLogo";
import SignInButton from "./SignInButton";
import styles from "./TopBar.module.scss";

export default function TopBar() {
  return (
    <div className={styles.container}>
      <NONLogo />
      <SignInButton />
    </div>
  );
}
