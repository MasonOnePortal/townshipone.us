"use client";
import { useCallback, useState } from "react";
import style from "./filter_sidebar.module.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaSistrix } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { getQueryParamsAsObject } from "@/utils/helperFn";

const filterInfo = {
  searchName: "",
  filter_zipcode: "",
  filterCity: "",
  filter_product: "",
  businessName: "",
};

const defaultCity = "Township";

const SearchOffersInputs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsdd = new URLSearchParams(searchParams);
  const queryParams = getQueryParamsAsObject(paramsdd);

  const [filter_val, setFilterVal] = useState({
    ...filterInfo,
    ...queryParams,
    filterCity: queryParams.filterCity || defaultCity,
  });

  const {
    register,
    handleSubmit,
    set,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: filter_val,
  });

  const resetFilterHandler = useCallback(() => {
    reset({
      searchName: "",
      filter_product: "",
      filter_zipcode: "",
      filterCity: defaultCity,
      businessName: "",
    });
    setFilterVal({
      ...filterInfo,
      filterCity: defaultCity,
    });

    // Reset to page 1 with only default city
    const resetParams = new URLSearchParams();
    resetParams.set("filterCity", defaultCity);
    resetParams.set("page", "1");

    router.replace(`${pathname}?${resetParams.toString()}`, { scroll: false });
  }, [pathname, router, reset]);

  const submitFilter = useCallback(
    (values) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          current.set(key, value);
        }
      });

      // Always override city to default value and reset page
      current.set("filterCity", defaultCity);
      current.set("page", "1");

      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    e.target.value = inputValue;
  };

  return (
    <form onSubmit={handleSubmit(submitFilter)}>
      <div className={style.wrap_deals_data}>
        <div className={style.wrap_search_filter}>
          <h2>Search By</h2>
          <div className={style.wrap_search_input}>
            <input
              type="text"
              name="searchName"
              autoComplete="off"
              {...register("searchName")}
              className="form-control"
              placeholder="Search Business or Business Category"
            />
          </div>
          <div className={style.wrap_search_input}>
            <input
              type="text"
              name="product"
              autoComplete="off"
              {...register("filter_product")}
              className="form-control"
              placeholder="Search by Product or Service"
            />
          </div>
          <div className={style.wrap_search_input}>
            <input
              type="text"
              name="businessName"
              autoComplete="off"
              {...register("businessName")}
              className="form-control"
              placeholder="Business Name"
            />
          </div>
          <div className={style.wrap_search_input}>
            <input
              type="text"
              name="filterCity"
              autoComplete="off"
              className="form-control"
              placeholder="City"
              value={defaultCity}
              readOnly
              disabled
              style={{
                backgroundColor: "#f8f9fa",
                cursor: "not-allowed",
                color: "#6c757d",
              }}
              {...register("filterCity")}
            />
          </div>
          <div className={style.wrap_search_input}>
            <input
              type="text"
              name="zipCode"
              autoComplete="off"
              className="form-control"
              {...register("filter_zipcode")}
              placeholder="Search by ZipCode"
              maxLength={5}
              onInput={handleInputChange}
            />
          </div>
          <div className={style.search_btn_filter}>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-primary me-2">
                <FaSistrix /> Submit
              </button>
              <button
                type="button"
                onClick={resetFilterHandler}
                className="btn btn-secondary "
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchOffersInputs;
