export const NoData = ({ message = "No Data available" }) => {
  return (
    <>
      <p style={emptyPageStyle}>{message}</p>
    </>
  );
};

const emptyPageStyle = {
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "400",
  width: "100%",
  padding: "12px",
  marginBottom: "0px",
};
