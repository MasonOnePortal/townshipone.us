"use client";
import style from "./MainCategory.module.css";
import clickArrow from "@/public/imgs/click-arrow.svg";
import Link from "next/link";
import Image from "next/image";
function MainCatgoryItem({ item }) {
  return (
    <div className={style.category_Outer_wrap}>
      <Link className="url_link" href={`${item.URL}`}>
        <div
          className={`${style.wrap_category_data} ${
            item.id % 2 === 0 ? style.diff_bg_clr : ""
          }`}
        >
          <h4>{item.name}</h4>
          <Image
            className={style.cat_img}
            src={item.avatar}
            width={0}
            height={0}
            sizes="100dvw"
            alt={item.alt}
          />
          <Image
            className={style.link_arrow}
            width={0}
            height={0}
            sizes="100dvw"
            src={clickArrow}
            alt={item.alt}
          />
        </div>
      </Link>
    </div>
  );
}

export default MainCatgoryItem;
