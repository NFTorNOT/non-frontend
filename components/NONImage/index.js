import Image from "next/image";
import React from "react";
import ImageLoader from "./ImageLoader";
import styles from "./NONImage.module.css";

export default function NONImage({
  imgSrcUrl,
  height,
  width,
  alt,
  priority = true,
  classes,
  onLoadingCompleteHandler,
}) {
  const [imgLoadingError, setImgLoadingError] = React.useState(false);

  return (
    <>
      {!imgSrcUrl ? (
        <div
          className={`w-fit backdrop-blur-[60px] rounded-[8px]`}
          style={{ background: "rgba(255, 255, 255, 0.4)" }}
        >
          <ImageLoader height={height} width={width} />
        </div>
      ) : (
        <>
          {imgLoadingError ? (
            <div
              className={`overflow-hidden w-full flex items-center justify-center rounded-[8px] ${styles.Errorstate}`}
            >
              <div
                className={`flex items-center justify-center w-[402px] h-[402px] relative group text-[#FF0000] not-italic font-medium text-[14px] leading-[160%]`}
              >
                An error occurred. Please try again
              </div>
            </div>
          ) : (
            <Image
              src={imgSrcUrl}
              priority={priority}
              className={`${classes} object-contain`}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw"
              onLoadingComplete={onLoadingCompleteHandler}
              onError={() => setImgLoadingError(true)}
            />
          )}
        </>
      )}
    </>
  );
}
