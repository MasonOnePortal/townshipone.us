import { InfoCell } from "../../table/columns/InfoCell";
import { StatusCell } from "../../table/columns/StatusCell";
import { Location } from "../../table/columns/Location";
import { RealEstateAction } from "../../table/columns/RealEstateAction";

export const RealEstateTable = ({ columns, data }) => {
  return (
    <div className="table-responsive">
      <table className="table business_tbl">
        <thead className="table-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Address</th>
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
                <StatusCell status={row.approvalStatus} />
              </td>
              <td>
                <div className="tbl_adrs">
                  <Location
                    address={row.address}
                    state={row.state}
                    city={row.city}
                    zipCode={row.zipCode}
                  />
                </div>
              </td>
              <td>
                <RealEstateAction id={row.id} />
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
