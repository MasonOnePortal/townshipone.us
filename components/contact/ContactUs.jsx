"use client";
import style from "./contact.module.css";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import contactImg from "@/public/img/cntct.webp";
import ContactForm from "./ContactForm";
import Image from "next/image";
import { useGetContactInformationQuery } from "@/store/common api/commonService";
import { Loading } from "../Loading";
import { alignPropType } from "react-bootstrap/esm/types";
function ContactUs() {
  const {
    data: contactData,
    isLoading,
    isError,
  } = useGetContactInformationQuery();
  if (isLoading) return <Loading />;
  return (
    <>
      <div>
        <div className="container">
          <div className={style.wrap_contact_info}>
            <div className="row">
              <div className="col-md-4">
                <div className={style.cntc_info}>
                  <div>
                    <span>
                      <FaPhone />
                    </span>
                  </div>
                  <div>
                    <h4>Phone Number</h4>
                    <p>{contactData.primaryPhone}</p>
                    {contactData.secondaryPhone ? (
                      <p>{contactData.secondaryPhone}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={style.cntc_info}>
                  <div>
                    <span>
                      <FaEnvelope />
                    </span>
                  </div>
                  <div>
                    <h4>Email Address</h4>
                    <p>{contactData.primaryEmail}</p>
                    {contactData.secondaryEmail ? (
                      <p>{contactData.secondaryEmail}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={style.cntc_info}>
                  <div>
                    <span>
                      <FaLocationDot />
                    </span>
                  </div>
                  <div>
                    <h4>Address</h4>
                    <p>{`${contactData.address} ${contactData.city} ${contactData.state}  ${contactData.zipCode}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.contact_frm_sec}>
            <div className="row">
              <div className="col-md-6">
                <div className={style.contact_img}>
                  <Image
                    src={contactImg}
                    alt="Contact Us - Reach Out Now"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={style.contact_form}>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
