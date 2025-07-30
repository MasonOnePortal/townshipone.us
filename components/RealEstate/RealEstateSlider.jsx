import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ViewAll from "../ViewAllBtn/ViewAll";
import RealEstateitem from "./RealEstateItem";
import { Loading } from "@/components/Loading";
import { useGetAllPromotedRealEstatesQuery } from "@/store/real-estate/realEstateService";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";

function RealEstateSlider() {
  const router = useRouter();
  const { data: realEstates, isLoading } = useGetAllPromotedRealEstatesQuery({
    query: 1,
    pageSize: 12,
  });

  if (isLoading) return <Loading />;
  if (isEmpty(realEstates)) return null;
  var realEstate = {
    dots: false,
    infinite: realEstates?.length > 4 ? true : false,
    speed: 500,
    autoplay: false,
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
  const propertyDetailHandler = (ID) => {
    router.push(`/Real-Estate-and-Business-Listings-Mason-City-OH/${ID}`);
  };

  return (
    <div className="realEstate_slide_wrap">
      <div className="container">
        <div className="section_Heading">
          <h2>Local Real Estate Listings</h2>
        </div>
        <div className="wrap_job_slider_data real_estate_home_Card">
          <Slider {...realEstate}>
            {Array.isArray(realEstates) &&
              realEstates?.slice(0, 10)?.map((item) => (
                <div
                  className="slider_home"
                  onClick={() => propertyDetailHandler(item.id)}
                  key={item.id}
                >
                  <RealEstateitem item={item} />
                </div>
              ))}
          </Slider>
        </div>

        <div className="text-center mt-3">
          <ViewAll url="/Real-Estate-and-Business-Listings-Mason-City-OH" />
        </div>
      </div>
    </div>
  );
}

export default RealEstateSlider;
