"use client";
import Image from "next/image";
import style from "./Viewall.module.css";
import { useRouter } from "next/navigation";
import { FaRegCircleRight } from "react-icons/fa6";
import arrow from "@/public/imgs/arrow_icon.svg";
function ViewDetail({ url = "#" }) {
  const router = useRouter();
  return (
    <div>
      <button
        type="button"
        onClick={() => router.push(url)}
        className={`btn  ${style.view_all_btns}`}
      >
        View Details
        <Image
          src={arrow}
          alt="arrow"
          height={0}
          width={0}
          style={{ width: "auto", height: "auto" }}
        />
      </button>
    </div>
  );
}

export default ViewDetail;
