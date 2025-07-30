"use client";
import Banner from "../banner/Banner";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import second from "@/public/img/price-plan.webp";
import style from "../../components/main-listing/main-listing.module.css";
import { useState } from "react";

import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useGetAllFaqsQuery } from "@/store/common api/commonService";
import { Loading } from "@/components/Loading";
const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const { data: reviewData, isLoading } = useGetAllFaqsQuery();
  if (isLoading) return <Loading />;

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <>
      <div>
        <Banner img={second} bannerHeading="Frequently Asked Question (FAQ)" />
        <Breadcrumb pagename="FAQ Information" />
      </div>
      <div className={style.for_grid_view}>
        <div className="container">
          <h3 className={style.faq_hed_styl}>Frequently Asked Questions</h3>
          <div className="row faq_wrap">
            {reviewData.data.map((item, index) => (
              <div className="col-lg-12 col-md-12" key={index}>
                <div
                  className={`faq-item ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => toggleAnswer(index)}
                >
                  <div className="faq-question">
                    {item.question}
                    <span className="faq-icon-styl">
                      {activeIndex === index ? <HiMinusSm /> : <HiPlusSm />}
                    </span>
                  </div>
                  {activeIndex === index && (
                    <div
                      className="faq-answer"
                      dangerouslySetInnerHTML={{ __html: item?.answer }}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;
