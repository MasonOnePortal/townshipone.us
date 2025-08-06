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
        <h1 className="fs-4 mb-3">
          Real Estate Listings in Deerfield Township & Symmes
          Township, OH
        </h1>
        {/* <h4 className="fs-6">Real Estate Listings in Deerfield Township & Symmes Township, OH OH</h4> */}
        <Content contentData="Browse through a collection of residential and commercial properties available in our real estate listings. Whether you're searching for a home or a business space, you'll find a diverse range of options to suit your needs and preferences." />
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
