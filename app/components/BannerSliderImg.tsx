"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import sliderPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import styles from "./Slider.module.css";
function BannerSliderImg({ data }: any) {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setLoading(false);
  };

  useEffect(() => {
    if (data.image) {
      setLoading(false);
    }
  }, [data.image]);

  return (
    <div className={styles.wrap_banner_slider_data}>
      <Image
        src={imageError ? sliderPlaceHolder : data.image || sliderPlaceHolder}
        onError={handleImageError}
        placeholder="empty"
        priority={false}
        alt="List of our services in Mason City"
        width={1799}
        height={500}
        style={{ width: "100%", height: "500px" }}
        unoptimized // Disable Next.js image optimization
      />

      <div className={styles.banner_caption}>
        {data.title ? <h1>{data.title}</h1> : null}
        {data.description ? <p>{data.description}</p> : null}
        <div className={`d-flex justify-content-center ${styles.caption_btn}`}>
          {data.urlLink ? (
            <div className={styles.explore}>
              <Link href={`/${data.urlLink}`}>{data.buttonName}</Link>
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.banner_overlay}></div>
    </div>
  );
}

export default BannerSliderImg;
