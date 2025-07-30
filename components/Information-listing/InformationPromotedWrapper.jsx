import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Loading } from "@/components/Loading";
import { isEmpty } from "lodash";
import ViewAll from "../ViewAllBtn/ViewAll";
import { useGetAllPromotedInformationQuery } from "@/store/information-list/informationService";
import { InformationCard } from "../card/InformationCard";
export const InformationPromotedWrapper = () => {
  const { data: info, isLoading } = useGetAllPromotedInformationQuery();

  if (isLoading) return <Loading />;

  if (isEmpty(info)) return null;

  var slideSetting = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: info.length > 4 ? true : false,
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
    <div className="container py-4">
      <div className="section_Heading">
        <h2 className="mb-2 pb-2">Information Listings</h2>
      </div>
      <div className="wrap_job_slider_data">
        <Slider {...slideSetting}>
          {Array.isArray(info) &&
            info.map((item, index) => (
              <div key={item.id} className="px-2">
                <InformationCard itemInfo={item} />
              </div>
            ))}
        </Slider>
      </div>
      <div className="text-center mt-3">
        <ViewAll url="informations" />
      </div>
    </div>
  );
};
