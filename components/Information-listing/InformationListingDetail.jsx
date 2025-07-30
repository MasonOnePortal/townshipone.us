"use client";
import propertybanner from "@/public/img/propertydetails.webp";
import { useParams } from "next/navigation";
import style from "../../components/details-page/details.module.css";
import Description from "@/components/details-page/Description";
import ContactInfo from "@/components/details-page/ContactInfo";

import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Propertygalleryimages from "@/components/details-page/img-galley/Propertygalleryimages";

import { Loading } from "@/components/Loading";
import { useGetOneInformationQuery } from "@/store/information-list/informationService";
import Content from "../card/Content";

function InformationListingDetail() {
  const params = useParams();
  const { deptId } = params;
  const { data: infoDetail, isLoading } = useGetOneInformationQuery(deptId);
  if (isLoading) return <Loading />;
  return (
    <>
      <div>
        <Banner img={propertybanner} bannerHeading="Information Detail" />
        <Breadcrumb pagename="Information Details" />

        <div className="container">
          {/* <Content contentData="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." /> */}
        </div>

        <div className={style.bg_details_page}>
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="my-3">
                  <h3>{infoDetail?.name}</h3>
                </div>
                <Description
                  description={infoDetail?.description}
                  propertyDescription="Information Description"
                />

                <Propertygalleryimages images={infoDetail?.images} />
              </div>
              <div className="col-lg-3">
                <ContactInfo dataInfo={infoDetail} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InformationListingDetail;
