import BlogByCategory from "@/components/blog/BlogByCategory";
import { Loading } from "@/components/Loading";
import Head from "next/head";
import { Suspense } from "react";

export default async function BlogsCategoryPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Head>
        <title>
        Deerfield Township & Symmes Township, OH | Stay Updated with the Latest News and Insights Blog
        </title>
        <meta
          name="description"
          content="Explore the wealth of insightful news, timely news updates, and engaging community stories on Deerfield Township & Symmes Township, OH City. Stay up to date with happenings in Deerfield Township & Symmes Township, OH | US"
        />
      </Head>
      <BlogByCategory />
    </Suspense>
  );
}
