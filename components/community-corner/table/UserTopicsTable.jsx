"use client";
import { TopicsActionCell } from "./TopicsActionCell";
import { PostInfoCell } from "./PostInfoCell";
import { StatusCell } from "@/components/user-profile/table/columns/StatusCell";
import { Empty } from "@/components/Empty";
import { PostType } from "./PostType";

function UserTopicsTable({ columns, data }) {
  return (
    <div className="table-responsive">
      <table className="table business_tbl post_cc_table">
        <thead className="table-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Post Type</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr key={row.id}>
              <td>
                <PostInfoCell postData={row} />
              </td>
              <td>
                <PostType type={row.postType.name} />
              </td>
              <td>
                <StatusCell status={row.approvalStatus} />
              </td>
              <td>
                <TopicsActionCell id={row.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Array.isArray(data) && data.length == 0 ? <Empty /> : null}
    </div>
  );
}

export default UserTopicsTable;
