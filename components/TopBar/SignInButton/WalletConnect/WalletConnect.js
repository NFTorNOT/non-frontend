import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./WalletConnect.module.css";

export default function WalletConnect() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected =
          ready &&
          account &&
          chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              className: styles.container
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button className={styles.connectButton} onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className={styles.chainInfoContainer}>
                  <button style={{color: 'white'}} onClick={openAccountModal} type="button">
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
