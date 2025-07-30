import { InfoCell } from "./columns/InfoCell";
import { StatusCell } from "./columns/StatusCell";
import { Location } from "./columns/Location";
import { ActionsCell } from "./columns/ActionsCell";
import { OfferAction } from "./columns/OfferAction";
import { OfferBusinessCell } from "./columns/OfferBusinessCell";
import PaginationTwo from "./PaginationTwo";

export const OfferTable = ({ columns, data }) => {
  return (
    <div className="table-responsive">
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Business</th>
            <th scope="col">Status</th>
            <th scope="col">Discount</th>
            <th scope="col">Promo Code</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={row.id}>
              <td>
                <InfoCell business={row} />
              </td>
              <td>
                <OfferBusinessCell business={row.business} />
              </td>
              <td>
                <StatusCell status={row.approvalStatus} />
              </td>
              <td>{row.discountPercentage} %</td>
              <td>{row.couponCode} </td>
              <td>
                <OfferAction id={row.id} />
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
