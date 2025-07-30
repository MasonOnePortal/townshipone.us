"use client";
import Pagination from "../../components/main-listing/Pagination";
import BlogItem from "./BlogItem";
import { Empty } from "../Empty";
export const BlogListWrapper = ({ blogsData }) => {
  const { data: blogs, ...restData } = blogsData;

  return (
    <>
      {blogs.length ? (
        <div className="">
          <div className="row">
            {blogs?.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <BlogItem blog={item} />
              </div>
            ))}
          </div>

          {restData.totalPages > 1 ? (
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
