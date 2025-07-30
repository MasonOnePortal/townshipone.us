import React from "react";
import filtericon from "@/public/imgs/filter_by_icon.svg";
import Image from "next/image";
import style from "./main-listing.module.css";

export const OrderSorting = ({ orderChangeHandler }) => {
  return (
    <div className={style.filter_by}>
      <Image width={0} height={0} src={filtericon} alt="image" />
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(e) => orderChangeHandler(e.target.value)}
      >
        <option value="-1">Latest</option>
        <option value="1">Old</option>
      </select>
    </div>
  );
};
