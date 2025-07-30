import Slider from "react-slick";
import BannerSliderImg from "./BannerSliderImg";
import { useGetAllFooterOfPostQuery } from "@/store/footer/footerServices";

export default function BannerSlider() {
  const {
    data: sliderGeneralLinks,
    isError,
    isLoading,
  } = useGetAllFooterOfPostQuery();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    useTransform: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (isLoading) {
    return <div className="banner_slider placeholder" />;
  }

  if (isError) {
    return <div>Error loading banner slider</div>;
  }

  return (
    <Slider {...settings} className="banner_slider">
      {sliderGeneralLinks?.map((item) => (
        <BannerSliderImg key={item.id} data={item} />
      ))}
    </Slider>
  );
}
