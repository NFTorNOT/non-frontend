import { useState } from "react";
import Modal from "react-modal";
import { useSignTypedData } from "wagmi";
import { useUserContext } from "../../context/UserContext";
import CollectApi from "../../graphql/CollectApi";
import UserApi from "../../graphql/UserApi";
import LensHelper from "../../utils/LensHelper";
import CheckedCircle from "../SignInModal/CheckedCircle";
import styles from "./EnableDispatcher.module.css";

const EnableDispatcherModal = ({ onClose }) => {
  const [openDispatcherModal, setIsOpenDispatcherModal] = useState(true);
  const { userProfile } = useUserContext();
  const { signTypedDataAsync, isError } = useSignTypedData();
  const [isLoading, setIsLoading] = useState(false);

  const onRequestClose = () => {
    setIsOpenDispatcherModal(false);
    onClose();
  };

  const enableDispatcher = async () => {
    try {
      setIsLoading(true);
      const profileId = userProfile.lens_profile_id;
      const dispatcherRes = await UserApi.enableDispatcher({ profileId });
      let createSetDispatcherTypedData =
        dispatcherRes.data.createSetDispatcherTypedData.typedData;
      delete createSetDispatcherTypedData.domain.__typename;
      delete createSetDispatcherTypedData.types.__typename;
      delete createSetDispatcherTypedData.value.__typename;

      const signature = await signTypedDataAsync({
        types: createSetDispatcherTypedData.types,
        domain: createSetDispatcherTypedData.domain,
        value: createSetDispatcherTypedData.value,
      });
      const broadCastData = await CollectApi.broadCast({
        id: dispatcherRes?.data?.createSetDispatcherTypedData?.id,
        signature,
      });

      const txHash = broadCastData?.data?.broadcast?.txHash;

      const res = await LensHelper.pollUntilIndexed({ txHash });
      if (res.indexed) {
        onClose();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const customModalStyles = {
    content: {
      background: "#FFFFFF",
      height: "fit-content",
      width: "fit-content",
      margin: "auto",
      backdropFilter: "blur(60px)",
      borderRadius: "16px",
      padding: "0px",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.6)",
    },
  };

  return (
    <Modal
      onRequestClose={onRequestClose}
      isOpen={openDispatcherModal}
      style={customModalStyles}
    >
      <div
        className={`flex flex-col justify-start items-start bg-[#FFFFFF] rounded-[16px] backdrop-blur-3xl gap-[16px] p-[40px] ${styles.ModalContainer}`}
      >
        <div>
          <div
            className={`flex justify-center box-border items-center w-[234px] h-[40px] bg-[#ABFE2C] text-[#00501E] backdrop-blur rounded-[4px] gap-[8px] cursor-pointer border-[1px] border-solid border-black/20`}
            onClick={enableDispatcher}
          >
            {isLoading ? (
              <span>Enabling...</span>
            ) : (
              <span>Enable Dispatcher</span>
            )}
          </div>
        </div>
        <div
          className={`flex justify-start flex-col gap-[12px] not-italic text-[12px] font-medium ${styles.LensInfo}`}
        >
          <div className="flex gap-[8px] justify-start items-center">
            <CheckedCircle />
            Automatically sign transactions
          </div>
          <div className="flex gap-[8px] justify-start items-center">
            <CheckedCircle />
            Completely secure
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EnableDispatcherModal;
