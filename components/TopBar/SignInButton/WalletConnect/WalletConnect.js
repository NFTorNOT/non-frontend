import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./WalletConnect.module.scss";
import Image from "next/image";

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
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              className: styles.container,
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className={`${styles.connectButton} btn btn-green`}
                    onClick={openConnectModal}
                    type="button"
                    title="Sign in with lens"
                  >
                    <Image
                      src="https://static.plgworks.com/assets/images/non/lens-icon.png"
                      alt="Lens Icon"
                      width="20"
                      height="20"
                    />
                    <span className="ml-2 hidden text-skin-green md:block">
                      Sign in with lens
                    </span>
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
                  <button
                    style={{ color: "white" }}
                    onClick={openAccountModal}
                    type="button"
                  >
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
