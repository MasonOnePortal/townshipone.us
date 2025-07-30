import { InfoCell } from "./columns/InfoCell";
import { StatusCell } from "./columns/StatusCell";
import { Location } from "./columns/Location";
import { ActionsCell } from "./columns/ActionsCell";

export const BTable = ({ columns, data }) => {
  return (
    <>
      <table className="table business_tbl table-responsive">
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
                <ActionsCell
                  category={row.category}
                  name={row.name}
                  id={row.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Array.isArray(data) && data.length == 0 ? (
        <p className="py-4 text-center d-block">No data available</p>
      ) : null}
    </>
  );
};
