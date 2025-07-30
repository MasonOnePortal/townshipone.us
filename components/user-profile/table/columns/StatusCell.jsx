export const StatusCell = ({ status }) => {
  return (
    <div className="">
      <small
        className={`${
          status === "Verified"
            ? "bg_light_success"
            : `${status === "Rejected" ? "bg_light_success" : "bg_light_warn"}`
        }`}
      >
        {status}
      </small>
    </div>
  );
};
