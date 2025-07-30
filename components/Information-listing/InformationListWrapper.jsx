"use client";
import Banner from "@/components/banner/Banner";
import style from "@/components/Information-listing/information-listing.module.css";
import second from "@/public/img/business-banner.webp";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import InfoTopShorting from "@/components/Information-listing/InfoTopShorting";
import InformationListingView from "@/components/Information-listing/InformationListingView";
import { useMemo, useState } from "react";
import Content from "../card/Content";
import { isEmpty } from "lodash";
import { useGetOneCotegeryInformationQuery } from "@/store/information-list/informationService";
import { useParams } from "next/navigation";
import { Loading } from "../Loading";
import SearchInput from "../filter-sidebar/SearchInput";

function InformationListWrapper() {
  const params = useParams();
  const { id } = params;
  const { data: infoDetail, isLoading } = useGetOneCotegeryInformationQuery(id);

  const [activeTab, setActiveTab] = useState("grid");
  const layoutChangeHandler = (value) => {
    setActiveTab(value);
  };

  const renderFilterContent = useMemo(() => {
    const filterConfig = {
      "66c75b9ec9069f68e89a6819": {
        city: true,
        zipCode: true,
        name: false,
        location: false,
        cityText: "City",
        zipCodeText: "zipCode",
        nameText: "",
        locationText: "",
      },
      "6642005ec73a4982794dae57": {
        city: true,
        zipCode: false,
        name: true,
        location: false,
        cityText: "City",
        zipCodeText: "",
        nameText: "Name",
        locationText: "",
      },
      "65de911966aa72368a82e6ad": {
        city: true,
        zipCode: false,
        name: true,
        location: false,
        cityText: "City",
        zipCodeText: "",
        nameText: "Department Name",
        locationText: "",
      },
      "65c40acaca9b3ec07ae8571c": {
        city: true,
        zipCode: false,
        name: true,
        location: false,
        cityText: "City",
        zipCodeText: "",
        nameText: "Service Name",
        locationText: "",
      },
      "65c40a9dca9b3ec07ae85710": {
        city: true,
        zipCode: false,
        name: true,
        location: false,
        cityText: "City",
        zipCodeText: "",
        nameText: "Worship Place Name",
        locationText: "",
      },
      "65c40a7dca9b3ec07ae85700": {
        city: true,
        zipCode: false,
        name: true,
        location: false,
        cityText: "City",
        zipCodeText: "",
        nameText: "School Name",
        locationText: "",
      },
      "65c409c8ca9b3ec07ae856ee": {
        city: true,
        zipCode: false,
        name: true,
        location: false,
        cityText: "City",
        zipCodeText: "",
        nameText: "Park Name",
        locationText: "",
      },
      oh_state_government_other_resources: null,
    };
    return filterConfig[params.id] ?? null;
  }, [params.id]);
  const infoData = infoDetail?.description;
  if (isLoading || isEmpty(infoDetail)) return <Loading />;

  return (
    <>
      <div>
        <Banner img={second} bannerHeading="Data Listings" />
        <Breadcrumb pagename="Data Listings" />
      </div>
      <div className="container">
        <Content contentData={infoData} />
      </div>

      <div className={activeTab === "list" ? "" : style.for_grid_view}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 ">
              {renderFilterContent && (
                <SearchInput
                  locationPlaceholder={renderFilterContent?.locationText}
                  namePlaceholder={renderFilterContent?.nameText}
                  zipCodePlaceholder={renderFilterContent?.zipCodeText}
                  cityPlaceHolder={renderFilterContent?.cityText}
                  customFields={renderFilterContent}
                />
              )}
            </div>
            <div
              className={`${
                renderFilterContent !== null
                  ? "col-lg-9 col-sm-12"
                  : "col-lg-12 col-sm-12"
              }`}
            >
              <div className="mb-3">
                <InfoTopShorting
                  category={infoDetail.name}
                  activeLayout={layoutChangeHandler}
                  activeTab={activeTab}
                  search={!renderFilterContent}
                />
              </div>
              <div
                className={
                  activeTab === "list"
                    ? ` for_information_list ${style.for_information_list}`
                    : `row for_information_list- ${style.for_information_list0}`
                }
              >
                <InformationListingView
                  visibleFilter={renderFilterContent === null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InformationListWrapper;
