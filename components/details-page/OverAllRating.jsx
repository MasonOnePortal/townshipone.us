"use client";
import style from "./details.module.css";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaStarHalfAlt } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useGetBusinessReviewsQuery } from "@/store/business/businessService";
import { Loading } from "../Loading";

function OverAllRating() {
  const { business } = useSelector((state) => state.business);
  const { businessID } = useParams();
  const { data: reviewsData, isFetching } = useGetBusinessReviewsQuery({
    id: businessID,
  });
  if (isFetching) return <Loading />;
  const businessRating =
    reviewsData.averageUserRating > business.averageRating
      ? reviewsData.averageUserRating
      : business.averageRating;
  const fullStars = Math.floor(businessRating);
  const hasHalfStar = businessRating % 1 !== 0;

  const stars = [];

  if (businessRating === 0) {
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div key={`${i}-all-empty`} className={style.unactive_star_rat}>
          <FaRegStar />
        </div>
      );
    }
  } else {
    for (let i = 1; i <= fullStars; i++) {
      stars.push(
        <div key={`${i}-filled-star`} className={style.active_star_rat}>
          <FaStar />
        </div>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div className={style.active_star_rat}>
          <FaStarHalfAlt />
        </div>
      );
    }

    const emptyStars = 5 - (fullStars + (hasHalfStar ? 0.5 : 0));
    for (let i = 1; i <= emptyStars; i++) {
      stars.push(
        <div key={`${i}-all`} className={style.unactive_star_rat}>
          <FaRegStar />
        </div>
      );
    }
  }
  return (
    <>
      <div>
        <div className={`d-flex ${style.star_rate_cl}`}>
          <div className="d-flex align-items-center">{stars}</div>
          <div className={style.rtng_nm_sh}>
            {Array.isArray(reviewsData?.reviews) && reviewsData.reviews.length
              ? businessRating
              : 0}
            /5
          </div>
          <div className={style.rvw_clsf}>
            <p>{reviewsData.totalReviews} Reviews</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OverAllRating;
