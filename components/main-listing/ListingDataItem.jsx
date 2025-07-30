import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import style from "./main-listing.module.css";
import arrow from "@/public/imgs/arrow_icon.svg";
import category_placeholder from "@/public/imgs/PlaceHolder.jpg";
import { usePathname } from "next/navigation";
function ListingDataItem({ item }) {
  const pathname = usePathname();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <>
      <div>
        <div className="wrap_lst_data">
          <ul className={style.wrap_lst_ul}>
            <li className={style.list_data_item}>
              <div className={`row ${style.wrpa_row_mk}`}>
                <div className={`col-lg-4 col-md-5 ${style.clm_style}`}>
                  <div className={style.img_area_lst}>
                    <Image
                      src={
                        imageError
                          ? category_placeholder
                          : item.thumbnail || category_placeholder
                      }
                      onError={handleImageError}
                      alt={item?.name}
                      height={0}
                      width={0}
                      sizes="100dvw"
                      style={{ width: "100%", height: "200px" }}
                    />
                  </div>
                </div>
                <div className={`col-lg-6 col-md-7 ${style.clm_style}`}>
                  <div className={style.lst_txt_area}>
                    <h3>{item?.name}</h3>
                    <p>{item?.description}</p>
                    <ul className={style.tag_lst_h}>
                      {item?.amenities?.map((item, index) => (
                        <li key={index}>
                          <a href="#">{item} </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={`col-lg-2 ${style.clm_style}`}>
                  <div className={style.lts_rght}>
                    <div className={style.btn_rght_arrow}>
                      <Link href={`${pathname}/${item.id}`}>
                        View Detail
                        <Image
                          src={arrow}
                          alt="arrow"
                          height={0}
                          width={0}
                          style={{ width: "auto", height: "auto" }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ListingDataItem;
