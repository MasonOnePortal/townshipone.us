import { formatDateNew } from "@/utils/helperFn";
import defaultImage from "@/public/imgs/user.png";
import Image from "next/image";
const InfoCell = ({ business }) => {
  return (
    <div className="d-flex align-items-center no_wrap">
      <div className="symbol symbol-circle symbol-50px me-3">
        <a href="#">
          <div className="symbol-label tbl_img">
            <Image
              src={business.avatar ? business.avatar : defaultImage}
              alt="business logo"
              className="w-100"
              width={0}
              height={0}
              sizes="100dvw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </a>
      </div>
      <div className="tbl_nm">
        {business.title ? <p> {business.title}</p> : null}
        {business.name ? <p> {business.name}</p> : null}
        {business?.email ? (
          <h5>
            <span>{business?.email}</span>
          </h5>
        ) : null}
        {business.startDate && business.endDate ? (
          <h5>
            <span>
              {formatDateNew(business.startDate)} -{" "}
              {formatDateNew(business.endDate)}
            </span>
          </h5>
        ) : null}
      </div>
    </div>
  );
};

export { InfoCell };
