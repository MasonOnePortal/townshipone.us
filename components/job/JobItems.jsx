"use client";

import { useRouter } from "next/navigation";
import style from "./jobs-grid.module.css";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import Image from "next/image";
import { useState } from "react";
import moment from "moment";

function JobItems({
  title,
  company,
  // roleAndResponsibilities,
  description,
  thumbnail,
  skills,
  id,
  createdAt,
}) {
  const router = useRouter();

  const detailPage = async () => {
    router.push(`/Job-Listings-Mason-City-OH/${id}`);
  };
  // const htmlContent = roleAndResponsibilities || "Not Available";
  const descriptionContent = description || "Not Available";
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <>
      <div className={style.jobs_item_wrap}>
        <div className={`card ${style.crd_fld}`}>
          <div className={`card-body ${style.crd_bdy}`}>
            <div className="row">
              <div className="col-lg-2 col-md-3">
                <div className={style.cmp_lg}>
                  <Image
                    src={
                      imageError ? imgPlaceHolder : thumbnail || imgPlaceHolder
                    }
                    onError={handleImageError}
                    alt={title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="col-lg-10 col-md-9">
                <div className={style.jbs_rght}>
                  <h2>{title ? title : "Not  available"}</h2>

                  <div className={style.str_cmpny}>
                    <div>
                      <h5>{company ? company : "Not  available"}</h5>
                    </div>
                  </div>
                  <div className={style.description_jb_data}>
                    <div
                      dangerouslySetInnerHTML={{ __html: descriptionContent }}
                    />
                  </div>
                  <div className="d-flex flex-wrap gap-2 jobs_tab">
                    {skills.map((skill, id) => (
                      <span key={id}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`card-footer ${style.crd_ftr}`}>
            <div className={style.tm_post}>
              {moment(createdAt).endOf("day").fromNow()}
            </div>
            <div>
              <div>
                <button className={style.aply_nw} onClick={detailPage}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobItems;
