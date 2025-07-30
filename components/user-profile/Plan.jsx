"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import style from "../price-plan/price.module.css";
import { FaCheck } from "react-icons/fa6";
import { isEmpty } from "lodash";
import { Loading } from "@/components/Loading";
import Link from "next/link";
import { formatDateNew } from "@/utils/helperFn";
const Plan = () => {
  const router = useRouter();
  const { currentPlan } = useSelector((state) => state.plan);
  if (isEmpty(currentPlan)) return <Loading />;
  return (
    <>
      <div>
        <div className="container">
          <div className={style.price_plan_wrapper}>
            {!isEmpty(currentPlan) ? (
              <div className={`${style.price_data_wrap}`}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="">
                    <h5>{currentPlan.name}</h5>
                    {currentPlan.price === 0 ? (
                      <h2>Free</h2>
                    ) : (
                      <h2>
                        ${parseInt(currentPlan.price, 10)}
                        <span>/ {currentPlan.planType}</span>
                      </h2>
                    )}
                  </div>

                  <div className="">
                    {currentPlan.expiredAt ? (
                      <div className="d-flex align-items-center expiry_time">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 384 512"
                        >
                          <path d="M360 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24zm-75.078 384H99.08c17.059-46.797 52.096-80 92.92-80 40.821 0 75.862 33.196 92.922 80zm.019-256H99.078C91.988 108.548 88 86.748 88 64h208c0 22.805-3.987 44.587-11.059 64z" />
                        </svg>
                        <span className="">
                          {formatDateNew(currentPlan.expiredAt)}
                        </span>
                      </div>
                    ) : null}
                    <button
                      type="button"
                      className="btn updgrade_plan"
                      onClick={() => router.push(`/price-plan`)}
                    >
                      Upgrade Plan
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <a className="un_link" href="#">
                      Your Plan
                    </a>
                    <h4>Includes:</h4>
                    <ul>
                      <li>
                        <span>
                          <FaCheck />
                        </span>
                        {currentPlan.jobPosts} Job Posts
                      </li>
                      <li>
                        <span>
                          <FaCheck />
                        </span>
                        {currentPlan.propertyPosts} RealEstate Posts
                      </li>
                      <li>
                        <span>
                          <FaCheck />
                        </span>
                        {currentPlan.businesses} Business Posts
                      </li>
                      <li>
                        <span>
                          <FaCheck />
                        </span>
                        Total {currentPlan.offersPerBusiness} Offers
                      </li>
                      <li>
                        <span>
                          <FaCheck />
                        </span>
                        {currentPlan.offerImagesLimit} Images and
                        {currentPlan.offerVideosLimit} Videos can Upload per
                        Offer
                      </li>
                      <li>
                        <span>
                          <FaCheck />
                        </span>
                        {currentPlan.imageLimit} Images and
                        {currentPlan.videosLimit} Videos can Upload per Business
                        and Real Estate
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <Link className="un_link" href="#">
                      Uses in this Month
                    </Link>
                    <h4>Used:</h4>
                    <ul>
                      <li>
                        <span>
                          <FaCheck />
                        </span>
                        {currentPlan.jobPostsCurrentMonth} Jobs Posted
                      </li>
                      <li>
                        <span>
                          <FaCheck />
                        </span>
                        {currentPlan.realEstateCurrentMonth} RealEstates Posted
                      </li>
                      <li>
                        <span>
                          <FaCheck />
                        </span>
                        Added {currentPlan.businessCurrentMonth} Businesses
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="">empty</div>
            )}

            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;
