"use client";
import React, { useEffect, useState } from "react";
import style from "./information-listing.module.css";
// import useSearchOption from "@/hooks/useSearchOption";
import { FaBorderAll, FaListUl, FaMagnifyingGlass } from "react-icons/fa6";
import {
  useSearchParams,
  useParams,
  useRouter,
  usePathname,
} from "next/navigation";

import styles from "../main-listing/main-listing.module.css";
import useSearchOption from "@/hooks/useSearchOption";

function InfoTopShorting({
  activeLayout,
  activeTab,
  category = "Category Listing",
  filter = true,
  search = true,
}) {
  const params = useParams();
  const { id } = params;
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const debouncedSearchTerm = useSearchOption(searchTerm, 150);
  const pathname = usePathname();
  const { replace } = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set("searchName", debouncedSearchTerm);
    } else {
      params.delete("searchName");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearchTerm, searchTerm, pathname, replace, searchParams]);

  return (
    <>
      <div className={style.info_lst_hdr}>
        <div className="row info align-items-center">
          <div className="col-md-4 col-12">
            <div className={style.rsult_fnd_cl}>
              <h2>{category}</h2>
            </div>
          </div>
          <div className="col-md-8 col-12">
            <div className={style.search_bar_info_cl}>
              {search && (
                <div className={style.search_area_cl}>
                  <div className="input-group">
                    <input
                      autoComplete="off"
                      className="form-control"
                      placeholder="Search"
                      data-kt-user-table-filter="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="input-group-btn">
                      <button type="button" className="btn">
                        <FaMagnifyingGlass />
                      </button>
                    </span>
                  </div>
                </div>
              )}

              <div className="d-flex ">
                {filter ? (
                  <div className={`${styles.lst_grid}`}>
                    <button
                      type="button"
                      className={activeTab === "list" ? styles.active_view : ""}
                      onClick={() => activeLayout("list")}
                    >
                      <FaListUl /> List
                    </button>
                  </div>
                ) : null}
                {filter ? (
                  <div className={styles.lst_grid}>
                    <button
                      type="button"
                      className={activeTab === "grid" ? styles.active_view : ""}
                      onClick={() => activeLayout("grid")}
                    >
                      <FaBorderAll /> Grid
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoTopShorting;
