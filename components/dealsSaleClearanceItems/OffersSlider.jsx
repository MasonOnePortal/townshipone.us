import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Loading } from "@/components/Loading";
import { useGetAllPromotedOffersQuery } from "@/store/offers/offerService";
import ViewAll from "../ViewAllBtn/ViewAll";
import { OfferPromotedBox } from "./OfferPromotedBox";
import { isEmpty } from "lodash";
function OffersSlider() {
  const { data: offers, isLoading } = useGetAllPromotedOffersQuery();

  if (isLoading || !offers) return <Loading />;

  // addeded to show nothing when the data length is zero 
  if (offers?.length === 0) return null;

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
          <h2 className="mb-2">Deals, Sale, Clearance & Promotions</h2>
        </div>
        <div className="wrap_job_slider_data">
          <Slider {...offersSetting}>
            {Array.isArray(offers) &&
              offers.map((item, index) => (
                <div key={item.id} className="px-2">
                  <OfferPromotedBox offer={item} />
                </div>
              ))}
          </Slider>
        </div>
        <div className="text-center mt-3">
          <ViewAll url="deals-sale" />
        </div>
      </div>
    </div>
  );
}

export default OffersSlider;
