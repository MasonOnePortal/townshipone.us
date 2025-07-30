"use client";
import Pagination from "../../components/main-listing/Pagination";
import BlogItem from "./BlogItem";
import { Empty } from "../Empty";
import BlogItems from "./BlogItems";
export const BlogListWrappers = ({ blogsData }) => {
  const { data: blogs, ...restData } = blogsData;
  return (
    <>
      {blogs.length ? (
        <div className="">
          <div className="row">
            {blogs?.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <BlogItems blog={item} />
              </div>
            ))}
          </div>

          {!!restData.totalPages ? (
            <Pagination
              currentPage1={restData.page}
              totalPages={restData.totalPages}
              prevPage={restData.prevPage}
              nextPage={restData.nextPage}
            />
          ) : null}
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};
