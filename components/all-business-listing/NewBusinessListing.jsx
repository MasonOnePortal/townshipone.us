"use client";

import style from "@/components/details-page/our-food-items/our-food-items.module.css";
import styles from "../main-listing/main-listing.module.css";

import Image from "next/image";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import { useState } from "react";
import Link from "next/link";
import { updateBusinessName } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

import ViewDetail from "../ViewAllBtn/ViewDetail";
export const NewBusinessListing = ({ offer }) => {
  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch();
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="offer_ars">
      <div
        onClick={() => dispatch(updateBusinessName(offer.business))}
        className={style.wrap_our_item_data}
      >
        <div className={style.our_items_img}>
          <Image
            src={
              imageError ? imgPlaceHolder : offer.thumbnail || imgPlaceHolder
            }
            onError={handleImageError}
            alt={offer.name}
            width={0}
            height={0}
            sizes="100dvw"
            style={{ width: "100%", height: "210px" }}
          />

          <div className={style.overlay_prdt_cl}></div>
        </div>
        <div className={style.our_itm_dtls}>
          <h3>{offer.name}</h3>
          <p className={styles.p_styl}>{offer.description}</p>
          <ul className={styles.tag_lst_h}>
            {offer?.amenities?.map((offer, index) => (
              <li key={index}>
                <a href="#">{offer} </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-left mt-3">
          <ViewDetail url={`/businesses/${offer.category?.id}/${offer.id}`} />
        </div>
      </div>
    </div>
  );
};
