"use client";

import style from "./blog.module.css";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import Image from "next/image";
import Link from "next/link";
export const RecentNews = ({ urlPage, title, dataArr }) => {
  return (
    <>
      <div className={style.wrap_blg_cat}>
        <div className={style.blg_side_hdng}>
          <h3>{title}</h3>
        </div>
        <ul className={style.recent_news}>
          {dataArr?.map((item) => (
            <li className="d-flex" key={item.id}>
              <Link className="d-flex" href={`/${urlPage}/${item.id}`}>
                <div>
                  <Image
                    src={item.image ? item.image : imgPlaceHolder}
                    alt={item.name}
                    width={30}
                    height={30}
                    sizes="100dvw"
                    style={{ width: "50px", height: "40px" }}
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
