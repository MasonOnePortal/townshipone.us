import DataTable from "react-data-table-component";

function CustomTable({ data, column }) {
  return (
    <DataTable className="data_table_wrapper" columns={column} data={data} />
  );
}
export { CustomTable };
