import style from "@/components/main-listing/main-listing.module.css";

import Pagination from "@/components/main-listing/Pagination";
import { isEmpty } from "lodash";
import RealEstateitem from "./RealEstateItem";

export const RealEstateListWrapper = ({ realEstates }) => {
  return (
    <>
      <div className="">
        <ul className={`${style.list_grd_wrap} list_cus`}>
          {realEstates?.data?.map((item) => (
            <li key={item.id} className={`unstyle ${style.lst_grd_item}`}>
              <RealEstateitem item={item} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div>
          {!isEmpty(realEstates.data) ? (
            <Pagination
              currentPage1={realEstates.page}
              totalrecord={realEstates.totalDocs}
              recordLimit={realEstates.limit}
              totalPages={realEstates.totalPages}
              prevPage={realEstates.prevPage}
              nextPage={realEstates.nextPage}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};
