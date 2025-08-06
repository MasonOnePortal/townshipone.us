"use client";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Banner from "@/components/banner/Banner";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { useParams } from "next/navigation";
import second from "@/public/img/new.webp";
import Content from "@/components/card/Content";
import { BlogProvider } from "@/context/BlogProvider";
import { useGetOneBlogCategoryQuery } from "@/store/blogs/blogService";
import { isEmpty } from "lodash";
import { Loading } from "@/components/Loading";
import { useEffect, useState } from "react";
import Head from "next/head";
const BlogLayout = ({ children }) => {
  const { blogId, categoryId } = useParams();
  // const [pathName, setPathName] = useState("Blog Listings");
  const [pathName, setPathName] = useState("City Pulse <br/> Your Source for Deerfield Township & Symmes Township, OH Insights");
  const { data, isLoading } = useGetOneBlogCategoryQuery(categoryId, {
    refetchOnMountOrArgChange: true,
    skip: !!categoryId ? false : true,
  });
  useEffect(() => {
    if (!!categoryId && !isEmpty(data)) {
      setPathName((preVal) => (preVal = `${data?.name} Blogs`));
    } else if (!!blogId) {
      setPathName((preVal) => (preVal = "Blog Detail"));
    } else {
      // setPathName("Blog Listings");
      setPathName(
        "TownshipOne Blogs: Your Source for Deerfield Township & Symmes Township, OH Insights"
      );
    }
  }, [categoryId, blogId, data]);
  if (!isEmpty(categoryId) && (isLoading || isEmpty(data))) return <Loading />;
  return (
    <>
      <BlogProvider>
        <Head>
          <title>
          Deerfield Township & Symmes Township, OH Blogs: Local News, Events & Business Insights in
          Deerfield Township & Symmes Township, OH, OH & Surrounding Areas
          </title>
          <meta
            name="description"
            content="Explore TownshipOne's blog for the latest local news, events, business insights, and community stories in Deerfield Township & Symmes Township, OH."
          />
        </Head>
        <Banner
          img={second}
          bannerHeading="Blog"
          bannerContent=" Dive into a world of knowledge and inspiration on our vibrant blog page."
        />
        <Breadcrumb pagename={pathName} url={categoryId ? "/blog" : ""} />
        <div className="container">
          <Content contentData="Step into our blogosphere, where inspiration meets information. Dive into a wealth of articles covering diverse topics, designed to educate, entertain, and enlighten." />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-12 col-sm-12 col-md-8 mb-4">
              {children}
            </div>
            <div className="col-lg-3 col-12 col-sm-12 col-md-4">
              <BlogSidebar searchFilter={blogId ? false : true} />
            </div>
          </div>
        </div>
      </BlogProvider>
    </>
  );
};

export default BlogLayout;
