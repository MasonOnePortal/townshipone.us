"use client";
import Link from "next/link";
import style from "./blog.module.css";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import Image from "next/image";
import { useState } from "react";

export const RecentNews = ({ title, dataArr }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <>
      <div className={style.wrap_blg_cat}>
        <div className={style.blg_side_hdng}>
          <h3>{title}</h3>
        </div>
        <ul className={style.recent_news}>
          {dataArr?.map((item) => (
            <li className="d-flex" key={item.id}>
              <Link className="d-flex" href={`/news/${item.id}`}>
                <div>
                  <Image
                    src={
                      imageError ? imgPlaceHolder : item.image || imgPlaceHolder
                    }
                    onError={handleImageError}
                    alt="new_logo"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h3>{item.name}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
