"use client";
import style from "./main-listing.module.css";
import { FaBorderAll, FaFilter, FaListUl } from "react-icons/fa6";
import { toggleFilerSidebar } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import Select from "react-select";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export const RealEstatefilterOptions = [
  { value: "beds_asc", label: "Beds Low to High" },
  { value: "beds_desc", label: "Beds High to Low" },
  { value: "available_asc", label: "Available Date Older to Latest" },
  { value: "available_desc", label: "Available Date Latest to Older" },
  { value: "listed_asc", label: "Listed Date Older to Latest" },
  { value: "listed_desc", label: "Listed Date Latest to Older" },
];
const PropertySorting = ({
  activeLayout,
  activeTab,
  filter = true,
  filterOptions = RealEstatefilterOptions,
  listGridView = true
}) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const orderFilter = searchParams.get("order_filter");
  const [order, setOrder] = useState(orderFilter);
  useEffect(() => {
    if (!!orderFilter) {
      setOrder((preVal) => (preVal = orderFilter));
    } else {
      setOrder("");
    }
  }, [orderFilter]);
  const optionChangeHandler = useCallback((option) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.set("order_filter", option.value);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  }, []);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-lg-5 col-md-5 col-12">
            <div className={style.listing_name_with_num}>
              <h4>
                {searchParams.has("order_filter") ? (
                  <>
                    Filter By:
                    {orderFilter.startsWith("beds") ? (
                      <span>Bedrooms</span>
                    ) : null}
                    {orderFilter.startsWith("listed") ? (
                      <span>Date Listed</span>
                    ) : null}
                    {orderFilter.startsWith("available") ? (
                      <span>Date Available</span>
                    ) : null}
                  </>
                ) : (
                  "Search By"
                )}
              </h4>
            </div>
          </div>
          <div
            onClick={() => dispatch(toggleFilerSidebar(true))}
            className={`col-2 ${style.filte_btn_mbl}`}
          >
            <span>
              <FaFilter />
            </span>
          </div>

          <div className="col-lg-7 col-md-7 col-12">
            <div className="d-flex justify-content-end">
              <div className="d-flex align-items-center">
                <Select
                  value={filterOptions.find((option) => option.value === order)}
                  className="filter_options"
                  onChange={optionChangeHandler}
                  options={filterOptions}
                />
              </div>
              {filter ? (
                <div className={`${style.lst_grid}`}>
                  <button
                    type="button"
                    className={activeTab === "list" ? style.active_view : ""}
                    onClick={() => activeLayout("list")}
                  >
                    <FaListUl /> List
                  </button>
                </div>
              ) : null}
              {filter ? (
                <div className={style.lst_grid}>
                  <button
                    type="button"
                    className={activeTab === "grid" ? style.active_view : ""}
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
    </>
  );
};

export { PropertySorting };
