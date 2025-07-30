"use client";
import { useState, useEffect } from "react";
import style from "./main-listing.module.css";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function Pagination({ currentPage1, totalPages, prevPage, nextPage }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentPage, setCurrentPage] = useState(currentPage1);

  // Update local state when prop changes
  useEffect(() => {
    setCurrentPage(currentPage1);
  }, [currentPage1]);

  const changePagination = (newPage) => {
    const params = new URLSearchParams(searchParams);
    if (newPage) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    changePagination(newPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && prevPage) {
      const page = currentPage - 1;
      setCurrentPage(page);
      changePagination(page);
    }
  };

  const handleNextPage = () => {
    if (nextPage !== null && currentPage < totalPages) {
      const page = currentPage + 1;
      setCurrentPage(page);
      changePagination(page);
    }
  };

  const n = totalPages;
  const siblingCount = 2;

  function makeArr(pages) {
    const totalPageCount = [];
    for (let i = 1; i <= pages; i++) {
      totalPageCount.push(i);
    }
    return totalPageCount;
  }

  const aa = makeArr(n);

  // Logic to show current page and siblings on each side
  const startIndex = Math.max(0, currentPage - 1 - siblingCount);
  const endIndex = Math.min(n - 1, currentPage - 1 + siblingCount);
  const displayedPages = aa.slice(startIndex, endIndex + 1);

  // Check if first page is already included
  if (!displayedPages.includes(1)) {
    displayedPages.unshift(1);
  }

  // Check if last page is already included
  if (!displayedPages.includes(n)) {
    displayedPages.push(n);
  }

  if (totalPages <= 1) return null;

  return (
    <>
      <div className={style.pagination_wrap}>
        <div className="d-flex justify-content-center">
          <div>
            {currentPage > 1 && prevPage && (
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
                {pageNumber}
              </button>
            ))}
          </div>
          <div>
            {currentPage < totalPages && nextPage && (
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

export default Pagination;
