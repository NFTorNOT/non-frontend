import React from 'react';
import TopBar from '../TopBar';
import BottomTabSelector from '../BottomTabSelector';
import { useRouter } from "next/router";
import styles from '../Main/Main.module.scss';

export default function Layout({ children, ...props }) {
    const router = useRouter();
    const showNavBar = router.pathname !== "/404"
        && router.pathname !== "/50x"
        && router.pathname !== "/429"
        ;

    const showFooter = router.pathname !== "/404"
        && router.pathname !== "/50x"
        && router.pathname !== "/429"
        ;

    const getErrorUI = () => {
        return <div>{ children }</div>;
    }

    const getLayoutUI = () => {
        return ( 
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <TopBar />
                { children }
                <BottomTabSelector />
            </div>
        </div>
        );
    }
    return (
        <>
            {showNavBar && showFooter ? getLayoutUI() : getErrorUI() }
        </>
    )
}
