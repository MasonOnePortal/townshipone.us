"use client";
import React, { useEffect, useState } from "react";
import style from "./our-food-items.module.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

function Propertygalleryimages({ images }) {
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
            {imagesArray.length ? (
              <div className="card-body">
                <ImageGallery {...settings} items={imagesArray} />
              </div>
            ) : (
              <p className="p-5 text-center">No Content Available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Propertygalleryimages;
