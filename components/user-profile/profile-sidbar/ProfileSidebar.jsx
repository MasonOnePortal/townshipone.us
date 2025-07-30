"use client";
import style from "@/components/user-profile/profile.module.css";
import { FiGrid, FiLogOut, FiSettings, FiStar } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { IoMdBusiness } from "react-icons/io";
import { FaBoxOpen, FaHouse, FaPercent, FaSuitcase } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, toggleProfileSidebar } from "@/store/auth/authSlice";
import { UserProfilePic } from "./UserProfilePic";
import Link from "next/link";
import OutsideClickHandler from "react-outside-click-handler";
import { removeToken } from "@/utils/token";
import { FaBarsStaggered } from "react-icons/fa6";
export const ProfileSidebar = ({ activeTab }) => {
  const { profileSidebarStatus } = useSelector((state) => state.auth);
  const { currentPlan } = useSelector((state) => state.plan);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const router = useRouter();
  const logoutHandler = async () => {
    dispatch(logoutUser());
    removeToken();
    router.push("/");
  };

  return (
    <>
      <div className="open_profile_sidebar">
        <div className="">
          <h4
            className={style.user_name_in}
          >{`${currentUser?.first_name} ${currentUser?.last_name}`}</h4>
          <span className="pln_dd_cc">({currentPlan.name})</span>
        </div>

        <div
          className=""
          onClick={() => dispatch(toggleProfileSidebar(!profileSidebarStatus))}
        >
          <FaBarsStaggered />
        </div>
      </div>
      <div
        className={`${style.wrap_profile_data} ${
          profileSidebarStatus ? style.wrap_profile_open : ""
        }`}
      >
        <OutsideClickHandler
          onOutsideClick={() => dispatch(toggleProfileSidebar(false))}
        >
          <div className={style.user_profile_left}>
            <UserProfilePic />
            <div className={style.profile_sidebar_menu}>
              <ul>
                <li
                  className={`${
                    activeTab === "user-profile" ? style.sidenv_actv : ""
                  }`}
                >
                  <Link href="/user-profile">
                    <FiGrid /> Dashboard
                  </Link>
                </li>
                <li
                  className={`${
                    [
                      "add-business",
                      "user-businesses",
                      "user-reviews",
                    ].includes(activeTab)
                      ? style.sidenv_actv
                      : ""
                  }`}
                >
                  <Link href="/user-profile/user-businesses">
                    <IoMdBusiness /> Businesses
                  </Link>
                </li>
                <li
                  className={`${
                    ["user-offers", "add-offer"].includes(activeTab)
                      ? style.sidenv_actv
                      : ""
                  }`}
                >
                  <Link href="/user-profile/user-offers">
                    <FaPercent />
                    Offers
                  </Link>
                </li>
                <li
                  className={`${
                    ["user-jobs", "add-job"].includes(activeTab)
                      ? style.sidenv_actv
                      : ""
                  }`}
                >
                  <Link href="/user-profile/user-jobs">
                    <FaSuitcase />
                    Jobs
                  </Link>
                </li>
                <li
                  className={`${
                    ["user-real-estates", "add-real-estate"].includes(activeTab)
                      ? style.sidenv_actv
                      : ""
                  }`}
                >
                  <Link href="/user-profile/user-real-estates">
                    <FaHouse />
                    Real Estates
                  </Link>
                </li>
                <li
                  className={`${
                    activeTab === "profile-settings" ? style.sidenv_actv : ""
                  }`}
                >
                  <Link href="/user-profile/profile-settings">
                    <FiSettings /> Settings
                  </Link>
                </li>
                <li>
                  <a onClick={logoutHandler}>
                    <FiLogOut />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </>
  );
};
