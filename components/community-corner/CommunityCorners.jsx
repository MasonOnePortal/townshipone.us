import Banner from "@/components/banner/Banner";
import CommunityCorner from "@/components/community-corners/CommunityCorner";
import React from "react";
import second from "@/public/imgs/community.png";

function CommunityCorners() {
  return (
    <>
      <div>
        <div>
          <Banner img={second} bannerHeading="Community Corner" />
        </div>
        <CommunityCorner />
      </div>
    </>
  );
}

export default CommunityCorners;
