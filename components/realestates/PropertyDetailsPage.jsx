"use client";
import propertybanner from "@/public/img/propertydetails.webp";
import { useParams } from "next/navigation";
import style from "../../components/details-page/details.module.css";
import Description from "@/components/details-page/Description";
import ContactInfo from "@/components/details-page/ContactInfo";
import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Propertygalleryimages from "@/components/details-page/img-galley/Propertygalleryimages";
import DetailAddress from "@/components/details-page/DetailAddress";
import PropertyDetailFeatures from "@/components/details-page/PropertyDetailFeatures";
import { useGetOneRealEstateQuery } from "@/store/real-estate/realEstateService";
import { Loading } from "../Loading";
import { isEmpty } from "lodash";
import Video from "../details-page/video-gallery/Video";
import Content from "../card/Content";
import { isArrayEmptyOrWhitespace } from "@/utils/helperFn";

function PropertyDetailsPage() {
  const { propertyId } = useParams();
  const { data: realEstate, isLoading } = useGetOneRealEstateQuery(propertyId);
  if (isEmpty(realEstate) && isLoading) return <Loading />;
  return (
    <>
      <div>
        <Banner img={propertybanner} bannerHeading={""} />
        <Breadcrumb pagename="Real Estate Details" />
        <div className="container">
          <Content contentData="Experience city living at its finest in this delightful town property, where comfort meets convenience amidst picturesque urban landscapes." />
        </div>

        <div className={style.bg_details_page}>
          <div className="container">
            <div className="row">
              <div className="col-lg-9 mb-4">
                <DetailAddress property={realEstate} />
                <Description description={realEstate?.description} />
                <PropertyDetailFeatures property={realEstate} />

                {realEstate?.images && realEstate.images.length > 0 ? (
                  <Propertygalleryimages images={realEstate.images} />
                ) : null}
                {!isArrayEmptyOrWhitespace(realEstate.videos) ? (
                  <Video videos={realEstate.videos} />
                ) : null}
              </div>
              <div className="col-lg-3">
                <ContactInfo dataInfo={realEstate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyDetailsPage;
