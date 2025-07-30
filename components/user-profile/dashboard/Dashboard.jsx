"use client";
import style from "@/components/user-profile/profile.module.css";
import Cards from "./Cards";
import { useUserStatisticsQuery } from "@/store/user/userService";
import { Loading } from "@/components/Loading";

export const Dashboard = () => {
  const { data, isLoading } = useUserStatisticsQuery();
  if (isLoading) return <Loading />;
  return (
    <>
      <div className={style.profile_heading}>
        <div
          className={`d-flex align-items-center justify-content-between ${style.heading_wr_c} `}
        >
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="row ">
        <Cards
          title="Real Estate"
          length={data?.realEstateCount}
          icon="festival"
          lastMonth={data?.realEstateCountCurrentMonth}
        />
        <Cards
          title="Businesses"
          length={data?.businessCount}
          icon="businesses"
          lastMonth={data?.businessCountCurrentMonth}
        />
        <Cards
          title="Offer"
          length={data?.offerCount}
          icon="offer"
          lastMonth={data?.offerCountCurrentMonth}
        />
        <Cards
          title="Jobs"
          length={data?.jobCount}
          icon="jobs"
          lastMonth={data?.jobCountCurrentMonth}
        />
      </div>
    </>
  );
};
