"use client";
import React, { useEffect, useState } from "react";
import useSearchOption from "@/hooks/useSearchOption";
import { FaAngleDown, FaLocationDot } from "react-icons/fa6";
import style from "./search.module.css";

export const Location = ({ handleLocationChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useSearchOption(searchTerm, 300);
  useEffect(() => {
    if (debouncedSearchTerm && searchTerm) {
      handleLocationChange(searchTerm);
    } else {
      handleLocationChange("");
    }
  }, [debouncedSearchTerm, searchTerm]);
  return (
    <>
      <div className={style.location_input}>
        <div className={style.location_icon}>
          <FaLocationDot />
        </div>
        <input
          type="text"
          placeholder="address"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={style.location_dropdw_ic}>
          <FaAngleDown />
        </div>
      </div>
    </>
  );
};
