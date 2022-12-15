import { Constants } from "../../../utils/Constants";
import styles from "./NFTContractInfoModal.module.scss";

export default function NFTContractInfoModal({
  visible,
  onClose,
  ipfsCid,
  txHash,
}) {
  console.log({ txHash });
  if (!visible) {
    return null;
  }
  return (
    <div className={styles.popup} onClick={onClose}>
      <div className={styles.nftContractInfo}>
        <div className={styles.nfttext}>NFT contract information</div>
        <div className={styles.polygon}>
          <div>
            <img
              src="https://static.nftornot.com/polygon-matic-logo+2.png"
              alt="polygon"
            />
            <span style={{ minWidth: "150px" }}>Polygon transaction:</span>
            <span className={styles.textOverflow}>
              <a
                target="_blank"
                rel="noreferrer"
                href={Constants.MUMBAI_POLYGON_SCAN_TX_ENDPOINT + txHash}
              >
                {txHash}
              </a>
            </span>
          </div>
          <div>
            <img
              src="https://static.nftornot.com/Ipfs-logo-1024-ice-text+1.png"
              alt="ipfs"
            />
            <span style={{ minWidth: "150px" }}>IPFS metadata:</span>
            <span>{ipfsCid}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
