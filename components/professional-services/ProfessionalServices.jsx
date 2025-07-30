import React from "react";
import { ServiceWrapper } from "./ServiceWrapper";
import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import second from "@/public/img/new.webp";
const ProfessionalServices = () => {
  return (
    <>
      <Banner img={second} bannerHeading="Professional Services" />
      <Breadcrumb pagename="Professional Services" />

      <div className="container">
        <ServiceWrapper />
      </div>
    </>
  );
};

export default ProfessionalServices;
