import React from "react";
import { InfoCell } from "@/components/user-profile/table/columns/InfoCell";
import { StatusCell } from "@/components/user-profile/table/columns/StatusCell";
import { BlogsActionCell } from "@/components/user-profile/table/columns/BlogsActionCell";
import { formatDateNew } from "@/utils/helperFn";

export const BlogTable = ({ columns, data }) => {
  return (
    <div className="table-responsive">
      <table className="table blog_tbl_cl">
        <thead>
          <tr>
            <th scope="col">Blog Title</th>
            <th scope="col">Created Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={row.id}>
              <td>
                <InfoCell business={row} />
              </td>
              <td>{formatDateNew(row.createdAt)} </td>

              <td>
                <StatusCell status={row.approvalStatus} />
              </td>

              <td>
                <BlogsActionCell id={row.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Array.isArray(data) && data.length == 0 ? (
        <p className="py-4 text-center d-block">No data available</p>
      ) : null}
    </div>
  );
};
