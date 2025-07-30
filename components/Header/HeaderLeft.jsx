"use client";
import style from "./header.module.css";
import { FaEnvelopeOpenText, FaPhone } from "react-icons/fa6";
import Link from "next/link";
import { useGetContactDetailsQuery } from "@/store/footer/footerServices";
import { Loading } from "../Loading";
const HeaderLeft = () => {
  const { data: contactInfo, isError, isLoading } = useGetContactDetailsQuery();
  const phoneNumber = contactInfo?.primaryPhone;

  const formattedPhoneNumber = phoneNumber
    ? phoneNumber.replace(/(\d{3})-(\d{3})-(\d{4})/, "($1) $2-$3")
    : "";
  if (isLoading) return <Loading />;
  return (
    <div className={style.header_top_area_right}>
      <div className="d-flex justify-content-end">
        <div className={style.header_top_contact}>
          <Link href={`tel:+1 ${contactInfo?.primaryPhone}`}>
            <div className="d-flex align-items-center">
              <div>
                <FaPhone />
              </div>
              <div>
                <p>Call Us</p>
                <h5>{contactInfo?.primaryPhone}</h5>
              </div>
            </div>
          </Link>
        </div>

        <div>
          <Link href={`mailto:${contactInfo?.primaryEmail}`}>
            <div className="d-flex align-items-center">
              <div>
                <FaEnvelopeOpenText />
              </div>
              <div>
                <p>Email Us</p>
                <h5>{contactInfo?.primaryEmail}</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderLeft;
