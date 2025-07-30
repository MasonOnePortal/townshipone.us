"use client";
import React from "react";
import second from "@/public/img/b_details.webp";
import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useParams } from "next/navigation";
import DetailProfile from "@/components/details-page/DetailProfile";
import style from "@/components/details-page/details.module.css";
import Description from "@/components/details-page/Description";
import Amenities from "@/components/details-page/Amenities";
import ContactInfo from "@/components/details-page/ContactInfo";
import OpenHoursList from "@/components/details-page/OpenHoursList";
import GalleryImages from "@/components/details-page/img-galley/GalleryImages";
import Video from "@/components/details-page/video-gallery/Video";
import RatingRaview from "@/components/details-page/reviews/RatingRaview";
import { isEmpty } from "lodash";
import { useGetBusinessQuery } from "@/store/business/businessService";
import { Loading } from "../Loading";
import { notFound } from "next/navigation";
import { RecentNews } from "../blog/RecentNews";
import { useGetRecentAllOffersQuery } from "@/store/offers/offerService";
import { useSelector } from "react-redux";
import Content from "../card/Content";
import ProductItemsWrapper from "../details-page/our-food-items/ProductItemsWrapper";
import { isArrayEmptyOrWhitespace } from "@/utils/helperFn";

function DetailsPage() {
  const { businessID } = useParams();
  const { currentUser } = useSelector((state) => state.auth);
  const {
    data: businessInfo,
    isError,
    isLoading,
  } = useGetBusinessQuery(businessID);

  const { data: businessOffers } = useGetRecentAllOffersQuery(businessID);
  if (isError) return notFound();
  if (isLoading) return <Loading />;
  return (
    <>
      <div>
        <Banner img={second} bannerHeading={"Business Detail Page"} />
        <Breadcrumb pagename="Business Details" />
        <div className="container">
          <Content contentData="Discover the perfect blend of quality and convenience with local businesses, offering exceptional services and products." />
        </div>

        <div className={style.profile_hdr_wrap}>
          {isEmpty(businessInfo) ? null : (
            <div className="container">
              <DetailProfile dataInfo={businessInfo} />
            </div>
          )}
        </div>
        <div className={style.bg_details_page}>
          <div className="container">
            <div className="row">
              <div className="col-lg-9 mb-4">
                <Description description={businessInfo?.description} />
                {businessInfo?.amenities?.length ? (
                  <Amenities
                    key="amenities"
                    amenities={businessInfo?.amenities}
                  />
                ) : null}
                {!isEmpty(businessOffers) ? (
                  <ProductItemsWrapper offers={businessOffers} />
                ) : null}
                {businessInfo.images?.length ? (
                  <GalleryImages images={businessInfo?.images} />
                ) : null}

                {!isArrayEmptyOrWhitespace(businessInfo.videos) ? (
                  <Video videos={businessInfo.videos} />
                ) : null}
                <RatingRaview {...businessInfo} />
              </div>

              <div className="col-lg-3">
                <ContactInfo dataInfo={businessInfo} />
                <OpenHoursList
                  dataInfo={
                    businessInfo?.timetable ? businessInfo?.timetable : {}
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
