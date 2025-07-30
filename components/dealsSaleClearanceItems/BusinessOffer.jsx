import style from "../details-page/details.module.css";
import { FaGlobe, FaLocationDot, FaPhone } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import brnslogo from "@/public/imgs/blank.svg";
import { MdVerified } from "react-icons/md";
function BusinessOffer({ basicInfo }) {
  const location = `${basicInfo?.address} ${basicInfo?.city} ${basicInfo?.state}   ${basicInfo?.zipCode}`;
  return (
    <>
      <div>
        <div className="">
          <div className="d-flex justify-content-center">
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
          <div className="">
            <div className={style.prfl_text_inf}>
              <h5 className="mb-1">{basicInfo?.name}</h5>
              <ul className={style.off_busi_info}>
                <li className="d-flex align-items-center">
                  <FaLocationDot color="#5f7693" className={style.prfl_link} />
                  <Link
                    href={`https://www.google.com/maps/search/${encodeURI(
                      `${location}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {location}
                  </Link>
                </li>
                {basicInfo.phone ? (
                  <li className="d-flex align-items-center">
                    <Link
                      href={`tel:+${basicInfo?.phone}`}
                      className={style.prfl_link}
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <FaPhone />
                        </div>
                        <p className="mb-0">{basicInfo.phone}</p>
                      </div>
                    </Link>
                  </li>
                ) : null}
                {basicInfo.website ? (
                  <li className="d-flex align-items-center">
                    <Link
                      href={`${basicInfo?.website}`}
                      target="_blank"
                      className={style.prfl_link}
                    >
                      <div className="d-flex ">
                        <div>
                          <FaGlobe />
                        </div>
                        <p className={`mb-0 ${style.webStyl}`}>
                          {basicInfo.website}
                        </p>
                      </div>
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessOffer;
