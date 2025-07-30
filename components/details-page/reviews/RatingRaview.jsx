"use client";
import style2 from "./rating_raview.module.css";
import style from "../img-galley/our-food-items.module.css";
import { ProgressBar } from "react-bootstrap";
import { IoIosStar } from "react-icons/io";
import Comments from "./Comments";
import { WriteReview } from "./WriteReview";
import { useState } from "react";
import { useGetBusinessReviewsQuery } from "@/store/business/businessService";
import { useParams, useSearchParams } from "next/navigation";
import { Loading } from "@/components/Loading";
import { useSelector } from "react-redux";

function RatingRaview({ reviews, averageRating, totalReviews }) {
  const { businessID } = useParams();
  const { currentUser } = useSelector((state) => state.auth);
  const [pageNo, setPageNo] = useState(1);
  const { data: reviewsData, isFetching } = useGetBusinessReviewsQuery({
    id: businessID,
    startIndex: pageNo,
  });
  const [displayCount, setDisplayCount] = useState(5);
  if (isFetching) return <Loading />;
  const toggleShowAllReviews = () => {
    setDisplayCount((prevCount) =>
      prevCount === reviewsData.reviews.length ? 5 : prevCount + 5
    );
  };

  if (!Array.isArray(reviewsData.reviews)) {
    return <div>No reviews available.</div>;
  }

  const sortedReviews = [...reviewsData.reviews]
    .filter((review) => review.status === "Accept")
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

  const calculateAverageRating = () => {
    if (!reviewsData.reviews || reviewsData.reviews.length === 0) return 0;

    const totalRating = reviewsData.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return (totalRating / reviewsData.reviews.length).toFixed(1);
  };

  const calculateRatingPercentage = (rating) => {
    if (!reviewsData.reviews || reviewsData.reviews.length === 0) return 0;

    const ratingCount = reviewsData.reviews.filter(
      (review) => review.rating === rating
    ).length;
    return ((ratingCount / reviewsData.reviews.length) * 100).toFixed(1);
  };
  return (
    <>
      <div className={style.info_itm_wrp}>
        <div className="card mt-4">
          <div
            className={`card-header d-flex justify-content-between ${style.card_header}`}
          >
            <div>
              <h3>Ratings and Reviews</h3>
            </div>
            {currentUser.id ? <WriteReview /> : null}
          </div>
          <div>
            <div className="card-body">
              <div className={style2.rating_section}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className={style2.rating_lft}>
                      <h5>Overall ratings and reviews</h5>
                      <div>
                        Reviews can only be made by registered users who have
                        interacted with the business
                      </div>
                      <div className="d-flex">
                        <div className={style2.all_star}>
                          {Array.from({ length: 5 }, (_, index) => (
                            <IoIosStar
                              key={index}
                              className={
                                index < Math.floor(calculateAverageRating())
                                  ? style2.act_star_cl
                                  : ""
                              }
                            />
                          ))}
                        </div>
                        <div className="ms-1">
                          <p className="mb-0">
                            {reviewsData.averageRating} based on recent ratings
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className={style2.rating_rght}>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div className={style2.rate_star_wrpa} key={rating}>
                          <span>{rating} Star</span>
                          <ProgressBar
                            variant="warning"
                            now={calculateRatingPercentage(rating)}
                            label={`${calculateRatingPercentage(rating)}%`}
                            visuallyHidden
                            className={style2.progress_bar}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {reviews.length ? (
                <div className={style2.user_cmnt}>
                  <div className={style.user_cmnt}>
                    <h3>{sortedReviews?.length} Reviews</h3>

                    {sortedReviews.slice(0, displayCount).map((review) => (
                      <Comments key={review?._id} review={review} />
                    ))}
                  </div>
                  <div>
                    {reviews?.length > displayCount && (
                      <button
                        onClick={toggleShowAllReviews}
                        className={style2.btnstyle}
                      >
                        {displayCount === reviews?.length
                          ? "Show Less"
                          : "Load More"}
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RatingRaview;
