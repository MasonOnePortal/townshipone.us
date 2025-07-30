import React, { useRef, useState } from "react";
import style from "./data_table.module.scss";
import _ from "lodash";
import { FiSearch } from "react-icons/fi";
const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className={style.filter_wrap}>
      <span>
        <FiSearch size={20} />
      </span>
      <input
        className="form-control custom_control  "
        type="text"
        autoComplete="off"
        placeholder="Search..."
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
    </div>
  );
};

export default GlobalFilter;
