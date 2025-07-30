"use client";
import { useEffect, useRef, useState } from "react";
import style from "./filter_sidebar.module.css";
import { FaSistrix } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { useFilterQuery } from "@/hooks/useFilterQuery";
import { getQueryParamsAsObject } from "@/utils/helperFn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WithContext as ReactTags } from "react-tag-input";

import useSearchOption from "@/hooks/useSearchOption";

const filterForm = {
  location: "",
  name: "",
  zipCode: "",
};

function SearchOfferInput() {
  const [searchName, setSearchName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [product, setProduct] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const debouncedSearchName = useSearchOption(searchName, 150);
  const debouncedProduct = useSearchOption(product, 150);
  const debouncedzipCode = useSearchOption(zipCode, 150);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchName) {
      params.set("searchName", debouncedSearchName);
    } else {
      params.delete("searchName");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearchName, searchParams, pathname, replace]);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedProduct) {
      params.set("filter_product", debouncedProduct);
    } else {
      params.delete("filter_product");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedProduct, searchParams, pathname, replace]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedzipCode) {
      params.set("filter_zipcode", debouncedzipCode);
    } else {
      params.delete("filter_zipcode");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedzipCode, searchParams, pathname, replace]);
  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    e.target.value = inputValue;
  };

  return (
    <>
      <div className={style.wrap_deals_data}>
        <div className={style.wrap_search_filter}>
          <h3>Search By</h3>

          <div className={style.wrap_search_input}>
            <input
              type="text"
              autoComplete="off"
              className="form-control"
              placeholder="Search by Business or Category  "
              data-kt-user-table-filter="search"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className={style.wrap_search_input}>
            <input
              type="text"
              autoComplete="off"
              className="form-control"
              placeholder="Search by Product or Service"
              data-kt-user-table-filter="search"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <div className={style.wrap_search_input}>
            <input
              type="text"
              autoComplete="off"
              className="form-control"
              placeholder="Search by ZipCode"
              data-kt-user-table-filter="search"
              maxLength={5}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              onInput={handleInputChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchOfferInput;
