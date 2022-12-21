import React from 'react';
import styles from "./Vote.module.scss";
import style from "./TrendingThemeDefault.module.scss";
import ThrendingThemeSvg from './svg/ThrendingThemeSvg';

function TrendingThemeDefault() {

    const themesData = [
        {
            "id": "1",
            "themeName": "Light"
        },
        {
            "id": "2",
            "themeName": "Space"
        },
        {
            "id": "3",
            "themeName": "Magical"
        }
    ];


    return (
        <>
            <div className={`${style.themesNameAnimation} flex items-center justify-center w-full h-full z-10`}>
                <div>
                    <div className='flex items-center justify-center'>
                        <div className={`${styles.yellow} gap-[5px]`}>
                            <span className='text-[30px]'>Trending Themes</span>
                        </div>
                        <span className='pl-[10px]'><ThrendingThemeSvg/></span>
                    </div>
                    <div className='flex items-center justify-center'>
                        {themesData.map((item, index) => (
                            <div className='flex items-center' key={index}>
                                <span className='text-[54px] text-[#fff] font-bold'> #{item.themeName}</span>
                                {index < 2 && <span className='px-[20px]'>
                                    <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" width="5" height="5" rx="2.5" fill="white" fillOpacity="0.6" />
                                    </svg>
                                </span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TrendingThemeDefault;