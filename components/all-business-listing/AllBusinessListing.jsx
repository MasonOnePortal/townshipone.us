"use client";
import style from "./all_business_listing.module.css";
import category_placeholder from "@/public/imgs/shopping-malls.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { useBusinessesCategoriesQuery } from "@/store/business/businessService";
import Image from "next/image";
import Link from "next/link";
import { Loading } from "../Loading";
import { Empty } from "../Empty";
import { useState } from "react";

function AllBusinessListing({ limit }) {
  const searchParams = useSearchParams();
  const searchTerms = searchParams.get("searchName")
    ? searchParams.get("searchName")
    : "";
  const {
    data: categoriesList,
    isError,
    isLoading,
    isFetching,
  } = useBusinessesCategoriesQuery(searchTerms);
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  if (isFetching) {
    return <Loading />;
  }
  const slicedBusinessListings = (categoriesList || []).slice(0, limit);
  return (
    <>
      <div className={style.all_business_wrap}>

        {Array.isArray(slicedBusinessListings) && slicedBusinessListings.length
          ? slicedBusinessListings.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/businesses/${item.id}`)}
                className={style.all_business_wrap_item}
              >
                <Link href="#" className={style.business_link}>
                  <Image
                    className={`${style.business_img}`}
                    src={
                      imageError
                        ? category_placeholder
                        : item.avatar || category_placeholder
                    }
                    onError={handleImageError}
                    alt={item.name}
                    width={80}
                    height={40}
                  />
                  <h4 className={style.business_name}>{item.name}</h4>
                </Link>
              </div>
            ))
          : null}
      </div>
      {!isLoading &&
      Array.isArray(categoriesList) &&
      categoriesList.length === 0 ? (
        <div className="text-center">
          <Empty />
        </div>
      ) : null}
    </>
  );
}

export default AllBusinessListing;
