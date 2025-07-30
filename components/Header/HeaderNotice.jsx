import style from "./header.module.css";
import Image from "next/image";
import image from "@/public/imgs/status_app.png";
export const HeaderNotice = () => {
  return (
    <>
      <div className="">
        <Image
          src={image}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      {/* <div className="header_notice_wrap">
        <div className="container">
          <div className="header_notice">
          <p>Website is Under development. coming soon !!</p>
        </div>
        </div>
      </div> */}
    </>
  );
};
