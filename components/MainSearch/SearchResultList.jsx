import React from "react";
import { ModuleResult } from "./ModuleResult";
export const SearchResultList = ({ listVisible, resultList }) => {
  const isFalsy = Object.values(resultList).every(
    (prop) => Array.isArray(prop) && prop.length === 0
  );
  return (
    <>
      <section className="search_result_wrpper search_result_container">
        {Object.keys(resultList).map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            <ModuleResult
              key={`${item}-${index}`}
              moduleName={item}
              moduleList={resultList[item]}
            />
          </React.Fragment>
        ))}
        {isFalsy && listVisible ? (
          <div className="no_sr_found">No Result Found</div>
        ) : null}
      </section>
    </>
  );
};
