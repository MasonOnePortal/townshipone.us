import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Loading } from "@/components/Loading";

import { isEmpty } from "lodash";
import { useGetPromotedBusinessesQuery } from "@/store/business/businessService";
import { NewBusinessListing } from "../all-business-listing/NewBusinessListing";
function BusinessListing() {
  const { data: offers, isLoading } = useGetPromotedBusinessesQuery();
  if (isLoading) return <Loading />;
  if (offers === undefined || isEmpty(offers)) return null;
  var offersSetting = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: offers?.length > 4 ? true : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="realEstate_slide_wrap">
      <div className="container">
        <div className="section_Heading">
          <h2 className="mb-2">Featured Business Promotions</h2>
        </div>
        <Slider {...offersSetting}>
          {Array.isArray(offers) &&
            offers.map((item, index) => (
              <div key={item.id} className="px-2">
                <NewBusinessListing offer={item} />
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}

export default BusinessListing;
