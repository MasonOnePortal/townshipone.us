"use client";

import style from "./header.module.css";
import { FaXmark } from "react-icons/fa6";
import Logo from "./Logo";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/store/auth/authSlice";
import { useGetAllFooterQuery } from "@/store/footer/footerServices";
import OutsideClickHandler from "react-outside-click-handler";
import HeaderLeft from "./HeaderLeft";

function Menu() {
  const dispatch = useDispatch();
  const { sidebarStatus } = useSelector((state) => state.auth);
  const { data: pageContent, isError, isLoading } = useGetAllFooterQuery();
  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => dispatch(toggleSidebar(false))}
      >
        <div
          className={`${style.nav_menu_area} ${
            sidebarStatus ? style.mobile_nav_opener : ""
          }`}
        >
          <div className={`d-lg-none text-center ${style.mobile_logo}`}>
            <Link href="/">
              <Logo logo={pageContent?.logo} />
            </Link>
            <div
              onClick={() => dispatch(toggleSidebar(false))}
              className={style.cls_icon}
            >
              <FaXmark />
            </div>
          </div>
          <ul className="list-inline">
            <li className="list-inline-item">
              <Link href="/">Home</Link>
            </li>
            <li className="list-inline-item">
              <Link href="/businesses">Businesses</Link>
            </li>

            <li className="list-inline-item">
              <Link href="/Deals-Discounts-and-Promotions-Mason-City-OH">Deals/Promotions</Link>
            </li>

            <li className="list-inline-item">
              <Link href="/Job-Listings-Mason-City-OH">Jobs</Link>
            </li>
            <li className="list-inline-item">
              <Link href="/Real-Estate-and-Business-Listings-Mason-City-OH">Real Estate</Link>
            </li>
            <li className="list-inline-item">
              <Link href="/community-corners">Community</Link>
            </li>
            <li className="list-inline-item">
              <Link href="/blog">Blogs</Link>
            </li>
            <li className="list-inline-item">
              <Link href="/price-plan">Plan</Link>
            </li>
            <li className="list-inline-item">
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li className="list-inline-item">
              <Link href="/about-us">About Us</Link>
            </li>
          </ul>
          <div className="_mob_sidebar_">
            <HeaderLeft />
          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
}

export default Menu;
