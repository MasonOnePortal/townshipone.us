"use client";
import style from "./header.module.css";
import Logo from "./Logo";
import { FaEnvelopeOpenText, FaPhone } from "react-icons/fa6";
import Link from "next/link";
import { useGetAllFooterQuery } from "@/store/footer/footerServices";
import { Loading } from "../Loading";
import HeaderLeft from "./HeaderLeft";
export const HeaderTop = () => {
  const { data: pageContent, isError, isLoading } = useGetAllFooterQuery();
  return (
    <div className={style.header_top_area}>
      <div className="container">
        <div className="row">
          <div className="col-7 col-md-5 ">
            <Link href="/" className="_header_logo_wrap">
              <Logo logo={pageContent?.logo} />
            </Link>
          </div>
          <div className="col-5 col-md-7 _to_left_">
            <HeaderLeft />
          </div>
        </div>
      </div>
    </div>
  );
};
