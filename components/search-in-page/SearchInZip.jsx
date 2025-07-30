"use client";
import style from "./searchpages.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import useSearchOption from "@/hooks/useSearchOption";

function SearchInZip() {
  const [searchName, setSearchName] = useState("");
  const [zipCode, setZipCode] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const debouncedSearchName = useSearchOption(searchName, 150);
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
      <div className={style.wrap_search_area}>
        <div className={`d-flex ${style.info_src_ara}`}>
          <div className="input-group">
            <input
              type="text"
              autoComplete="off"
              className="form-control"
              placeholder="Search by Name"
              data-kt-user-table-filter="search"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="input-group">
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

export default SearchInZip;
