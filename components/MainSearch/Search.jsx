"use client";
import React, { useEffect, useState } from "react";
import style from "./search.module.css";
import { KeywordSearch } from "./KeywordSearch";
import { Location } from "./Location";
import { useGetSearchListQuery } from "@/store/common api/commonService";
import { SearchResultList } from "./SearchResultList";
import { isArray, isEmpty } from "lodash";
import OutsideClickHandler from "react-outside-click-handler";
function Search() {
  const [query, setQuery] = useState("");
  const [listRes, setListRes] = useState(true);
  const { data, isLoading } = useGetSearchListQuery(query);
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [noResult, setNoResult] = useState(false);

  const handleLocationChange = (value) => {
    setLocation(value);
  };

  const handleKeywordsChange = (value) => {
    setKeywords(value);
  };

  useEffect(() => {
    const newQuery = `location=${location}&searchTerm=${keywords}`;
    const restValues = keywords || location ? true : false;
    setNoResult(restValues);
    setQuery(newQuery);
  }, [location, keywords]);
  const outsideClickHandler = () => {
    setListRes(false);
    setNoResult(false);
    const newQuery = `location=''&searchTerm=''`;
    setQuery(newQuery);
  };
  return (
    <>
      <div className="container">
        <div className={style.main_search_wrap}>
          <div className={style.inner_search_wrap}>
            <div className={style.search_bg_color}>
              <form className={style.search_form}>
                <div
                  className={`justify-content-center ${style.custom_flex_wrap}`}
                >
                  <KeywordSearch handleKeywordsChange={handleKeywordsChange} />
                  <Location handleLocationChange={handleLocationChange} />
                  <div className={style.search_btn}>
                    <button type="button" className="btn">
                      Search
                    </button>
                  </div>
                </div>
              </form>
              <div className={`  ${isEmpty(data) ? "hide_sr_list" : ""}`}>
                {!isEmpty(data) && noResult ? (
                  <OutsideClickHandler onOutsideClick={outsideClickHandler}>
                    <SearchResultList
                      listVisible={noResult}
                      resultList={data}
                    />
                  </OutsideClickHandler>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
