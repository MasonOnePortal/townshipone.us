"use client";
import style from "./information-listing.module.css";
import Link from "next/link";
import InformationListingItems from "./InformationListingItems";
import { useInformationCategoriesQuery } from "@/store/information-list/informationService";
import { Loading } from "@/components/Loading";
import ViewAll from "../ViewAllBtn/ViewAll";

function InformationListing() {
  const { data: informationList, isLoading } = useInformationCategoriesQuery();
  if (isLoading) return <Loading />;
  const limit = 10;
  const slicedInformationList = informationList?.slice(0, limit);
  return (
    <div className={style.information_listing_wrap}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-8">
            <div className="section_Heading">
              <h2>InformationListing</h2>
            </div>
          </div>
        </div>

        <div className={style.all_information_wrap}>
          {slicedInformationList?.map((item) => (
            <div key={item.id} className={style.all_information_wrap_item}>
              <InformationListingItems item={item} />
              <div className={style.overlay_click}>
                <Link href={`/informations/`}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center pt-2 ">
          <div className="button_rights">
            <ViewAll url="/informations" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationListing;
