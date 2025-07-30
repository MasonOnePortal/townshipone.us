import Link from "next/link";
import Image from "next/image";
import Bed from "@/public/imgs/bed.svg";
import Bathroom from "@/public/imgs/bathroom.svg";
import Sqft from "@/public/imgs/sqft.svg";
import Uploadby from "@/public/imgs/upload-by.svg";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import { useState } from "react";

import { FaCalendarAlt } from "react-icons/fa";
import { formatDateNew } from "@/utils/helperFn";
import { MdAccessTime } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa6";
function RealEstateitem({ item }) {
  // RealEstate Property Availiable badges

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatArea = (area) => {
    const regex = /\d+\s*[a-zA-Z]+/;
    return regex.test(area) ? area : `${area} sqft`;
  };

  return (
    <>
      <div className="realEstate_itme ">
        <div className="realEstate_img dsfsdf">
          <a href="#">
            <Image
              src={
                imageError ? imgPlaceHolder : item.thumbnail || imgPlaceHolder
              }
              onError={handleImageError}
              priority={false}
              placeholder="empty"
              alt={item.name}
              height={180}
              width={220}
              style={{ width: "100%", height: "180px" }}
            />
          </a>
          {!!item.availableDate ? (
            <div className="field_title">
              <FaCalendarAlt />
              <span className="date_val">
                {" "}
                {formatDateNew(item.availableDate)}
              </span>
            </div>
          ) : null}
        </div>
        <div className="realEstate_text_data position-relative ">
          {item.isPromoted && (
            <h6 className="promoted-badge">
              <i> Promoted</i>
            </h6>
          )}

          <h3 style={{ paddingRight: "10%" }}>{item.name}</h3>

          <p className="discription_real_estate">{item.description}</p>

          <div className=" align-items-start beds_bath_sqft beds_bath_sqft_height flex-wrap">
            {item.bedroom ? (
              <div className="d-flex align-items-center">
                <div>
                  <Image
                    src={Bed}
                    alt="bed_icon"
                    height={0}
                    width={0}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div>
                  <p>{item.bedroom} Beds</p>
                </div>
              </div>
            ) : null}
            {item.bathroom ? (
              <div className="d-flex align-items-center">
                <div>
                  <Image
                    src={Bathroom}
                    alt="toilet_icon"
                    height={0}
                    width={0}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div>
                  <p>{item.bathroom} Bath</p>
                </div>
              </div>
            ) : null}
            {item.area ? (
              <div className="d-flex align-items-center">
                <div>
                  <Image
                    src={Sqft}
                    alt="area_icon"
                    height={0}
                    width={0}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div>
                  <p>{formatArea(item?.area)}</p>
                </div>
              </div>
            ) : null}
            {item.propertyAvailable ? (
              <div className="d-flex align-items-center">
                <div
                  className="realEstateIcon"
                  style={{ backgroundColor: "#edf1f9" }}
                >
                  <FaRegBuilding className="toilet_icon  " />
                </div>
                <div>
                  <p>{item.propertyAvailable}</p>
                </div>
              </div>
            ) : null}
          </div>
          <div className="d-flex align-items-center justify-content-between  uploadby_by">
            <div className="d-flex align-items-center flex-wrap beds_bath_sqft_height ">
              <div className="d-flex align-items-center">
                <div>
                  <Image
                    src={Uploadby}
                    alt="type_icon"
                    height={50}
                    width={50}
                  />
                </div>
                <div>
                  <p>{item.propertyType}</p>
                </div>
              </div>
              <div className="d-flex align-items-center ms-2">
                <div className="list_cal_re">
                  <FaCalendarAlt />
                  <span className="ms-1">Listed : </span>
                </div>
                <div>
                  <p className="ms-1">{formatDateNew(item.createdAt)}</p>
                </div>
              </div>
              {!!item.availableDate ? (
                <div className="d-flex align-items-center ms-2">
                  <div className="list_cal_re">
                    <FaCalendarAlt />
                    <span className="ms-1">Available : </span>
                  </div>
                  <div>
                    <p className="ms-1">{formatDateNew(item?.availableDate)}</p>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="btn_view_dtls">
              <Link href={`/Real-Estate-and-Business-Listings-Mason-City-OH/${item.id}`}>View</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RealEstateitem;
