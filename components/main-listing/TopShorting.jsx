"use client";
import style from "./main-listing.module.css";
import { FaBorderAll, FaFilter, FaListUl } from "react-icons/fa6";
import filtericon from "@/public/imgs/filter_by_icon.svg";
import Image from "next/image";
import { toggleFilerSidebar } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useFilterQuery } from "@/hooks/useFilterQuery";

import { usePathname } from "next/navigation";
function TopShorting({
  activeLayout,
  activeTab,
  totalItems = 0,
  category = "",
  filter = true,
  orderChangeHandler,
}) {
  const {
    filterZipCode,
    filterLocation,
    filterName,
    isECommerceChecked,
    selectedServiceModes,
    ratingFilter,
  } = useFilterQuery();
  const dispatch = useDispatch();
  const pathname = usePathname();
  let pageUrl = pathname.split("/")[1];
  return (
    <>
      <div>
        <div className="row">
          <div className="col-lg-8 col-md-7 col-12">
            <div className={style.listing_name_with_num}>
              <h4>
                {isECommerceChecked ||
                (selectedServiceModes && selectedServiceModes.length > 0) ||
                (ratingFilter && ratingFilter.length > 0) ? (
                  <>
                    Filter By :
                    <span>
                      {selectedServiceModes && selectedServiceModes.length > 0
                        ? ` Service Mode${isECommerceChecked ? "," : ""}`
                        : ""}
                      {isECommerceChecked
                        ? `E-Commerce Enable${
                            (selectedServiceModes &&
                              selectedServiceModes.length > 0) ||
                            (ratingFilter && ratingFilter.length > 0)
                              ? ","
                              : ""
                          }`
                        : ""}
                      {ratingFilter && ratingFilter.length > 0
                        ? ` Rating${
                            isECommerceChecked ||
                            (selectedServiceModes &&
                              selectedServiceModes.length > 0)
                              ? ","
                              : ""
                          }`
                        : ""}
                    </span>
                  </>
                ) : (
                  <>
                    Search By : <span>{category}</span>
                  </>
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
          <div className="col-lg-4 col-md-5 col-12">
            <div className="d-flex justify-content-end">
              <div className="d-flex align-items-center">
                <div className={style.filter_by}>
                  <Image width={0} height={0} src={filtericon} alt="image" />
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => orderChangeHandler(e.target.value)}
                  >
                    <option value="-1">Latest</option>
                    <option value="1">Older</option>
                  </select>
                </div>
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
}

export default TopShorting;
