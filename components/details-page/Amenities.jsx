import React, { useMemo } from "react";
import style from "./details.module.css";
import { isEmpty } from "lodash";

function Amenities({ amenities, title = "Amenities" }) {
  return (
    <>
      <div className={style.info_itm_wrp}>
        <div className="card mt-4">
          <div className={`card-header ${style.card_header}`}>
            <h3>{title}</h3>
          </div>
          <div>
            <div className="card-body">
              <ul className={style.amenities_lst}>
                {amenities?.length ? (
                  amenities?.map((item, index) => (
                    <li key={index} className={style.allow_amenities}>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <p>Not available yet</p>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Amenities;
