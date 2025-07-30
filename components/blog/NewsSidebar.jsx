"use client";
import { BlogCategories } from "./BlogCategories";
import { RecentNews } from "./RecentBlogs";
import {
  useGetAllNewsQuery,
  useGetNewsCategoriesQuery,
} from "@/store/news/newsService";
import { Loading } from "@/components/Loading";
import { isArray } from "lodash";
function NewsSidebar({ searchFilter = true }) {
  const { data: categories } = useGetNewsCategoriesQuery();
  const { data: response, isLoading } = useGetAllNewsQuery();
  if (isLoading) return <Loading />;
  const { data: news, ...restData } = { ...response };
  const recentNews = isArray(news) && news.length ? news.slice(0, 5) : null;
  return (
    <>
      <div>
        {isArray(categories) && categories.length ? (
          <BlogCategories
            title={"Categories"}
            baseUrl="news"
            listData={categories}
          />
        ) : null}
        {isArray(recentNews) && recentNews.length ? (
          <RecentNews
            title={"Recent News"}
            urlPage="news"
            dataArr={recentNews}
          />
        ) : null}
      </div>
    </>
  );
}

export default NewsSidebar;
