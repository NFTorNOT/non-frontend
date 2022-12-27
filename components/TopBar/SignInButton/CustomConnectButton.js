import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import Image from "next/image";
import { SignIn } from ".";

const CustomConnectButton = ({ onSignInComplete }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              console.log("coming here", connected);
              if (!connected) {
                return (
                  <div
                    onClick={() => {
                      openConnectModal();
                    }}
                  >
                    <div
                      className={`flex justify-center box-border items-center w-[234px] h-[40px] bg-[#ABFE2C] text-[#00501E] backdrop-blur rounded-[4px] gap-[8px] cursor-pointer border-[1px] border-solid border-black/20`}
                    >
                      <Image
                        src="https://static.plgworks.com/assets/images/non/lens-icon.png"
                        alt="Lens Icon"
                        width="20"
                        height="20"
                      />
                      Sign in with Lens
                    </div>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return <SignIn onSignInComplete={onSignInComplete} />;
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
