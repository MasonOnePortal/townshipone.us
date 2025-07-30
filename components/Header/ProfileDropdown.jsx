import React from "react";
import Link from "next/link";
import style from "./header.module.css";
export const ProfileDropdown = () => {
  return (
    <>
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
              <Link href="/user-profile/user-real-estates">
                Add Real Estate
              </Link>
            </li>

            <li className="list-inline-item">
              <Link href="/user-profile/user-jobs">Add Job</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
