import Loader from "@/components/loader/Loader";
import { useGetAllPaymentQuery } from "@/store/subscription/subscriptionService";

import { StatusCell } from "./StatusCell";
import { InfoCell } from "./InfoCell";
import { formatDateNew } from "@/utils/helperFn";
import Link from "next/link";
import { Loading } from "@/components/Loading";
const PlanHistory = () => {
  const { data, isLoading } = useGetAllPaymentQuery();
  const alldata = data?.data;
  if (isLoading) return <Loading />;

  return (
    <div className="table-responsive">
      <table className="table blog_tbl_cl">
        <thead>
          <tr>
            <th scope="col">Sr. No</th>
            <th scope="col">Plan Name</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
            <th scope="col">Transaction Id</th>
            <th scope="col">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(alldata) && alldata.length ? (
            alldata?.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>
                  <InfoCell business={row} />
                </td>
                <td>
                  <StatusCell status={row.status} />
                </td>
                <td>$ {row.amount}</td>
                <td>{row.transactionId}</td>
                <td>{formatDateNew(row.createdAt)} </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                Data is not an available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlanHistory;
