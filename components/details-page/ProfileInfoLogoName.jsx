"use client";
import brnslogo from "@/public/imgs/blank.svg";
import OverAllRating from "./OverAllRating";
import style from "./details.module.css";
import { FaCircleCheck, FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

function ProfileInfoLogoName({ basicInfo }) {
  const location = `${basicInfo?.address} ${basicInfo?.city} ${basicInfo?.state}  ${basicInfo?.zipCode}`;

  return (
    <>
      <div>
        <div className="row align-items-center">
          <div className="col-lg-2 col-md-2">
            <div className={` position-relative ${style.brands_logo}`}>
              <Image
                src={basicInfo.avatar ? basicInfo?.avatar : brnslogo}
                alt="business logo"
                objectFit="cover"
                fill
                className={style.brands_logo_img}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = brnslogo;
                }}
              />

              {basicInfo.approvalStatus === "Verified" ? (
                <MdVerified size={20} className="verified_icon" />
              ) : null}
            </div>
          </div>
          <div className="col-lg-10 col-md-10">
            <div className={style.prfl_text_inf}>
              <h3>
                <div className="d-flex">
                  {basicInfo?.name}
                  <div>
                    <span className={style.verifieds}>E-Commerce Enabled </span>

                    <span
                      className={`${
                        basicInfo.eCommerceEnabled === "Yes"
                          ? "bg_light_successes"
                          : `${
                              basicInfo.eCommerceEnabled === "No"
                                ? "bg_light_dangers"
                                : "bg_light_warn"
                            }`
                      }`}
                    >
                      {basicInfo.eCommerceEnabled === "Yes" ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </h3>
              <ul className={style.prf_adrs}>
                <li>
                  <FaLocationDot />
                  {location}
                </li>
              </ul>

              <div>
                <OverAllRating basicInfo={basicInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileInfoLogoName;
