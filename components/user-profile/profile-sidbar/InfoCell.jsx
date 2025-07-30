const InfoCell = ({ business }) => {
  return (
    <div className="d-flex align-items-center">
      <div className="tbl_nm">
        {business?.planId?.name ? <p> {business?.planId?.name}</p> : null}
      </div>
    </div>
  );
};

export { InfoCell };
