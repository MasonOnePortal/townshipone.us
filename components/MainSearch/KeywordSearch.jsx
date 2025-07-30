"use client";
import React, { useEffect, useState } from "react";
import style from "./search.module.css";
import { useGetSearchListQuery } from "@/store/common api/commonService";
import useSearchOption from "@/hooks/useSearchOption";
export const KeywordSearch = ({ handleKeywordsChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, refetch, isLoading } = useGetSearchListQuery();
  const debouncedSearchTerm = useSearchOption(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm && searchTerm) {
      handleKeywordsChange(searchTerm);
    } else {
      handleKeywordsChange("");
    }
  }, [debouncedSearchTerm, searchTerm]);
  return (
    <>
      <div className={style.keyword_input}>
        <input
          type="text"
          placeholder="keywords..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </>
  );
};
