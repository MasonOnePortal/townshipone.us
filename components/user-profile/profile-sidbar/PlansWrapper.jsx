import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import style from "../../price-plan/price.module.css";
const PlansWrapper = ({ plansInfo }) => {
  return (
    <>
      <div>
        {Array.isArray(plansInfo) ? (
          plansInfo.map((plan, index) => (
            <div key={plan.id} className="col-md-4 mb-3">
              <div
                className={`${style.price_data_wrap} ${
                  index === 1 ? style.price_data_wrap_center : ""
                }`}
              >
                <h5>{plan.name}</h5>
                {plan.price === 0 ? (
                  <h2>Free</h2>
                ) : (
                  <h2>
                    ${plan.price}
                    <span>/ {plan.planType}</span>
                  </h2>
                )}
                <a href="#">Purchase Plan</a>
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
                    {plan.propertyPosts} RealEstate Posts
                  </li>
                  <li>
                    <span>
                      <FaCheck />
                    </span>
                    Add {plan.businesses} Business
                  </li>
                  <li>
                    <span>
                      <FaCheck />
                    </span>
                    Total {plan.images} Image Upload
                  </li>
                  <li>
                    <span>
                      <FaCheck />
                    </span>
                    Total {plan.propertyPosts} Video Upload
                  </li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>plansInfo is not an array.</p>
        )}
      </div>
    </>
  );
};

export default PlansWrapper;
