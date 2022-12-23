import React from "react";
import styles from "./TrendingTheme.module.scss";
import TrendingThemeSvg from "./svg/TrendingThemeSvg";

function TrendingThemeDefault(props) {
  const selectedTheme = props.selectedTheme;
  const themesData = [
    {
      id: "1",
      themeName: "Light",
    },
    {
      id: "2",
      themeName: "Space",
    },
    {
      id: "3",
      themeName: "Magical",
    },
  ];

  return (
    <>
      <div className={`flex items-center justify-center w-full z-10 absolute`}>
        <div className={`${styles.themesNameAnimation}`}>
          <div className="flex items-center justify-center text-[20px] md:text-[40px] gap-[5px]">
            <div className={`${styles.themeHeading}`}>Trending Themes</div>
            <TrendingThemeSvg />
          </div>
          <div className="flex items-center justify-center mt-[10px]">
            {themesData.map((item, index) => (
              <div className="flex items-center" key={index}>
                <span
                  className={`text-[30px] md:text-[48px] font-bold ${
                    selectedTheme === item.themeName
                      ? "text-[#fff]"
                      : "text-[#ffffff99]"
                  }`}
                >
                  {" "}
                  #{item.themeName}
                </span>
                {index < 2 && (
                  <span className="px-[20px]">
                    <svg
                      width="6"
                      height="5"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrendingThemeDefault;
