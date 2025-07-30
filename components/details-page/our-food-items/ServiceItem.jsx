"use client";
import React, { useState } from "react";
import style from "./our-food-items.module.css";
import Image from "next/image";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import { formatDateNew } from "@/utils/helperFn";
import Link from "next/link";
export const ServiceItem = ({ offer }) => {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <>
      <div className="page_cud_link">
        <Link className="" href={`/Deals-Discounts-and-Promotions-Mason-City-OH/${offer.id}`}>
          <div className={style.wrap_our_item_data}>
            <div className={style.our_items_img}>
              <Image
                src={
                  imageError ? imgPlaceHolder : offer.image || imgPlaceHolder
                }
                onError={handleImageError}
                alt="image"
                width={0}
                height={0}
                sizes="100dvw"
                style={{ width: "100%", height: "210px" }}
              />

   
              <>
                {!offer.discountPercentage ? null : (
                  <h6>{offer.discountPercentage} %</h6>
                )}
              </>
              <div className={style.overlay_prdt_cl}></div>
            </div>
            <div className={style.our_itm_dtls}>
              <h3>{offer.title}</h3>
              <div className="d-flex align-items-center expiry_time">
                <span className="me-1">Valid Date :</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                >
                  <path d="M360 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24zm-75.078 384H99.08c17.059-46.797 52.096-80 92.92-80 40.821 0 75.862 33.196 92.922 80zm.019-256H99.078C91.988 108.548 88 86.748 88 64h208c0 22.805-3.987 44.587-11.059 64z" />
                </svg>
                <span className="">{formatDateNew(offer.endDate)}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
