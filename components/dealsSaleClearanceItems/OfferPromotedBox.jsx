"use client";

import style from "@/components/details-page/our-food-items/our-food-items.module.css";
import Image from "next/image";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import { useState } from "react";
import Link from "next/link";
import { updateBusinessName } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
export const OfferPromotedBox = ({ offer }) => {
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const handleImageError = () => {
    setImageError(true);
  };
  console.log(offer);
  return (
    <div className="offer_ars">
      <Link href={`/Deals-Discounts-and-Promotions-Mason-City-OH/${offer.id}`}>
        <div
          onClick={() => dispatch(updateBusinessName(offer?.business))}
          className={style.wrap_our_item_data}
        >
          <div className={style.our_items_img}>
            <Image
              src={imageError ? imgPlaceHolder : offer?.image || imgPlaceHolder}
              onError={handleImageError}
              alt={`${offer.title} , ${offer?.business?.name}`}
              width={0}
              height={0}
              priority={false}
              placeholder="empty"
              sizes="100dvw"
              style={{ width: "100%", height: "210px" }}
            />
            <h6>{offer?.offerType?.name}</h6>
            <div className={style.overlay_prdt_cl}></div>
          </div>
          <div className={style.our_itm_dtls}>
            <h3 className="pb-0">
              <span className="pb-0">Offer :</span>
              {offer?.title}
            </h3>
            <h3>
              <span>Business :</span>
              {offer?.business?.name}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};
