import React from "react";
import { motion } from "framer-motion";
import NONImage from "../../NONImage";

export default function GeneratedImageBox({ imgSrcUrl }) {
  const [isHover, setIsHover] = React.useState(false);
  const [isImageLoaded, setIsImageloaded] = React.useState(false);

  return (
    <div
      className="tablet:w-[320px] tablet:h-[320px] w-[404px] h-[404px] relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <NONImage
        imgSrcUrl={imgSrcUrl}
        alt="Whisper Image"
        width={404}
        height={404}
        onLoadingCompleteHandler={() => setIsImageloaded(true)}
        classes="absolute rounded-[16px] border-solid border-[1px] border-[#ffffff33]"
      />
      {isImageLoaded && imgSrcUrl && (
        <div className="absolute bottom-0 w-[calc(100%-32px)] left-[16px] flex cursor-pointer">
          <motion.div
            className="w-full"
            transition={{
              type: "spring",
              damping: 100,
              stiffness: 500,
              easing: "easeIn",
            }}
            initial={{
              y: "0%",
            }}
            animate={{
              y: !isHover ? "0%" : "-50%",
            }}
          ></motion.div>
        </div>
      )}
    </div>
  );
}
