import React, { useState } from "react";
import styles from "./collectModal.module.scss";
import Collect from "./SVG/collect";
import Close from "./SVG/close";
import Image from "next/image";
import CollectApi from "../../../graphql/CollectApi";
import { useContract, useSigner, useSignTypedData } from "wagmi";
import { splitSignature } from "ethers/lib/utils.js";
import LensHubAbi from "../../../abis/LensHubAbi.json";
import { ERROR_TYPES } from "../../../utils/Constants";

function CollectNFTModal({ shown, close, modalData }) {
  const [isLoading, setIsLoading] = useState(false);
  const { signTypedDataAsync } = useSignTypedData();
  const { data: signer } = useSigner();
  const contract = useContract({
    address: process.env.NEXT_PUBLIC_LENS_HUB_CONTRACT_ADDRESS,
    abi: LensHubAbi,
    signerOrProvider: signer,
  });

  async function allowanceFlow() {
    try {
      const generateModuleCurrencyApprovalResponse =
        await CollectApi.generateModuleCurrencyApprovalData();

      const generateModuleCurrencyApprovalData =
        generateModuleCurrencyApprovalResponse.data
          .generateModuleCurrencyApprovalData;
      console.log({ generateModuleCurrencyApprovalResponse });

      const tx1 = await signer.sendTransaction({
        to: generateModuleCurrencyApprovalData.to,
        from: generateModuleCurrencyApprovalData.from,
        data: generateModuleCurrencyApprovalData.data,
      });
      await tx1.wait(1);
      collectPost();
      console.log({ tx1 });
    } catch (error) {
      console.log({ error });
    }
  }

  async function collectPost() {
    try {
      const collectTypedDataResponse = await CollectApi.createCollectTypedData({
        publicationId: modalData.lensPublicationId,
      });

      console.log({ collectTypedDataResponse });

      let createCollectTypedData =
        collectTypedDataResponse.data.createCollectTypedData.typedData;
      delete createCollectTypedData.domain.__typename;
      delete createCollectTypedData.types.__typename;
      delete createCollectTypedData.value.__typename;

      console.log({ createCollectTypedData });

      const signature = await signTypedDataAsync({
        types: createCollectTypedData.types,
        domain: createCollectTypedData.domain,
        value: createCollectTypedData.value,
      });

      const { v, r, s } = splitSignature(signature);

      const tx = await contract.collectWithSig(
        {
          collector: modalData.lensProfileOwnerAddress,
          profileId: createCollectTypedData.value.profileId,
          pubId: createCollectTypedData.value.pubId,
          data: createCollectTypedData.value.data,
          sig: {
            v,
            r,
            s,
            deadline: createCollectTypedData.value.deadline,
          },
        },
        { gasLimit: 1000000 }
      );
      const res = await tx.wait();
      console.log({ res: res.transactionHash });
      //collect with sig
    } catch (error) {
      if (error?.message == ERROR_TYPES.ALLOWANCE) {
        allowanceFlow();
      }
      console.log("error", error);
    }
  }

  return shown ? (
    <div
      className={styles.modalBackdrop}
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        className={`${styles.modalContent} relative`}
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span>
              <Collect />
            </span>
            <span className="ml-[8px] font-bold text-[16px] leading-[26px] text-[#ffffff]">
              Fee Collect
            </span>
          </div>
          <button onClick={close}>
            <Close />
          </button>
        </div>
        <div className={`${styles.nftTitle} mt-[8px]`}>{modalData?.title}</div>
        <div className={`${styles.nftOwner} mt-[8px]`}>
          Proceeds from the Collect will go to{" "}
          <span className="text-[#ffffff]">{modalData?.handle}</span>
        </div>
        <div className={`${styles.nftFee} mt-[14px] flex items-center`}>
          <span>
            <Image
              src="https://static.plgworks.com/assets/images/non/wmatic-icon.png"
              alt="Lens Icon"
              width="26"
              height="26"
            />
          </span>
          <span className="ml-[8px]">1 WMATIC</span>
        </div>
        <div className={`${styles.collectorCount} flex items-center`}>
          <span>
            <Image
              src="https://static.plgworks.com/assets/images/non/collectors.png"
              alt="Lens Icon"
              width="26"
              height="26"
            />
          </span>
          <span className="ml-[12px]">2 Collectors</span>
        </div>
        <button
          className={`${styles.collectButton} flex items-center justify-center py-[7px] mt-[20px]`}
          onClick={() => collectPost()}
        >
          <span>
            <Collect />
          </span>
          <span className="pl-[11px]">Collect Now</span>
        </button>
      </div>
    </div>
  ) : null;
}

export default CollectNFTModal;
