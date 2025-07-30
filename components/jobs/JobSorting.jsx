"use client";
import { FaFilter } from "react-icons/fa6";
import style from "@/components/main-listing/main-listing.module.css";
import { useDispatch } from "react-redux";
import { toggleFilerSidebar } from "@/store/auth/authSlice";
const JobSorting = () => {
  const dispatch = useDispatch();
  return (
    <div className="row">
      <div
        onClick={() => dispatch(toggleFilerSidebar(true))}
        className={`col-2 ${style.filte_btn_mbl}`}
      >
        <span>
          <FaFilter />
        </span>
      </div>
    </div>
  );
};

export default JobSorting;
