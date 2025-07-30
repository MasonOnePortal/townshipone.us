import Banner from "@/components/banner/Banner";
import React from "react";
import second from "@/public/imgs/price-plan.png";
import Price from "@/components/price-plan/Price";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

function PricePage() {
  return (
    <>
      <div>
        <Banner img={second} bannerHeading="Price Plan" />
        <Breadcrumb pagename="Price Plan" />
        <Price />
      </div>
    </>
  );
}

export default PricePage;
