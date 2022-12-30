import React from "react";
import { motion } from "framer-motion";
import NONImage from "../../NONImage";

export default function GeneratedImageBox({ imgSrcUrl }) {
  const [isHover, setIsHover] = React.useState(false);
  const [isImageLoaded, setIsImageloaded] = React.useState(false);

  return (
    <div className="w-full h-[512px] relative">
      <NONImage
        imgSrcUrl={imgSrcUrl}
        alt="Whisper Image"
        onLoadingCompleteHandler={() => setIsImageloaded(true)}
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
