import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import NFTApi from "../../api/NFTApi";
import LensHelper from "../../utils/LensHelper";
import styles from "./Generate.module.scss";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems, TabNames } from "../Main/TabItems";
import { useUserContext } from "../../context/UserContext";
import useCurrentPublicationId from "../../utils/useCurrentPublicationId";
import PublicationApi from "../../graphql/PublicationApi";
import { useAuthContext } from "../../context/AuthContext";

export default function GenerateNFT() {
  const [image, setImage] = useState("https://static.nftornot.com/img.png");
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
  const [imageTitle, setImageTitle] = useState("");

  const postIdRef = useRef(null);

  const isSubmitDisabled = !isUserLoggedIn || (isUserLoggedIn && imageTitle === "")

  const imageGenerationURL =
    "https://nftornot.com/api/fetch-stable-diffusion-image/";

  var filterOptions = [];
  const [imageGenerationInProgress, setImageGenerationInProgress] =
    useState(false);
  const [putImageToVoteInProgress, setPutImageToVoteInProgress] =
    useState(false);
  const [wordFetchInProgress, setWordFetchInProgress] = useState(false);

  const filterToText = {
    None: "",
    "Delicate detail":
      "trending on artstation, sharp focus, studio photo, intricate details, highly detailed, by greg rutkowski",
    "Radiant symmetry":
      " centered, symmetry, painted, intricate, volumetric lighting, beautiful, rich deep colors masterpiece, sharp focus, ultra detailed, in the style of dan mumford and marc simonetti, astrophotography",
    "Lush illumination":
      " unreal engine, greg rutkowski, loish, rhads, beeple, makoto shinkai and lois van baarle, ilya kuvshinov, rossdraws, tom bagshaw, alphonse mucha, global illumination, detailed and intricate environment",
    "Saturated space":
      " outer space, vanishing point, super highway, high speed, digital render, digital painting, beeple, noah bradley, cyril roland, ross tran, trending on artstation",
    "Neon mecha":
      " neon ambiance, abstract black oil, gear mecha, detailed acrylic, grunge, intricate complexity, rendered in unreal engine, photorealistic",
    "Ethereal low poly":
      "low poly, isometric art, 3d art, high detail, artstation, concept art, behance, ray tracing, smooth, sharp focus, ethereal lighting",
    "Warm box":
      "golden ratio, fake detail, trending pixiv fanbox, acrylic palette knife, style of makoto shinkai studio ghibli genshin impact james gilleard greg rutkowski chiho aoshima",
    Cinematic:
      " perfect composition, beautiful detailed intricate insanely detailed octane render trending on artstation, 8 k artistic photography, photorealistic concept art, soft natural volumetric cinematic perfect light, chiaroscuro, award  winning photograph, masterpiece, oil on canvas, raphael, caravaggio, greg rutkowski, beeple, beksinski, giger",
    Wasteland:
      " isometric, digital art, smog, pollution, toxic waste, chimneys and railroads, 3 d render, octane render, volumetrics, by greg rutkowski",
    "Flat pallette":
      " acrylic painting, trending on pixiv fanbox, palette knife and brush strokes, style of makoto shinkai jamie wyeth james gilleard edward hopper greg rutkowski studio ghibli genshin impact",
    Spielberg:
      " cinematic, 4k, epic Steven Spielberg movie still, sharp focus, emitting diodes, smoke, artillery, sparks, racks, system unit, motherboard, by pascal blanche rutkowski repin artstation hyperrealism painting concept art of detailed character design matte painting, 4 k resolution blade runner",
    Royalistic:
      " epic royal background, big royal uncropped crown, royal jewelry, robotic, nature, full shot, symmetrical, Greg Rutkowski, Charlie Bowater, Beeple, Unreal 5, hyperrealistic, dynamic lighting, fantasy art",
  };

  for (var key in filterToText) {
    filterOptions.push(key);
  }
  const submitForGeneration = () => {
    setImageGenerationInProgress(true);
    const data = {
      prompt: prompt,
      art_style: filterToText[filter],
    };
    console.log(data);
    axios.post(imageGenerationURL, data).then((response) => {
      console.log(response.data);
      setImage(response.data.data.image.url);
      setImageGenerationInProgress(false);
    });
  };

  async function onSubmitToVote() {
    setPutImageToVoteInProgress(true);
    try {
      const publicationId = postIdRef.current || (await getPostId());
      const response = await NFTApi.submitToVote({
        receiverAddress: address,
        imageUrl: image,
        imageTitle: imageTitle,
      });
      console.log("mint response", { response });
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

      if(txId){
        const indexedResult = await LensHelper.pollUntilIndexed({ txId: txId });
      }
      
      onTabChange(TabItems[TabNames.VoteImage]);
    } catch (error) {
      console.log(error);
    }
    setPutImageToVoteInProgress(false);
  }

  async function fetchWordOfTheDay() {
    console.log("fetching word");
    setWordFetchInProgress(true);
    postIdRef.current = await getPostId();
    console.log("post id", { pid: postIdRef.current });
    const response = await PublicationApi.fetchPublication(postIdRef.current);
    console.log({ response });
    const postDescription = response.data?.publication?.metadata?.description;
    setWordOfTheDay(postDescription);
    setWordFetchInProgress(false);
  }

  useEffect(() => {
    fetchWordOfTheDay();
  }, [userProfile?.id]);

  return (
    <>
      <div className={`${styles.generateNFT} gap-x-10`}>
        <div className={styles.enter_prompt_container}>
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
            name="cars"
            id="cars"
            onChange={(e) => {
              setfilter(e.target.value);
            }}
          >
            {filterOptions.map((style) => {
              return <option value={style}>{style}</option>;
            })}
          </select>

          <button
            disabled={!isUserLoggedIn}
            className={`${styles.button} ${styles.disabled}`}
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

        <div className={styles.secondTab}>
          <div className={styles.yellow}>Word of the day</div>
          <div className={styles.generatedTitle}>
            {wordFetchInProgress ? (
              <ClipLoader color={"#fff"} loading={true} size={15} />
            ) : (
              <div className={styles.wordOfDay}>"{wordOfTheDay}"</div>
            )}
          </div>
          <div className={styles.generatedImage}>
            <div className={styles.generatedImagePrompts} style={sectionStyle}>
              <div className={styles.bottom}>
                <input
                  type="text"
                  value={imageTitle}
                  onChange={(event) => setImageTitle(event.target.value)}
                  placeholder="Enter a title for your masterpiece..."
                  className={styles.masterpeice}
                ></input>

                <button
                  disabled={isSubmitDisabled}
                  onClick={onSubmitToVote}
                  className={`${styles.submitVote} ${isSubmitDisabled ? styles.disabled : {}}`}
                  type="submit"
                  title="Submit for voting"
                >
                  {putImageToVoteInProgress ? (
                    <ClipLoader color={"#fff"} loading={true} size={15} />
                  ) : (
                    "Submit for voting"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
