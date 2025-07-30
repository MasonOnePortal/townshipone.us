export const OfferBusinessCell = ({ business }) => {
  const { _id: id, name, email } = { ...business };
  return (
    <div className="d-flex align-items-center">
      <div className="tbl_nm">
        {name ? <p> {name}</p> : null}
        {email ? (
          <h5>
            <span>{email}</span>
          </h5>
        ) : null}
      </div>
    </div>
  );
};
