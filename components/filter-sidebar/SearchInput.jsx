"use client";
import { useEffect, useRef, useState } from "react";
import style from "./filter_sidebar.module.css";
import { FaSistrix } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { useFilterQuery } from "@/hooks/useFilterQuery";
import { getQueryParamsAsObject } from "@/utils/helperFn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WithContext as ReactTags } from "react-tag-input";

function SearchInput({
  locationPlaceholder = "Local address",
  namePlaceholder = "Enter Name",
  zipCodePlaceholder = "Enter Zip Code",
  cityPlaceHolder = "Enter City",
  customFields = {},
}) {
  const {
    location = true,
    city = true,
    zipCode = true,
    name = true,
    company = false,
  } = customFields;

  const {
    filterZipCode,
    filterLocation,
    filterName,
    filterCity,
    filterCompany,
  } = useFilterQuery();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const ArrVal = filterLocation !== "" ? filterLocation : undefined;
  const locations = ArrVal ? ArrVal.split("^") : [];
  const [tags, setTags] = useState([]);
  const [isLocationEmpty, setIsLocationEmpty] = useState(true);
  const [displayedLocations, setDisplayedLocations] = useState("");

  // Default city value
  const defaultCity = "Township";

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: locations || [],
      name: filterName || "",
      zipCode: filterZipCode ? filterZipCode.toString() : "",
      city: filterCity || defaultCity,
      company: filterCompany,
    },
  });

  const preLocations = locations.map((loc) => {
    return {
      id: loc,
      text: loc,
    };
  });

  useEffect(() => {
    reset({
      location: locations || [],
      name: filterName || "",
      zipCode: filterZipCode ? filterZipCode.toString() : "",
      city: filterCity || defaultCity,
      company: filterCompany,
    });
    setTags(preLocations);
    setDisplayedLocations(locations.join(", "));
  }, [filterZipCode, filterLocation, filterName, filterCity, filterCompany]);

  // Auto-submit when component mounts to apply default city filter
  useEffect(() => {
    if (!filterCity) {
      const searchParamsObject = {};
      searchParamsObject.filterCity = defaultCity;

      const paramsdd = new URLSearchParams(searchParams);
      const queryParams = getQueryParamsAsObject(paramsdd);

      // Keep existing parameters including page
      const newSearchParams = { ...queryParams, ...searchParamsObject };
      const params = new URLSearchParams(newSearchParams);
      const queryString = params.toString();
      router.replace(`${pathname}?${queryString}`, { scroll: false });
    }
  }, []);

  useEffect(() => {
    setIsLocationEmpty(tags.length === 0);
  }, [tags]);

  const onSubmit = (values) => {
    const searchParamsObject = {};

    if (values.name) {
      searchParamsObject.filterName = values.name;
    }

    if (tags && tags.length > 0) {
      const arrD = tags.map((tag) => tag.text).join("^");
      searchParamsObject.filterLocation = arrD;
    }

    if (values.zipCode && /^\d+$/.test(values.zipCode)) {
      searchParamsObject.filterZipCode = Number.parseInt(values.zipCode);
    }

    // Always set city to default
    searchParamsObject.filterCity = defaultCity;

    if (values.company) {
      searchParamsObject.company = values.company;
    }

    const paramsdd = new URLSearchParams(searchParams);
    const queryParams = getQueryParamsAsObject(paramsdd);

    // Reset page to 1 when applying new filters
    const { page, ...restParams } = queryParams;
    const newSearchParams = { ...restParams, ...searchParamsObject, page: "1" };

    const params = new URLSearchParams(newSearchParams);
    const queryString = params.toString();
    router.replace(`${pathname}?${queryString}`, { scroll: false });
  };

  const resetFilterHandler = () => {
    reset({
      location: [],
      name: "",
      zipCode: "",
      city: defaultCity,
      company: "",
    });
    setTags([]);
    setDisplayedLocations("");

    // Reset to page 1 with only default city filter
    const resetParams = {
      filterCity: defaultCity,
      page: "1",
    };

    const params = new URLSearchParams(resetParams);
    const queryString = params.toString();
    router.replace(`${pathname}?${queryString}`, { scroll: false });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    e.target.value = inputValue;
  };

  const handleDelete = (i) => {
    const updatedTags = tags.filter((tag, index) => index !== i);
    setTags(updatedTags);
    updateDisplayedLocations(updatedTags);
  };

  const handleAddition = (tag) => {
    const updatedTags = [...tags, tag];
    setTags(updatedTags);
    updateDisplayedLocations(updatedTags);
  };

  const updateDisplayedLocations = (updatedTags) => {
    const displayedLocationsString = updatedTags
      .map((tag) => tag.text)
      .join(", ");
    setDisplayedLocations(displayedLocationsString);
  };

  const handleInputBlur = (tag) => {
    if (tag) {
      setTags([...tags, { text: tag, id: tag }]);
      updateDisplayedLocations([...tags, { text: tag, id: tag }]);
    }
  };

  const tagsInputRef = useRef(null);

  return (
    <div>
      <div className={style.wrap_search_filter}>
        <h3>Search By</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {location && (
            <div className={`parent-css ${style.wrap_search_input}`}>
              <Controller
                name="location"
                control={control}
                render={({ field }) => {
                  return (
                    <ReactTags
                      className="tagsInputs"
                      ref={tagsInputRef}
                      tags={tags}
                      handleDelete={handleDelete}
                      handleAddition={handleAddition}
                      inputFieldPosition="top"
                      autocomplete
                      name="location"
                      placeholder={locationPlaceholder}
                      editable
                      handleInputBlur={handleInputBlur}
                      {...field}
                    />
                  );
                }}
              />
            </div>
          )}

          {name && (
            <div className={style.wrap_search_input}>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                placeholder={namePlaceholder}
                name="name"
                {...register("name")}
              />
            </div>
          )}

          {company && (
            <div className={style.wrap_search_input}>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                placeholder={"Company"}
                name="company"
                {...register("company")}
              />
            </div>
          )}

          {city && (
            <div className={style.wrap_search_input}>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                placeholder={cityPlaceHolder}
                name="city"
                value={defaultCity}
                readOnly
                disabled
                style={{
                  backgroundColor: "#f8f9fa",
                  cursor: "not-allowed",
                  color: "#6c757d",
                }}
                {...register("city")}
              />
            </div>
          )}

          {zipCode && (
            <div className={style.wrap_search_input}>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                placeholder={zipCodePlaceholder}
                name="zipCode"
                maxLength="10"
                {...register("zipCode")}
                onInput={handleInputChange}
              />
            </div>
          )}

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
        </form>
      </div>
    </div>
  );
}

export default SearchInput;
