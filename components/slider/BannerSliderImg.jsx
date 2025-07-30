import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import sliderPlaceHolder from "@/public/imgs/PlaceHolder.jpg";

function BannerSliderImg({ data }) {
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
    <div className="wrap_banner_slider_data">
      <Image
        src={imageError ? sliderPlaceHolder : data.image || sliderPlaceHolder}
        onError={handleImageError}
        placeholder="empty"
        priority={false}
        alt="List of our services in Township City"
        width={1799}
        height={500}
        style={{ width: "100%", height: "500px" }}
      />

      <div className="banner_caption">
        {data.title ? <h1>{data.title}</h1> : null}
        {data.description ? <p>{data.description}</p> : null}
        <div className="d-flex justify-content-center caption_btn">
          {data.urlLink ? (
            <div className="explore">
              <Link href={`/${data.urlLink}`}>{data.buttonName}</Link>
            </div>
          ) : null}
        </div>
      </div>
      <div className="banner_overlay"></div>
    </div>
  );
}

export default BannerSliderImg;
