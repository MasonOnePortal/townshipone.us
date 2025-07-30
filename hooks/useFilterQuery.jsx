"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const useFilterQuery = () => {
  const [ratingFilter, setRatingFilter] = useState([]);
  const [selectedServiceModes, setSelectedServiceModes] = useState([]);
  const [isECommerceChecked, setIsECommerceChecked] = useState(false);
  const [filterZipCode, setFilterZipCode] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterLocation, setLocationFilter] = useState("");
  const [filterCity , setFilterCity] = useState("")
  const [filterCompany , setFilterCompany] = useState("")
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("filterRating")) {
      setRatingFilter([parseInt(searchParams.get("filterRating"))]);
    }
    if (searchParams.get("eCommerceMode")) {
      setIsECommerceChecked([parseInt(searchParams.get("eCommerceMode"))]);
    }
    if (searchParams.get("filterMode")) {
      setSelectedServiceModes([searchParams.get("filterMode")]);
    }
    if (searchParams.get("filterZipCode")) {
      setFilterZipCode(parseInt(searchParams.get("filterZipCode")));
    }
    if (searchParams.get("filterName")) {
      setFilterName(searchParams.get("filterName"));
    }
    if (searchParams.get("filterLocation")) {
      setLocationFilter(searchParams.get("filterLocation"));
    }
    if (searchParams.get("filterCity")) {
      setFilterCity(searchParams.get("filterCity"));
    }
    if (searchParams.get("company")) {
      setFilterCompany(searchParams.get("company"))
    }
  }, [searchParams]);
  return {
    filterZipCode,
    filterLocation,
    filterName,
    filterCity,
    filterCompany, 
    setFilterCompany,
    setFilterCity,
    ratingFilter,
    setRatingFilter,
    isECommerceChecked,
    setIsECommerceChecked,
    selectedServiceModes,
    setSelectedServiceModes,
  };
};
