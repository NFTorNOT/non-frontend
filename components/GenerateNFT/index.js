import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import Image from "next/image";
import LensHelper from "../../utils/LensHelper";
import styles from "./Generate.module.scss";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems, TabNames } from "../Main/TabItems";
import { useUserContext } from "../../context/UserContext";
import useCurrentPublicationId from "../../utils/useCurrentPublicationId";
import PublicationApi from "../../graphql/PublicationApi";
import FilterToText from "./FilterToText";
import ThemesData from "./ThemesData";
import { useAuthContext } from "../../context/AuthContext";
import SubmitForVoteModal from "./SubmitForVoteModal/SubmitForVoteModal";
import UserInput from "./UserInput";

export default function GenerateNFT() {
  const [image, setImage] = useState("");
  const [wordOfTheDay, setWordOfTheDay] = useState();
  const { address } = useAccount();
  const { userProfile } = useUserContext();
  const { isUserLoggedIn } = useAuthContext();
  const { getPostId } = useCurrentPublicationId();
  const { onTabChange } = useBottomTab();
  var sectionStyle = {
    backgroundImage: `url(${image})`,
  };
  const [prompt, setPromt] = useState("Dramatic sky and buildings painting");
  const [filter, setfilter] = useState("volvo");
  const [theme, setTheme] = useState("Light");
  const [imageTitle, setImageTitle] = useState("");
  const [selectedImgUrl, setSelectedImgUrl] = useState('');
  const [imageIpfsObjectId, setImageIpfsObjectId] = useState('');
  const [lensMetadataIpfsObjectId, setLensMetadataIpfsObjectId] = useState('');
  const [imagesData, setImagesData] = useState([]);
  const [submitToVoteModal, setsubmitToVoteModal] = useState(false);

  const postIdRef = useRef(null);
  const selectedPrompt = useRef([]);
  const generatedImagesData = useRef([]);
  const scrollRef = useRef();

  const isSubmitDisabled =
    !isUserLoggedIn || (isUserLoggedIn && imageTitle === "");

  var filterOptions = [];
  const [imageGenerationInProgress, setImageGenerationInProgress] =
    useState(false);
  const [putImageToVoteInProgress, setPutImageToVoteInProgress] =
    useState(false);

  for (var key in FilterToText) {
    filterOptions.push(key);
  }

  const submitForGeneration = () => {
    if (!prompt) {
      alert("prompt is required for image generaration");
      return;
    }
    setImageGenerationInProgress(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/image-suggestions`, {
        params: {
          prompt: prompt,
          art_style: FilterToText[filter],
        },
      })
      .then((response) => {
        console.log(response.data);
        const generatedImagesResponseData = response.data.data;
        if (!generatedImagesResponseData) {
          // TODO:DS : Show Response Err
          return;
        }
        const suggestionsIdsArr = generatedImagesResponseData.suggestion_ids;
        const suggestionsMap = generatedImagesResponseData.suggestions;

        for (let cnt = 0; cnt < suggestionsIdsArr.length; cnt++) {
          const image = suggestionsMap[suggestionsIdsArr[cnt]];

          if (!image) {
            continue;
          }
          const imageUrl = image.image_url;

          if (!selectedPrompt.current.includes(prompt)) {
            generatedImagesData.current = [];
            selectedPrompt.current.push(prompt);
          }

          generatedImagesData.current.push({
            image_url: imageUrl,
          });
        }
        setImagesData(generatedImagesData);
      })
      .finally(() => {
        setImageGenerationInProgress(false);
      });
  };

  async function onSubmitToVote(imgUrl) {
    setPutImageToVoteInProgress(true);
    setsubmitToVoteModal(true);
    setSelectedImgUrl(imgUrl);

    // try {
    //   const publicationId = postIdRef.current || (await getPostId());
    //   // const response = await NFTApi.submitToVote({
    //   //   receiverAddress: address,
    //   //   imageUrl: image,
    //   //   imageTitle: imageTitle,
    //   // });
    //   console.log("mint response", { response });
    //   const { imageCid, transactionHash, tokenId, lensMetaDataCid } =
    //     response.data.data;
    //   console.log("spliting imageUrl", {
    //     imageCid,
    //     transactionHash,
    //     tokenId,
    //     lensMetaDataCid,
    //   });

    //   const { txId } = await LensHelper.postCommentWithDispatcher({
    //     commentMetadataCid: lensMetaDataCid,
    //     profileId: userProfile?.id,
    //     publicationId,
    //   });

    //   if (txId) {
    //     const indexedResult = await LensHelper.pollUntilIndexed({ txId: txId });
    //   }

    //   onTabChange(TabItems[TabNames.VoteImage]);
    // } catch (error) {
    //   console.log(error);
    // }
    setPutImageToVoteInProgress(false);
  }

  useEffect(() => {
    if (imageGenerationInProgress) {
      setTimeout(() => {
        scrollToMyRef();
      }, 500);
    }
  }, [imageGenerationInProgress]);

  const scrollToMyRef = () => {
    scrollRef.current?.scrollIntoView({
      top: 0,
      inline: "nearest",
      behavior: "smooth",
      block: "start",
    });
  };

  const submitToVoteApi = () => {

    const { imageCid, transactionHash, tokenId, lensMetaDataCid } =
      response.data.data;
    console.log("spliting imageUrl", {
      imageCid,
      transactionHash,
      tokenId,
      lensMetaDataCid,
    });

    const { txId } = await LensHelper.postCommentWithDispatcher({
      commentMetadataCid: lensMetaDataCid,
      profileId: userProfile?.id,
      publicationId,
    });

    if (txId) {
      const indexedResult = await LensHelper.pollUntilIndexed({ txId: txId });
    }

    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/submit-to-vote`, {
      image_url: selectedImgUrl,
      title: imageTitle,
      description: prompt,
      theme_name: theme,
      image_ipfs_object_id: imageCid,
      lens_metadata_ipfs_object_id: lensMetadataIpfsObjectId
      // lens_publication_id : 1
    }).then((response) => {
      console.log("Response", response);
    });
  }

  const submitVoteClickHandler = () => {
    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/store-on-ipfs`, {
      image_url: selectedImgUrl,
      title: imageTitle,
      description: prompt
    }).then((response) => {
      const apiResponseData = response.data.data;
      const ipfsObjectIds = apiResponseData.ipfs_object_ids;
      const ipfsObjectsMap = apiResponseData.ipfs_objects;

      for (let i = 0; i < ipfsObjectIds.length; i++) {
        const ipfsObject = ipfsObjectsMap[ipfsObjectIds[i]];

        if (ipfsObject.kind === 'IMAGE')
          setImageIpfsObjectId(ipfsObject.cid)

        if (ipfsObject.kind === 'LENS_PUBLICATION_METADATA')
          setLensMetadataIpfsObjectId(ipfsObject.cid)
      }
      submitToVoteApi();
    });
  }

  return (
    <>
      <div className={`${styles.generateNFT}`}>
        <div className={styles.enter_prompt_container}>
          <>
            <div>Themes</div>
            <div className={styles.generateText}>
              Select a theme that the prompt describes
            </div>
            <select
              className={styles.dropdown}
              name="Themes"
              id="Themes"
              onChange={(e) => {
                setTheme(e.target.value);
              }}
            >
              {ThemesData.map((style) => {
                return (
                  <option key={style.id} value={style.themeName}>
                    #{style.themeName}
                  </option>
                );
              })}
            </select>
            <div>Enter Prompt</div>
            <textarea
              placeholder="Dramatic sky and buildings painting"
              className={styles.prompt_area}
              onChange={(e) => {
                setPromt(e.target.value);
              }}
            ></textarea>
            <div>Filter</div>
            <div className={styles.generateText}>
              Explore various stylistic filters you can apply
            </div>
            <select
              className={styles.dropdown}
              name="filters"
              id="filters"
              onChange={(e) => {
                setfilter(e.target.value);
              }}
            >
              {filterOptions.map((style) => {
                return (
                  <option key={style} value={style}>
                    {style}
                  </option>
                );
              })}
            </select>
          </>

          <button
            className={`mt-auto btn btn-primary w-full`}
            onClick={() => {
              submitForGeneration();
            }}
            title="Generate Image"
          >
            {imageGenerationInProgress ? (
              <ClipLoader color={"#fff"} loading={true} size={15} />
            ) : (
              <span>Generate Image</span>
            )}
          </button>
        </div>

        <div className={`${styles.secondTab}`}>
          <div className={styles.generatedImagePrompts}>
            <SubmitForVoteModal
              visible={submitToVoteModal}
              setsubmitToVoteModal={setsubmitToVoteModal}
              clickHandler={() => submitVoteClickHandler()}
            />

            {imagesData.length <= 0 ? (
              <div className={styles.emptyImageContainer}>
                <div className="text-skin-base font-semibold mb-[5px]">
                  Your Generations
                </div>
                <div className="grid gap-5 overflow-y-auto h-full grid-cols-2">
                  <div className={styles.emptyImageCell}>
                    {imageGenerationInProgress ? (
                      <ClipLoader color={"#fff"} loading={true} size={15} />
                    ) : (
                      <Image
                        src="https://static.plgworks.com/assets/images/non/generate-default.png"
                        alt="Lens Icon"
                        width="60"
                        height="60"
                      />
                    )}
                  </div>

                  <div className={styles.emptyImageCell}>
                    {imageGenerationInProgress ? (
                      <ClipLoader color={"#fff"} loading={true} size={15} />
                    ) : (
                      <Image
                        src="https://static.plgworks.com/assets/images/non/generate-default.png"
                        alt="Lens Icon"
                        width="60"
                        height="60"
                      />
                    )}
                  </div>

                  <div className={styles.emptyImageCell}>
                    <Image
                      src="https://static.plgworks.com/assets/images/non/generate-default.png"
                      alt="Lens Icon"
                      width="60"
                      height="60"
                    />
                  </div>
                  <div className={styles.emptyImageCell}>
                    <Image
                      src="https://static.plgworks.com/assets/images/non/generate-default.png"
                      alt="Lens Icon"
                      width="60"
                      height="60"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div style={sectionStyle}>
                <div
                  id="generated-image-id"
                  className="grid gap-5 overflow-y-auto h-full grid-cols-2"
                >
                  {generatedImagesData.current.length > 0 &&
                    generatedImagesData.current.map((image, index) => (
                      <div
                        ref={scrollRef}
                        className={`${styles.bottom} relative`}
                        key={index}
                      >
                        <img src={image.image_url} alt="Generated image" />
                        <div className="absolute w-full">
                          <UserInput
                            key={index}
                            style={styles.masterpeice}
                            onSubmit={(value) => setImageTitle(value)}
                          />
                          <button
                            disabled={isSubmitDisabled}
                            onClick={() => onSubmitToVote(image.image_url)}
                            className={`${styles.submitVote} ${isSubmitDisabled ? styles.disabled : {}
                              }`}
                            type="submit"
                            title="Submit for voting"
                            id={index}
                          >
                            {putImageToVoteInProgress ? (
                              <ClipLoader
                                color={"#fff"}
                                loading={true}
                                size={15}
                              />
                            ) : (
                              "Submit for voting"
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  <div className={styles.emptyImageCell}>
                    <Image
                      src="https://static.plgworks.com/assets/images/non/generate-default.png"
                      alt="Lens Icon"
                      width="60"
                      height="60"
                    />
                  </div>
                  <div className={styles.emptyImageCell}>
                    <Image
                      src="https://static.plgworks.com/assets/images/non/generate-default.png"
                      alt="Lens Icon"
                      width="60"
                      height="60"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
