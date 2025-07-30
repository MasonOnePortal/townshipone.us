import { InfoCell } from "@/components/user-profile/table/columns/InfoCell";
import { Location } from "@/components/user-profile/table/columns/Location";
import { StatusCell } from "@/components/user-profile/table/columns/StatusCell";
import { JobActionCell } from "@/components/user-profile/table/columns/JobActionCell";

export const JobsTable = ({ columns, data }) => {
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
                  />
                </div>
              </td>
              <td>
                <JobActionCell id={row.id} />
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
