import styles from "./NONLogo.module.css";

export default function NONLogo() {
  return (
    <div className={styles.container}>
      <span className={styles.NFT}>NFT</span>
      &nbsp;
      <div className={styles.orContainer}><span className={styles.or}>or</span></div>
      &nbsp;
      <span className={styles.Not}>Not</span>
    </div>
  );
}
