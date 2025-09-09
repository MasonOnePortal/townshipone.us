"use client";
import Banner from "@/components/banner/Banner";
import React from "react";
import { useParams } from "next/navigation";
import second from "@/public/img/new.webp";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import NewsSidebar from "@/components/blog/NewsSidebar";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import Content from "@/components/card/Content";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useGetOneNewsCategoryQuery } from "@/store/news/newsService";
const contentDatas = (
  <>
    Stay informed with our trusted online news service, including the reliable
    news sources to delivering the latest headlines and updates, including
    local, national and global enews. right at your fingertips.
  </>
);
export default function NewsLayout({ children }) {
  const { newsId, categoryId } = useParams();
  const [pathName, setPathName] = useState("News");
  const { data, isLoading } = useGetOneNewsCategoryQuery(categoryId, {
    refetchOnMountOrArgChange: true,
    skip: !!categoryId ? false : true,
  });
  useEffect(() => {
    if (!!categoryId && !isEmpty(data)) {
      setPathName((preVal) => (preVal = data?.name));
    } else if (!!newsId) {
      setPathName((preVal) => (preVal = "News Detail"));
    } else {
      setPathName("News Listings");
    }
  }, [categoryId, newsId, data]);
  if (!isEmpty(categoryId) && (isLoading || isEmpty(data))) return <Loading />;
  return (
    <Suspense fallback={<Loading />}>
      <Banner
        img={second}
        bannerHeading="News Listings"
        bannerContent="Stay updated with our comprehensive news coverage"
      />
      <Breadcrumb pagename={pathName} url={"/news"} />
      <div className="container">
        <h1 className="fs-4 ">Deerfield & Symmes Township OH News</h1>
        <div className="contentCss">
          <p>
            Stay informed with the latest news from Deerfield & Symmes Township OH, plus updates from around Ohio, the US, and the world. Explore local news and top Ohio news for state-wide updates, or catch up on top US news and top 20 US news stories. Stay globally aware with top global news and top 20 global news highlights.
          </p>
          <p>
            Whether it's community developments or major headlines affecting our region, we bring you the news that matters most to Deerfield & Symmes Township OH residents. Our comprehensive coverage ensures you stay informed about everything happening in and around your local community.
          </p>
        </div>
        {/* <Content contentData={contentDatas} /> */}
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-8 mb-4">{children}</div>
          <div className="col-lg-3 col-md-4">
            <NewsSidebar searchFilter={false} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
