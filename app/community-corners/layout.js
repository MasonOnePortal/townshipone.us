import Banner from "@/components/banner/Banner";
import second from "@/public/img/community.webp";
import style from "@/components/community-corner/community_corners.module.css";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";

import Content from "@/components/card/Content";
import { RightSidebarWrapper } from "@/components/community-corner/right-sidebar/RightSidebarWrapper";
import { CommunityProvider } from "@/context/CommunityProvider";
import { TabContainer } from "@/components/community-corner/TabContainer";
import { communityMetadata } from "./metadata";
import { UserHeader } from "@/components/community-corner/UserHeader";
const CommunityLayout = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Banner
        img={second}
        bannerHeading="Neighborhood Hub"
        bannerContent="Connect with your community in our designated area for updates, conversations, and shared stories"
      />
      <Breadcrumb pagename={"Neighborhood Hub"} url="/community-corners" />
      <CommunityProvider>
      
        <div className="container">
          
          <TabContainer />
          <UserHeader />
       
        </div>
        <div className={style.community_corner_wrapper}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-7">{children}</div>
              <div className="col-lg-4 col-md-5">
                <RightSidebarWrapper />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <Content
            contentData="Step into our Community Corner, where you can find essential information
and services that cater to the needs of our residents. One more line will
come here....."
          />
        </div>
      </CommunityProvider>
    </Suspense>
  );
};
<div></div>;
export default CommunityLayout;
export function generateMetadata({ params }) {
  return {
    title: communityMetadata.title,
  };
}
