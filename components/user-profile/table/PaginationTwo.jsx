/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import style from "@/components/main-listing/main-listing.module.css";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQueryRequest } from "../add-service/real-estate/QueryRequestProvider";

function PaginationTwo({ activePage, totalPages, prevPage, nextPage }) {
  const [currentPage, setCurrentPage] = useState(activePage);
  const { updateState } = useQueryRequest();

  const changePagination = (newPage) => {
    updateState({ page: newPage, items_per_page: 10 });
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    changePagination(newPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const page = currentPage - 1;
      setCurrentPage(page);
      changePagination(page);
    }
  };

  const handleNextPage = () => {
    if (nextPage !== null) {
      if (currentPage < totalPages) {
        const page = currentPage + 1;
        setCurrentPage(page);
        changePagination(page);
      }
    }
  };

  const n = totalPages;

  const siblingCount = 2;

  function makeArr(pages) {
    let totalPageCount = [];
    for (let i = 1; i <= pages; i++) {
      totalPageCount.push(i);
    }
    return totalPageCount;
  }

  let aa = makeArr(n);

  let startIndex = Math.max(0, currentPage - 1 - siblingCount);
  let endIndex = Math.min(n - 1, currentPage - 1 + siblingCount);
  let displayedPages = aa.slice(startIndex, endIndex + 1);

  if (!displayedPages.includes(1)) {
    displayedPages.unshift(1);
  }

  if (!displayedPages.includes(n)) {
    displayedPages.push(n);
  }

  return (
    <>
      <div className={style.pagination_wrap}>
        <div className="d-flex justify-content-center">
          <div>
            {currentPage >= 1 && (
              <button onClick={handlePrevPage}>
                <FaArrowLeftLong />
              </button>
            )}
          </div>

          <div>
            {displayedPages.map((pageNumber, index) => (
              <button
                key={index}
                className={
                  pageNumber === currentPage
                    ? style.active_pagination
                    : style.pagination_button
                }
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber === 1 && displayedPages.includes(2)
                  ? "1"
                  : pageNumber}
              </button>
            ))}
          </div>

          <div>
            {currentPage <= totalPages && (
              <button onClick={handleNextPage}>
                <FaArrowRightLong />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaginationTwo;
