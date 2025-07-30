"use client";
import React, { useEffect, useState } from "react";
import style from "./our-food-items.module.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

function GalleryImages({ images }) {
  const [imagesArray, setImagesArray] = useState([]);

  useEffect(() => {
    if (images?.length) {
      const transformedArray = images?.map((item) => ({
        original: item,
        thumbnail: item,
      }));
      setImagesArray(transformedArray);
    }
  }, [images]);
  const settings = {
    infinite: false,
    showPlayButton: false,
    showBullets: false,
    showThumbnails: imagesArray?.length > 1 ? true : false,
  };
  return (
    <>
      <div className={style.info_itm_wrp}>
        <div className="card mt-4">
          <div className={`card-header ${style.card_header}`}>
            <h3>Photos</h3>
          </div>
          <div>
            <div className="card-body">
              {imagesArray && imagesArray.length > 0 ? (
                <>
                  <ImageGallery {...settings} items={imagesArray} />
                </>
              ) : (
                <>
                  <p>Not available yet</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GalleryImages;
