import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Banner from "@/components/banner/Banner";
import second from "@/public/imgs/community.png";
import React from "react";
import ContactUs from "@/components/contact/ContactUs";

function ContactPage() {
  return (
    <>
      <div>
        <div>
          <Banner img={second} bannerHeading="Contact Us" />
          <Breadcrumb pagename="Contact Us" />
          <ContactUs />
        </div>
      </div>
    </>
  );
}

export default ContactPage;
