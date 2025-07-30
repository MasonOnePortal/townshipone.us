import { BlogCategories } from "./BlogCategories";
import { useGetBlogCategoriesQuery } from "@/store/blogs/blogService";
import { useGetAllBlogsQuery } from "@/store/blogs/blogService";
import { Loading } from "@/components/Loading";
import { isArray } from "lodash";
import { RecentNews } from "./RecentNews";
function BlogSidebar({ searchFilter = true }) {
  const { data: categories } = useGetBlogCategoriesQuery();
  const { data: response, isLoading } = useGetAllBlogsQuery();
  if (isLoading) return <Loading />;
  const { data: blogs } = { ...response };
  const recentBlogs = isArray(blogs) && blogs.length ? blogs.slice(0, 5) : null;
  return (
    <>
      <div>
        <BlogCategories title={"Blog Categories"} listData={categories} />
        <RecentNews
          title={"Recent Blogs"}
          urlPage="blog"
          dataArr={recentBlogs}
        />
      </div>
    </>
  );
}

export default BlogSidebar;
