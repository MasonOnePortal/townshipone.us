import { formatDateNew } from "@/utils/helperFn";
import style from "./details.module.css";

const PropertyDetailFeatures = ({ property }) => {
  return (
    <>
      <div className={style.info_itm_wrp}>
        <div className="card mt-4">
          <div className={`card-header ${style.card_header}`}>
            <h3>Property Detail & Features</h3>
          </div>
          <div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <span className={style.Prop_deal}>Exterior :</span>{" "}
                  <span className={style.prop_right_text}>
                    {property?.exterior}
                  </span>
                </div>
                <div className="col-6">
                  <span className={style.Prop_deal}>Interior :</span>{" "}
                  <span className={style.prop_right_text}>
                    {property?.interior}
                  </span>
                </div>
              </div>
              <div className="row">
                {property.availableDate ? (
                  <div className="col-4">
                    <span className={style.Prop_deal}>Available Date :</span>{" "}
                    <span className={style.prop_right_text}>
                      {formatDateNew(property.availableDate)}
                    </span>
                  </div>
                ) : null}

                <div className="col-4">
                  <span className={style.Prop_deal}>Build Year :</span>{" "}
                  <span className={style.prop_right_text}>
                    {property?.year}
                  </span>
                </div>
                <div className="col-4">
                  <span className={style.Prop_deal}>Status :</span>{" "}
                  <span className={style.prop_right_text}>
                    {property?.status}
                  </span>
                </div>

                <div className="col-4">
                  <span className={style.Prop_deal}>Price :</span>{" "}
                  <span className={style.prop_right_text}>
                    {property?.price}
                  </span>
                </div>

                <div className="col-4">
                  <span className={style.Prop_deal}>Swimming Pool :</span>{" "}
                  <span className={style.prop_right_text}>
                    {property?.swimmingPool}
                  </span>
                </div>

                <div className="col-4">
                  <span className={style.Prop_deal}>Fireplace :</span>{" "}
                  <span className={style.prop_right_text}>
                    {property?.fireplace}
                  </span>
                </div>

                <div className="col-4">
                  <span className={style.Prop_deal}>Free Wifi :</span>{" "}
                  <span className={style.prop_right_text}>
                    {property?.wifi}
                  </span>
                </div>

                <div className="col-4">
                  <span className={style.Prop_deal}>Elevator :</span>{" "}
                  <span className={style.prop_right_text}>
                    {property?.elevator}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetailFeatures;
