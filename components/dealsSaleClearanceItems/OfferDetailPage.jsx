"use client";
import { useGetOneOfferQuery } from "@/store/offers/offerService";
import { useParams } from "next/navigation";
import { Loading } from "@/components/Loading";
import "./styles.css";
import Banner from "../banner/Banner";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

import { formatDateNew, isArrayEmptyOrWhitespace } from "@/utils/helperFn";
import BusinessOffer from "./BusinessOffer";
import Image from "next/image";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import { isEmpty } from "lodash";
import { Button } from "react-bootstrap";

import { useRouter } from "next/navigation";
import Content from "../card/Content";
import Video from "../details-page/video-gallery/Video";
import GalleryImages from "../details-page/img-galley/GalleryImages";
import Amenities from "../details-page/Amenities";
// import { useSelector } from "react-redux";
const OfferDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  // const businessName = useSelector((state) => state.businessName);
  const { data: offerDetails, isError, isLoading } = useGetOneOfferQuery(id);

  if (isLoading) return <Loading />;
  if (isError || !offerDetails) {
    return <div>Error fetching offer details</div>;
  }
  const buid = offerDetails?.business?.id;
  const coteId = offerDetails?.business?.category;

  const handleShow = () => {
    router.push(`/businesses/${coteId}/${buid}`);
  };
  return (
    <>
      <div>
        <Banner bannerHeading="Deals, Sale, Clearance & Promotions " />
        <Breadcrumb
          pagename={`${offerDetails.business.name} && ${offerDetails.title} `}
        />
      </div>
      <div className="container">
        <Content contentData="Deals, Sales, Clearance, and Promotions are currently live! Take advantage of these ongoing offers and enjoy significant savings on a wide range of products. Whether you’re looking for clearance discounts or limited-time promotions, now’s the perfect time to grab the best deals!" />
      </div>
      <div className="promocode_details">
        <div className="container">
          <div className="styl_btn">
            <Button
              className=" rt_r_cl_btn"
              variant="primary"
              type="button"
              // onClick={handleBack}
              onClick={() => router.back()}
            >
              Back
            </Button>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <div className="promo_dec_left">
                <div className="main_info_promo">
                  <div className="row">
                    <div className="col-lg-4">
                      <Image
                        src={
                          offerDetails.image
                            ? offerDetails.image
                            : imgPlaceHolder
                        }
                        alt={offerDetails.title}
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className="col-lg-8">
                      <div className="promo_r_sec">
                        <h2>{offerDetails.title}</h2>

                        <div className="promo_tbl">
                          <table className="table table-borderless">
                            <tbody>
                              <tr>
                                <th>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 576 512"
                                  >
                                    <path d="M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z" />
                                  </svg>
                                  Promo Code
                                </th>
                                <td>
                                  <div className="d-flexflex-wrap">
                                    <span className="coupon_value">
                                      {offerDetails.couponCode}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 640 512"
                                  >
                                    <path d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z" />
                                  </svg>{" "}
                                  Discount
                                </th>
                                <td>
                                  Upto {offerDetails.discountPercentage}%
                                  Cashback
                                </td>
                              </tr>
                              <tr>
                                <th>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 384 512"
                                  >
                                    <path d="M360 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24zm-75.078 384H99.08c17.059-46.797 52.096-80 92.92-80 40.821 0 75.862 33.196 92.922 80zm.019-256H99.078C91.988 108.548 88 86.748 88 64h208c0 22.805-3.987 44.587-11.059 64z" />
                                  </svg>{" "}
                                  Valid till Date
                                </th>
                                <td>{formatDateNew(offerDetails.endDate)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {Array.isArray(offerDetails?.products) &&
                offerDetails?.products?.length > 0 ? (
                  <Amenities
                    title="Products / Services"
                    amenities={offerDetails.products}
                  />
                ) : null}
                {Array.isArray(offerDetails?.images) &&
                offerDetails?.images.length ? (
                  <GalleryImages images={offerDetails?.images} />
                ) : null}
                {!isArrayEmptyOrWhitespace(offerDetails.videos) ? (
                  <Video videos={offerDetails.videos} />
                ) : null}

                <div className="card mt-4">
                  <div className="card-header _card_header_1sarr_19">
                    <h5>Description</h5>
                  </div>
                  <div>
                    <div className="card-body">
                      <p>{offerDetails.description}</p>
                    </div>
                  </div>
                </div>

                <div className="card mt-4">
                  <div className="card-header _card_header_1sarr_19">
                    <h5>Teams and Conditions</h5>
                  </div>
                  <div>
                    <div className="card-body">
                      <p>{offerDetails.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              {!isEmpty(offerDetails.business) ? (
                <div className="card">
                  <div className="card-header _card_header_1sarr_19">
                    <div className="">
                      <h5>Business </h5>
                    </div>
                  </div>
                  <div className="card-body custom_body">
                    <div className="row">
                      <BusinessOffer basicInfo={offerDetails.business} />
                    </div>
                    <div className="col-12 btns_styl">
                      <Button
                        className=" rt_r_cl_btn"
                        variant="primary"
                        type="button"
                        onClick={handleShow}
                      >
                        Visit now
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferDetailPage;
