import React from "react";
import styles from "./Vote.module.scss";
import style from "./TrendingThemeDefault.module.scss";
import ThrendingThemeSvg from "./svg/ThrendingThemeSvg";

function TrendingThemeDefault(props) {
  const selectedTheme =  props.selectedTheme;
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
        <div className={`${style.themesNameAnimation}`}>
          <div className="flex items-center justify-center">
            <div className={`${styles.yellow} gap-[5px]`}>
              <span className="text-[25px] md:text-[35px]">
                Trending Themes
              </span>
            </div>
            <span className="pl-[10px]">
              <ThrendingThemeSvg />
            </span>
          </div>
          <div className="flex items-center justify-center mt-[10px]">
            {themesData.map((item, index) => (
              <div className="flex items-center" key={index}>
                <span className={`text-[30px] md:text-[54px] font-bold ${selectedTheme === item.themeName ? 'text-[#fff]' : 'text-[#ffffff99]'}`}>
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
