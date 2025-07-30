"use client";

import style from "../all-business-listing/all_business_listing.module.css";
import BusinessListItem from "../business-listing/BusinessListItem";
import { Loading } from "../Loading";
import { useBusinessesCategoriesQuery } from "@/store/business/businessService";

function BusinessListWrap() {
  const { data, loading, error } = useBusinessesCategoriesQuery();
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      <div className={style.all_business_wrap}>
        <div className={style.all_business_wrap}>
          {data?.map((item) => (
            <div key={item.id} className={style.all_business_wrap_item}>
              <BusinessListItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BusinessListWrap;
