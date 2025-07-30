const StatusCell = ({ status }) => {
  return (
    <div className="">
      <small
        className={`${
          status === "succeeded"
            ? "bg_light_success"
            : `${status === "processing" ? "bg_light_danger" : "bg_light_warn"}`
        }`}
      >
        {status}
      </small>
    </div>
  );
};

export { StatusCell };
