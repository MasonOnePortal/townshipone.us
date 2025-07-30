import style from "./details.module.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import { isEmpty } from "lodash";
import { joinWithComma, joinWithSpace } from "@/utils/helperFn";

function ContactInfo({ dataInfo }) {
  return (
    <>
      <div className={`mb-3 ${style.info_itm_wrp}`}>
        <div className="card">
          <div className={`card-header ${style.card_header}`}>
            <h3>Contact Info</h3>
          </div>
          <div>
            <div className="card-body">
              <ul className={style.cntct_info}>
                {dataInfo?.ownerName ? (
                  <li>
                    <div>
                      <h4>Contact Person</h4>
                      <a href="#">
                        {dataInfo?.ownerName ? (
                          dataInfo?.ownerName
                        ) : (
                          <p>Not available yet</p>
                        )}
                      </a>
                    </div>
                  </li>
                ) : null}
                <li>
                  <div className={style.dir_styl}>
                    <h4>Get Directions</h4>

                    <a
                      href={`https://www.google.com/maps/search/${encodeURI(
                        `${joinWithSpace(
                          dataInfo?.address,
                          dataInfo?.city,
                          dataInfo?.state,
                          dataInfo?.zipCode
                        )}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {joinWithComma(
                        dataInfo?.address,
                        dataInfo?.city,
                        dataInfo?.state,
                        dataInfo?.zipCode
                      )}
                    </a>
                  </div>
                </li>

                {dataInfo?.phone ? (
                  <li>
                    <div>
                      <h4>Contact no</h4>
                      <a
                        href={dataInfo?.phone ? `tel:${dataInfo?.phone}` : "#"}
                      >
                        {dataInfo?.phone ? (
                          dataInfo?.phone
                        ) : (
                          <p>Not available yet</p>
                        )}
                      </a>
                    </div>
                  </li>
                ) : null}

                {dataInfo?.website ? (
                  <li>
                    <div className={style.dir_styl}>
                      <h4>Website</h4>
                      <a
                        href={
                          dataInfo?.website.startsWith("https")
                            ? dataInfo?.website
                            : `https://${dataInfo?.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {dataInfo?.website ? (
                          dataInfo?.website
                        ) : (
                          <p>Not available yet</p>
                        )}
                      </a>
                    </div>
                  </li>
                ) : null}

                {dataInfo?.email ? (
                  <li>
                    <div>
                      <h4>Email</h4>
                      <a href={`mailto:${dataInfo?.email}`}>
                        {dataInfo?.email}
                      </a>
                    </div>
                  </li>
                ) : null}
                {isEmpty(dataInfo?.instagram) ||
                isEmpty(dataInfo?.facebook) ||
                isEmpty(dataInfo?.youtube) ? null : (
                  <li>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4>Follow Us On:</h4>
                      </div>
                      <div
                        className={`d-flex justify-content-between align-items-center ${style.rght_socail_cl}`}
                      >
                        {dataInfo?.instagram ? (
                          <a href={`${dataInfo?.instagram}`} target="_blank">
                            <FaInstagram />
                          </a>
                        ) : null}
                        {dataInfo?.facebook ? (
                          <a href={`${dataInfo?.facebook}`} target="_blank">
                            <FaFacebookF />
                          </a>
                        ) : null}
                        {dataInfo?.youtube ? (
                          <a href={`${dataInfo?.youtube}`} target="_blank">
                            <FaYoutube />
                          </a>
                        ) : null}
                        {dataInfo?.linkedin ? (
                          <a href={`${dataInfo?.linkedin}`} target="_blank">
                            <FaLinkedinIn />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactInfo;
