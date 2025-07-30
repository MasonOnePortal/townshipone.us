"use client";
import style from "./Viewall.module.css";
import { useRouter } from "next/navigation";
import { FaRegCircleRight } from "react-icons/fa6";

function ViewAll({ url = "#" }) {
  const router = useRouter();
  return (
    <div>
      <button
        type="button"
        onClick={() => router.push(url)}
        className={`btn  ${style.view_all_btn}`}
      >
        View All <FaRegCircleRight />
      </button>
    </div>
  );
}

export default ViewAll;
