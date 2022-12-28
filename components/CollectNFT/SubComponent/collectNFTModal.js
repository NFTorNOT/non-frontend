import React, { useEffect, useRef, useState } from "react";
import styles from "./collectModal.module.scss";
import Collect from "./SVG/collect";
import Close from "./SVG/close";
import Image from "next/image";
import CollectApi from "../../../graphql/CollectApi";
import { useSigner, useSignTypedData } from "wagmi";
import { ERROR_TYPES } from "../../../utils/Constants";
import PublicationApi from "../../../graphql/PublicationApi";
import { axiosInstance } from "../../../AxiosInstance";
import LensHelper from "../../../utils/LensHelper";

function CollectNFTModal({ shown, close, modalData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [apierror, setApiError] = useState("");
  const [isNftCollected, setIsNftCollected] = useState(false);
  const isNftCollectedByMe = useRef();
  const { signTypedDataAsync, isError } = useSignTypedData();
  const { data: signer, isError: isSignerError, status } = useSigner();
  const [totalCollects, setTotalCollects] = useState(0);

  console.log({ modalData, isNftCollected });
  const fetchPublicationData = async () => {
    PublicationApi.fetchPublication({
      publicationId: modalData?.lensPublicationId,
    })
      .then((publicationRes) => {
        console.log({ publicationRes });
        const totalCollects =
          publicationRes.data.publication.stats.totalAmountOfCollects;
        isNftCollectedByMe.current =
          publicationRes.data.publication.hasCollectedByMe;

        console.log({
          totalCollects,
          isNftCollectedByMe: isNftCollectedByMe.current,
        });
        setTotalCollects(totalCollects);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    fetchPublicationData();
    isNftCollectedByMe.current = null;
    setApiError("");

    return () => {
      setApiError("");
    };
  }, [shown]);

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
    } catch (error) {
      if (error.code) {
        setApiError(error?.reason);
        setIsLoading(false);
      } else if (error?.message) {
        setApiError(error.message);
      } else {
        setIsLoading(false);
      }
    }
  }

  async function collectPost() {
    try {
      if (isNftCollected) {
        return;
      }
      setApiError("");
      setIsLoading(true);
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

      const broadCastData = await CollectApi.broadCast({
        id: collectTypedDataResponse?.data?.createCollectTypedData?.id,
        signature,
      });

      const txHash = broadCastData?.data?.broadcast?.txHash;

      const res = await LensHelper.pollUntilIndexed({ txHash });

      console.log({ res });

      if (res.indexed) {
        const collectApiRes = await axiosInstance.post("/collect", {
          lens_post_id: modalData.lensId,
          collect_nft_transaction_hash: res.txHash,
        });
        if (collectApiRes.data.success) {
          setIsNftCollected(true);
          setIsLoading(false);
        }
      }
    } catch (error) {
      if (error?.message == ERROR_TYPES.ALLOWANCE) {
        setIsLoading(true);
        allowanceFlow();
      } else if (error.message) {
        setApiError(error.message);

        setIsLoading(false);
      } else {
        if (error) {
          setIsLoading(false);
        }
      }

      console.log("error 2", error);
    }
  }

  console.log({ isError, apierror, isSignerError, status });
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
          <span className="ml-[12px]">{totalCollects} Collectors</span>
        </div>
        {modalData?.hasCollected || isNftCollectedByMe.current ? (
          <button
            className={`${styles.alreadyCollectedButton} flex items-center justify-center py-[7px]`}
          >
            <span>
              <Collect />
            </span>
            <span className="font-bold text-[16px] leading-[26px] ml-[8px]">
              You have already collected this
            </span>
          </button>
        ) : (
          <button
            className={`${styles.collectButton} flex items-center justify-center py-[7px] mt-[20px]`}
            onClick={() => collectPost()}
          >
            <span>
              <Collect />
            </span>
            {isLoading ? (
              <span className="pl-[11px]">Collecting...</span>
            ) : isNftCollected ? (
              <span className="pl-[11px]">Collected</span>
            ) : (
              <span className="pl-[11px]">Collect Now</span>
            )}
          </button>
        )}

        {isError && apierror ? (
          <div className="flex items-center justify-center mt-5">
            <span>user rejected signing</span>
          </div>
        ) : null}
        {!isError && apierror ? (
          <div className="flex items-center justify-center mt-5">
            <span>{apierror}</span>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
}

export default CollectNFTModal;
