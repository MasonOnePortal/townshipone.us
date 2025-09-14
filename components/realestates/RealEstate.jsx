"use client";
import Banner from "@/components/banner/Banner";
import FilterSidebar from "@/components/filter-sidebar/FilterSidebar";
import style from "@/components/main-listing/main-listing.module.css";
import second from "@/public/img/property1.webp";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { RealEstateListing } from "./RealEstateListing";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { toggleFilerSidebar } from "@/store/auth/authSlice";
import Content from "../card/Content";

function RealEstate() {
  const { filterSidebarStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <Banner
          img={second}
          bannerHeading="Real Estate Listings Township City OH"
          bannerContent="Explore Residential and Commercial Listings"
        />
        <Breadcrumb pagename="Realty Listings" />
      </div>
      <div className="container">
        <h1 className="fs-4 mb-3">Real Estate in Deerfield Township OH</h1>
        {/* <h4 className="fs-6">Real Estate Listings in Deerfield Township & Symmes Township, OH OH</h4> */}
        <Content contentData="Discover premium real estate opportunities in sophisticated <strong> Deerfield Township OH</strong>. Explore upscale residences, executive homes, and luxury properties in this desirable community. Find exceptional options that match the high standards of living here." />
        <Content contentData="Connect with top-tier agents and browse exclusive property listings. Whether you're seeking an elegant estate or sophisticated condo, our portal is your premier resource for entering the exclusive <strong> Deerfield Township OH</strong> real estate market." />
      </div>

      <div className={style.for_grid_view}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <aside className={filterSidebarStatus ? "filter_open" : ""}>
                <OutsideClickHandler
                  onOutsideClick={() => dispatch(toggleFilerSidebar(false))}
                >
                  <FilterSidebar
                    operatingMode={false}
                    userRating={false}
                    eCommerceMode={false}
                    SearchPlaceHolder={{
                      locationPlaceholder: "Street Address",
                      namePlaceholder: "Ad's Title",
                    }}
                  />
                </OutsideClickHandler>
              </aside>
            </div>
            <RealEstateListing />
          </div>
        </div>
      </div>
    </>
  );
}

export default RealEstate;
