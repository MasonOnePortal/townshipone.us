"use client";
import Banner from "@/components/banner/Banner";
import FilterSidebar from "@/components/filter-sidebar/FilterSidebar";
import style from "@/components/main-listing/main-listing.module.css";
import second from "@/public/img/price-plan.webp";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { JobListWrapper } from "./JobListWrapper";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { toggleFilerSidebar } from "@/store/auth/authSlice";
import Content from "../card/Content";
function JobListing() {
  const dispatch = useDispatch();
  const { filterSidebarStatus } = useSelector((state) => state.auth);
  return (
    <>
      <div>
        <Banner
          img={second}
          bannerHeading="Explore Township City Jobs"
          bannerContent="Opportunities in Different Industries"
        />
        <Breadcrumb pagename="Career Opportunities" />
      </div>
      <div className="container">
        <h1 className="fs-5 mb-3">Job Listings in Township, OH</h1>
        <h1 className="fs-6">
          Job Listings in Township OH and Surrounding Areas
        </h1>
        <p className="contentCss">
          Find the latest <strong> jobs in Township OH</strong>
          .<br />
          <br /> Explore a variety of career opportunities across industries in
          these thriving communities. Whether you're looking to embark on a new
          career path or transition to a different job, you'll find
          opportunities that align with your skills and interests.
        </p>
        {/* <Content contentData="Discover job openings and vacancies spanning diverse industries and businesses. Whether you're looking to embark on a new career path or transition to a different job, you'll find the opportunities that align with your skills and interests. " /> */}
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
                    modeTitle="Job Type"
                    operatingMode={false}
                    userRating={false}
                    eCommerceMode={false}
                    customFields={{
                      location: false,
                      company: true,
                    }}
                    SearchPlaceHolder={{
                      locationPlaceholder: "Street Address",
                      namePlaceholder: "Job Title",
                    }}
                  />
                </OutsideClickHandler>
              </aside>
            </div>
            <JobListWrapper />
          </div>
        </div>
      </div>
    </>
  );
}

export default JobListing;
