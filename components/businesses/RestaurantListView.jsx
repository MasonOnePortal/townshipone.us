"use client";
import React from "react";

import FilterSidebar from "@/components/filter-sidebar/FilterSidebar";

import BusinessListWrapper from "./BusinessListWrapper";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { toggleFilerSidebar } from "@/store/auth/authSlice";
function RestaurantListView() {
  const dispatch = useDispatch();
  const { filterSidebarStatus } = useSelector((state) => state.auth);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <aside className={filterSidebarStatus ? "filter_open" : ""}>
            <OutsideClickHandler
              onOutsideClick={() => dispatch(toggleFilerSidebar(false))}
            >
              <FilterSidebar
                SearchPlaceHolder={{
                  locationPlaceholder: "Street Address",
                  namePlaceholder: "Business Name",
                  cityPlaceHolder : "City",
                }}
              />
            </OutsideClickHandler>
          </aside>
        </div>
        <BusinessListWrapper />
      </div>
    </div>
  );
}

export default React.memo(RestaurantListView);
