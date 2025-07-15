"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import BannerSliderImg from "./BannerSliderImg";
import styles from "./Slider.module.css";
export default function BannerSlider() {
  const [sliderGeneralLinks, setSliderGeneralLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // API call to fetch slider data
    fetch("https://masonone.us:5000/api/v1/content_setting/slider")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        return response.json();
      })
      .then((data) => {
        setSliderGeneralLinks(data); // Assuming the API returns an array of slider items
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []); // Empty dependency array ensures this runs once on component mount

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    useTransform: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // <-- Enable arrows (left/right buttons)
  };

  if (isLoading) {
    return <div className={`${styles.banner_slider} placeholder`} />;
  }

  if (isError) {
    return <div>Error loading banner slider</div>;
  }

  console.log("====================================");
  console.log("sliderGeneralLinks", sliderGeneralLinks);
  console.log("====================================");

  return (
    <Slider {...settings} className={`${styles.banner_slider}`}>
      {sliderGeneralLinks.data?.map((item) => (
        <BannerSliderImg key={item.id} data={item} />
      ))}
    </Slider>
  );
}
