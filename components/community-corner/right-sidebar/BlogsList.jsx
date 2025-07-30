"use client";

import style from "@/components/blog/blog.module.css";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
export const BlogsList = ({ urlPage, title, dataArr }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);
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
                    onError={handleImageError}
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
