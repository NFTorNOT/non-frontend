import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HallOfFlame.module.scss";

const imageArr = [
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
  'https://static.plgworks.com/assets/images/hon/tree.jpg',
];

function HallOfFlame(props) {
  return (
    <div className={`${styles.container}`}>
      <div className="font-bold text-[20px] leading-[32px] text-[#ffffff]">
        Hall of Flame
      </div>
      <div className={`${styles.carousel} mt-[17px]`}>
        {/* <button>prev</button>
        <button>next</button> */}
        <div className={styles.carouselItems}>
          <div className={`${styles.carouselItem}`}>
            <Image
              className={styles.carouselImage}
              src="https://static.plgworks.com/assets/images/hon/tree.jpg"
              alt="Lens Icon"
              width="30"
              height="30"
            />
          </div>
          <div className={styles.carouselItem}>
            <Image
              src="https://static.plgworks.com/assets/images/non/generate-default.png"
              alt="Lens Icon"
              width="30"
              height="30"
            />
          </div>
          <div className={styles.carouselItem}>
            <Image
              src="https://static.plgworks.com/assets/images/non/generate-default.png"
              alt="Lens Icon"
              width="30"
              height="30"
            />
          </div>
          <div className={styles.carouselItem}>
            <Image
              src="https://static.plgworks.com/assets/images/non/generate-default.png"
              alt="Lens Icon"
              width="30"
              height="30"
            />
          </div>
          <div className={styles.carouselItem}>
            <Image
              src="https://static.plgworks.com/assets/images/non/generate-default.png"
              alt="Lens Icon"
              width="30"
              height="30"
            />
          </div>
          <div className={styles.carouselItem}>
            <Image
              src="https://static.plgworks.com/assets/images/non/generate-default.png"
              alt="Lens Icon"
              width="30"
              height="30"
            />
          </div>
          <div className={styles.carouselItem}>
            <Image
              src="https://static.plgworks.com/assets/images/non/generate-default.png"
              alt="Lens Icon"
              width="30"
              height="30"
            />
          </div>
          <div className={styles.carouselItem}>
            <Image
              src="https://static.plgworks.com/assets/images/non/generate-default.png"
              alt="Lens Icon"
              width="30"
              height="30"
            />
          </div>
          <div className={styles.carouselItem}>
            <Image
              src="https://static.plgworks.com/assets/images/non/generate-default.png"
              alt="Lens Icon"
              width="30"
              height="30"
            />
          </div>
          <div className={styles.carouselItem}>
            <Image
              src="https://static.plgworks.com/assets/images/non/generate-default.png"
              alt="Lens Icon"
              width="30"
              height="30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HallOfFlame;
