"use client";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import style from "./blog.module.css";
import { useBlogContent } from "@/context/BlogProvider";
import { useCallback } from "react";
export const BlogCategories = ({ title, listData }) => {
  const { updateName } = useBlogContent();
  const changeNameHandler = useCallback((val) => {
    updateName(val);
  }, []);
  return (
    <>
      <div className={style.wrap_blg_cat}>
        <div className={style.blg_side_hdng}>
          <h3>{title}</h3>
        </div>
        <ul className={style.cat_link}>
          {listData?.map((item) => (
            <li onClick={() => changeNameHandler(item.name)} key={item.id}>
              <Link href={`/${item.url}`}>
                {item.name}
                <span>
                  <FaAngleRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
