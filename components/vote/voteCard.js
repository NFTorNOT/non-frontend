import styles from "./Vote.module.scss";
import React, { useEffect, useRef, useState } from "react";
import ShareSVG from "./svg/socialShare";
import ShareModal from "./shareModal";
import HidePromptSvg from "./svg/hidePromptSvg";
import ShowPromptSvg from "./svg/showPromptSvg";
import LensSvg from "./svg/lensSvg";

export default function VoteCard(props) {
  const character = props.character;

  const hoverWrapperRef = useRef();
  const bioParentWrapperRef = useRef();
  const titleWrapperRef = useRef();
  const handleWrapperRef = useRef();
  const descriptionWrapperRef = useRef();

  const [wrapperTransY, setWrapperTransY] = useState(1000);
  const [socialShareModal, setSocialShareModal] = useState(false);
  const [showHandleTimeout, setShowHandleTimeout] = useState(0);

  const [showPrompt, setShowPrompt] = useState(false);

  const promtStatusText = showPrompt ? "Hide Prompt" : "Show Prompt";
  const promtStatusIcon = showPrompt ? <HidePromptSvg /> : <ShowPromptSvg />;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (bioParentWrapperRef && bioParentWrapperRef.current) {
      setWrapperTransY(bioParentWrapperRef.current.clientHeight);
    }
  }, []);

  let cardTransHover = () => {
    showTitle();
  };

  let cardTransOut = () => {
    clearTimeout(showHandleTimeout);
    hideAll();
  };

  const hideAll = () => {
    if (showPrompt) {
      // do nothing
      return;
    }
    // title hide Animation
    const wrapHeight = bioParentWrapperRef.current.clientHeight;
    // Do we really need to do anything?
    if (wrapperTransY < wrapHeight) {
      setWrapperTransY(wrapHeight);
    }
  };

  const showTitle = () => {
    // title Show Animation
    const titleHeight = titleWrapperRef.current.clientHeight;
    const wrapHeight = bioParentWrapperRef.current.clientHeight;

    // Do we really need to do anything?
    if (wrapperTransY >= wrapHeight - titleHeight) {
      setWrapperTransY(wrapHeight - titleHeight);
    } else {
      return;
    }
  };

  const showHandle = () => {
    const titleHeight = titleWrapperRef.current.clientHeight;
    const wrapHeight = bioParentWrapperRef.current.clientHeight;
    const handleHeight = handleWrapperRef.current.clientHeight;

    if (wrapperTransY <= wrapHeight - titleHeight) {
      //Check if handle is visible.
      if (wrapperTransY >= wrapHeight - titleHeight - handleHeight) {
        if (showPrompt) {
          setWrapperTransY(0);
        } else {
          setWrapperTransY(wrapHeight - titleHeight - handleHeight);
        }
      }
    }
  };

  useEffect(() => {
    const titleHeight = titleWrapperRef.current.clientHeight;
    const wrapHeight = bioParentWrapperRef.current.clientHeight;

    if (wrapperTransY === wrapHeight - titleHeight) {
      // Showing title, show handle soon.
      setShowHandleTimeout(
        setTimeout(() => {
          showHandle();
        }, 500)
      );
    }
  }, [wrapperTransY]);

  const togglePrompt = () => {
    setShowPrompt(!showPrompt);
  };

  useEffect(() => {
    const titleHeight = titleWrapperRef.current?.clientHeight;
    const wrapHeight = bioParentWrapperRef.current?.clientHeight;
    const handleHeight = handleWrapperRef.current?.clientHeight;
    const descriptionHeight = descriptionWrapperRef?.current.clientHeight;

    if (showPrompt) {
      setWrapperTransY(0);
    } else if (wrapperTransY < wrapHeight - descriptionHeight) {
      setWrapperTransY(wrapHeight - titleHeight - handleHeight);
    }
  }, [showPrompt]);

  return (
    <div
      className={`${styles.card}`}
      style={{ backgroundImage: `url(${character.url})` }}
      ref={hoverWrapperRef}
      onMouseEnter={cardTransHover}
      onMouseLeave={cardTransOut}
      {...props}
    >
      <ShareModal
        visible={socialShareModal}
        onClose={() => setSocialShareModal(false)}
      />
      <div
        className={`${styles.card_title_overlay}`}
        ref={bioParentWrapperRef}
        style={{ transform: `translateY(${wrapperTransY}px)` }}
      >
        <div
          className={`${styles.card_title} flex justify-between items-center`}
          ref={titleWrapperRef}
        >
          <div className={`${styles.card_title_text} mr-[25px]`}>
            {character.title}
          </div>
          <div className="text-[#ffffff] flex items-center">
            <div
              className={`cursor-pointer mr-[20px] ${styles.shareSvg}`}
              onClick={() => setSocialShareModal(true)}
            >
              <ShareSVG />
            </div>
            <div className={`cursor-pointer ${styles.lensSvg}`}>
              <LensSvg />
            </div>
          </div>
        </div>

        <div className={`${styles.showPrompt}`} ref={handleWrapperRef}>
          <div className={styles.id}>@{character.handle}</div>
          <div
            className="text-white cursor-pointer transition flex items-center gap-1"
            onClick={togglePrompt}
          >
            {promtStatusIcon} {promtStatusText}
          </div>
        </div>

        <div className={`${styles.description}`} ref={descriptionWrapperRef}>
          {character.description}
        </div>
      </div>
    </div>
  );
}
