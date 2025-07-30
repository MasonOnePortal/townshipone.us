"use client";
import style from "@/components/main-listing/main-listing.module.css";
import ListingDataItem from "@/components/main-listing/ListingDataItem";
import Pagination from "@/components/main-listing/Pagination";
import { isEmpty } from "lodash";
import { useState } from "react";

export const ListWrapper = ({ businessList }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <ul className={style.list_grd_wrap}>
        {businessList?.data?.map((item) => (
          <li key={item.id} className={`unstyle ${style.lst_grd_item}`}>
            <ListingDataItem item={item} />
          </li>
        ))}
      </ul>
      <div>
        {!isEmpty(businessList?.data) ? (
          <Pagination
            currentPage1={businessList.page}
            totalPages={businessList.totalPages}
            currentIndex={businessList.limit}
            prevPage={businessList.prevPage}
            nextPage={businessList.nextPage}
          />
        ) : null}
      </div>
    </>
  );
};
