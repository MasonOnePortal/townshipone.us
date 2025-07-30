const Location = ({ address, state, city, zipCode = "" }) => (
  <div className="d-flex">
    <p className="mb-1 text-sm">
      {address},{city},
    </p>
    <p className="mb-1 text-sm">
      {state}, {zipCode}
    </p>
  </div>
);

export { Location };
