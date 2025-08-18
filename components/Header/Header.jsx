"use client";

import React, { useState } from "react";
import {
  FaBarsStaggered,
  FaXmark,
  FaPhone,
  FaEnvelopeOpenText,
  FaRightToBracket,
  FaChevronDown,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import style from "./header.module.css";
import { useSelector } from "react-redux";

// Static Logo Component
export const Logo = () => {
  return (
    <div className={style.hdr_logo}>
      <Image
        className="custom_logo"
        src="/logo.png" // Static logo path
        alt="TownshipOne.us Logo"
        width={220}
        height={80}
      />
    </div>
  );
};

// Static Header Left Component
const HeaderLeft = () => {
  // Static contact information
  const contactInfo = {
    primaryPhone: "877 674 4668",
    primaryEmail: "admin@ohioone.us",
  };

  return (
    <div className={style.header_top_area_right}>
      <div className="d-flex justify-content-end">
        <div className={style.header_top_contact}>
          <Link href={`tel:+1 ${contactInfo.primaryPhone}`}>
            <div className="d-flex align-items-center">
              <div>
                <FaPhone />
              </div>
              <div>
                <p>Call Us</p>
                <h5>{contactInfo.primaryPhone}</h5>
              </div>
            </div>
          </Link>
        </div>

        <div>
          <Link href={`mailto:${contactInfo.primaryEmail}`}>
            <div className="d-flex align-items-center">
              <div>
                <FaEnvelopeOpenText />
              </div>
              <div>
                <p>Email Us</p>
                <h5>{contactInfo.primaryEmail}</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Static Login Register Component
const LoginRegistertwo = () => {
  return (
    <div className={`login_Styl ${style.wrap_login_reg}`}>
      <div className={style.login_btn}>
        <Link href={"/auth/login"}>
          <FaRightToBracket /> Login
        </Link>
      </div>
      <div className={style.register_btn}>
        <Link href={"/price-plan"}>Register</Link>
      </div>
    </div>
  );
};

// Static Profile Dropdown Component
const ProfileDropdown = () => {
  return (
    <div className={style.profile_dropdown_main}>
      <div className={`${style.profile_dropdown_container}`}>Profile</div>
      <div className={style.profile_dropdown_wrapper}>
        <ul className="">
          <li className="list-inline-item">
            <Link href="/user-profile">Profile</Link>
          </li>
          <li className="list-inline-item">
            <Link href="/user-profile/user-businesses">Add Business</Link>
          </li>
          <li className="list-inline-item">
            <Link href="/user-profile/user-offers">Add Offer</Link>
          </li>
          <li className="list-inline-item">
            <Link href="/user-profile/user-real-estates">Add Real Estate</Link>
          </li>
          <li className="list-inline-item">
            <Link href="/user-profile/user-jobs">Add Job</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Cities Dropdown Component
const CitiesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Aap yahan apni cities ki list add kar sakte hain
  const cities = [
    { name: "Cincinnati", url: "http://cincinnatione.us/" },
    { name: "West Chester", url: "https://westchesterone.net" },
    { name: "Middletown", url: "https://middletownone.us" },
    { name: "Loveland", url: "https://lovelandone.us" },
    { name: "Lebanon", url: "https://lebanonone.us" },
    { name: "Fairfield", url: "https://fairfieldone.us" },
    { name: "Township", url: "https://townshipone.us" },
    { name: "Hamilton", url: "https://hamiltonone.us" },
    { name: "Ohio", url: "https://ohioone.us" },
    { name: "Mason", url: "https://masonone.us" },
  ];

  return (
    <div className={style.cities_dropdown_main}>
      <div
        className={style.cities_dropdown_trigger}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span>Other Ohio City Portal's</span>
        <FaChevronDown
          className={`${style.dropdown_icon} ${isOpen ? style.rotate : ""}`}
        />

        {isOpen && (
          <div className={style.cities_dropdown_wrapper}>
            <ul>
              {cities.map((city, index) => (
                <li key={index}>
                  <a href={city.url} target="_blank" rel="noopener noreferrer">
                    {city.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Static Login Register Main Component
const LoginRegister = () => {
  // Static login state - you can change this to true to show ProfileDropdown
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className={style.wrap_login_reg}>
      <div className="d-flex justify-content-end align-items-center">
        {isLoggedIn ? <ProfileDropdown /> : <LoginRegistertwo />}
      </div>
    </div>
  );
};

// Static Menu Component
const Menu = ({ sidebarStatus, toggleSidebar }) => {
  return (
    <div
      className={`${style.nav_menu_area} ${
        sidebarStatus ? style.mobile_nav_opener : ""
      }`}
    >
      <div className={`d-lg-none text-center ${style.mobile_logo}`}>
        <Link href="/">
          <Logo />
        </Link>
        <div onClick={() => toggleSidebar(false)} className={style.cls_icon}>
          <FaXmark />
        </div>
      </div>
      <ul className="list-inline" style={{ textAlign: "center" }}>
        <li className="list-inline-item">
          <Link href="/">Home</Link>
        </li>
        <li className="list-inline-item">
          <Link href="/businesses">Businesses</Link>
        </li>
        <li className="list-inline-item">
          <Link href="/Deals-Discounts-and-Promotions-Mason-City-OH">
            Deals/Promotions
          </Link>
        </li>
        <li className="list-inline-item">
          <Link href="/Job-Listings-Mason-City-OH">Jobs</Link>
        </li>
        <li className="list-inline-item">
          <Link href="/Real-Estate-and-Business-Listings-Mason-City-OH">
            Real Estate
          </Link>
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
        <li className="list-inline-item" style={{ marginTop: "10px" }}>
          <CitiesDropdown />
        </li>
      </ul>
      <div className="_mob_sidebar_">
        <HeaderLeft />
      </div>
    </div>
  );
};

// Static Header Top Component
const HeaderTop = () => {
  return (
    <div className={style.header_top_area}>
      <div className="container">
        <div className="row">
          <div className="col-7 col-md-5 ">
            <Link href="/" className="_header_logo_wrap">
              <Logo />
            </Link>
          </div>
          <div className="col-5 col-md-7 _to_left_ header-extend">
            <HeaderLeft />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Static Header Component
function Header() {
  const [sidebarStatus, setSidebarStatus] = useState(false);

  const toggleSidebar = (status) => {
    setSidebarStatus(status);
  };

  return (
    <>
      <HeaderTop />
      <div className={style.main_header_area}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9 col-4">
              <Menu
                sidebarStatus={sidebarStatus}
                toggleSidebar={toggleSidebar}
              />
              <div
                onClick={() => toggleSidebar(true)}
                className={`d-lg-none d-md-block ${style.mobile_menu_opener}`}
              >
                <FaBarsStaggered />
              </div>
            </div>
            <div className="col-lg-3 col-8">
              <LoginRegister />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
