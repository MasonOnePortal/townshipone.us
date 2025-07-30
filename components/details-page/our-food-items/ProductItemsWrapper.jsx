"use client";
import React from "react";
import style from "./our-food-items.module.css";
import { ServiceItem } from "./ServiceItem";
// import ServiceItem from "./ServiceItem";

function ProductItemsWrapper({ offers }) {
  return (
    <>
      <div className={`mt-3 ${style.info_itm_wrp}`}>
        <div className="card">
          <div className={`card-header ${style.card_header}`}>
            <h3>Our Offers</h3>
          </div>
          <div>
            <div className="card-body">
              <div className="row">
                {offers?.map((offer) => (
                  <div key={offer.id} className="col-lg-4 col-md-4 mb-3">
                    <ServiceItem offer={offer} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItemsWrapper;
