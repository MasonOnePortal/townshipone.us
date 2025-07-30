import style from "./price.module.css";
import { FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
export const PlanCard = ({ index, plan, buyPlanHandler }) => {
  return (
    <div
      className={`${style.price_data_wrap} ${
        index === 1 ? style.price_data_wrap_center : ""
      } ${plan.status !== "Active" ? style._inactive_card : ""}`}
    >
      <h2>{plan.name}</h2>
      {parseInt(plan.price, 10) === 0 ? (
        <h3 className="pb-2">Free</h3>
      ) : (
        <h3>
          ${plan.price}
          <span>/ {plan.planType}</span>
        </h3>
      )}

      {/* <p>
        There are many variations available, but the majority have suffered.
      </p> */}
      {plan.status === "Upcoming" ? (
        <button disabled>Upcoming Plan</button>
      ) : (
        <>
          {parseInt(plan.price, 10) === 0 ? (
            <button onClick={() => buyPlanHandler(plan.id, plan.price)}>
              Activate
            </button>
          ) : (
            <button onClick={() => buyPlanHandler(plan.id, plan.price)}>
              Purchase Plan
            </button>
          )}
        </>
      )}
      <h4>Includes:</h4>
      <ul>
        <li>
          <span>
            <FaCheck />
          </span>
          {plan.jobPosts} Job Posts
        </li>
        <li>
          <span>
            <FaCheck />
          </span>
          {plan.propertyPosts} Real Estate Posts
        </li>
        <li>
          <span>
            <FaCheck />
          </span>
          Add {plan.businesses} Businesses
        </li>
        <li>
          <span>
            <FaCheck />
          </span>
          Registered Business allowed to upload {plan.images} Images and{" "}
          {plan.videos} Videos
        </li>
        <li>
          <span>
            <FaCheck />
          </span>
          A Total of {plan.offers} offers are allowed
        </li>
        <li>
          <span>
            <FaCheck />
          </span>
          {plan.OfferImagesLimit} images and {plan.OfferVideosLimit} videos per
          Offer
        </li>
      </ul>
    </div>
  );
};
