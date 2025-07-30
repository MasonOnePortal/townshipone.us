import style from "./details.module.css";
import { FaComments, FaEnvelope } from "react-icons/fa6";
import Link from "next/link";

function SellerMessageBtn() {
  return (
    <>
      <div className={style.wrap_btn_cmnct}>
        <div className="">
          <div>
            <Link href="#" className={style.bg_color_msg}>
              <FaEnvelope /> Message to Seller Message
            </Link>
          </div>
          <div>
            <Link href="#">
              <FaComments /> Please login for Chat
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerMessageBtn;
