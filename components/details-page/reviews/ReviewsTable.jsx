import { formatDateNew } from "@/utils/helperFn";
import { format } from "date-fns";
import { IoIosStar } from "react-icons/io";
import { CommentUser } from "./CommentUser";
const ReviewsTable = ({ data }) => {
  return (
    <div className="table-responsive">
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Review </th>
            <th scope="col">User</th>
            <th scope="col">Date</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index, id) => (
            <tr key={row.id}>
              <td className="comment_section">
                <p className="mb-1"> {row.comment}</p>
              </td>
              <td>
                <CommentUser user={row.user} />
              </td>
              <td>{formatDateNew(row.createdAt)}</td>
              <td>
                {row.rating}
                <span className="str_rating">
                  <IoIosStar />
                </span>
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

export default ReviewsTable;
