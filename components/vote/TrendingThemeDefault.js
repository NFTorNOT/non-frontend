import React, { useState } from "react";
import styles from "./TrendingTheme.module.scss";
import TrendingThemeSvg from "./svg/TrendingThemeSvg";
import { CURRENT_TRENDING_THEMES } from "../../utils/Constants";

function TrendingThemeDefault({
  selectedTheme,
  trendingThemes,
  showTrendingThemeModal,
}) {
  const currentTrendingThemes = CURRENT_TRENDING_THEMES;
  const [shouldShowThemeInBold, setShouldShowdThemeInBold] = useState(true);

  setTimeout(() => {
    setShouldShowdThemeInBold(false);
  }, 3000);

  return (
    <>
      <div className={`flex items-center justify-center w-full z-10`}>
        <div className={`${styles.themesNameAnimation}`}>
          <div
            className="flex items-center justify-center text-[20px] md:text-[40px] gap-[5px] cursor-pointer"
            onClick={() => showTrendingThemeModal()}
          >
            {shouldShowThemeInBold ? (
              <div className={`${styles.themeBoldHeading}`}>
                Trending Themes
              </div>
            ) : (
              <div className={`${styles.themeHeading}`}>Trending Themes</div>
            )}
            <TrendingThemeSvg />
          </div>
          <div className="flex items-center justify-center mt-[10px] pb-[50px]">
            {currentTrendingThemes.map((item, index) => (
              <div className="flex items-center" key={index}>
                {shouldShowThemeInBold ? (
                  <>
                    <span
                      className={`text-[32px] md:text-[48px] six text-[#fff] capitalize font-bold font-500`}
                    >
                      {" "}
                      #{item.name}
                    </span>
                    {index < currentTrendingThemes.length - 1 && (
                      <span className="px-[20px]">
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 6 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            width="5"
                            height="5"
                            rx="2.5"
                            fill="white"
                            fillOpacity="1"
                          />
                        </svg>
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span
                      className={`text-[30px] md:text-[48px] capitalize ${
                        selectedTheme == item.name
                          ? "text-[#fff] font-bold"
                          : "text-[#ffffff99] font-500"
                      }`}
                    >
                      {" "}
                      #{item.name}
                    </span>
                    {index < currentTrendingThemes.length - 1 && (
                      <span className="px-[20px]">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 6 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            width="5"
                            height="5"
                            rx="2.5"
                            fill="white"
                            fillOpacity="0.6"
                          />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrendingThemeDefault;
