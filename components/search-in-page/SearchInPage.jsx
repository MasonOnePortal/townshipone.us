"use client";
import style from "./searchpage.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import useSearchOption from "@/hooks/useSearchOption";

function SearchInPage({ className }) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const debouncedSearchTerm = useSearchOption(searchTerm, 150);
  const pathname = usePathname();
  const { replace } = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set("searchName", debouncedSearchTerm);
    } else {
      params.delete("searchName");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearchTerm, searchParams, pathname, replace]);

  return (
    <>
      <div className={style.wrap_search_area}>
        <div>
          <div className={className || style.wrap_search_inner_data}>
            <div className="input-group">
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                placeholder="Search"
                data-kt-user-table-filter="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-group-btn">
                <button type="button" className="btn btn-secondary">
                  <FaMagnifyingGlass />
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchInPage;
