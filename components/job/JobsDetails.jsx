"use client";
import { useParams } from "next/navigation";
import style from "../../components/details-page/details.module.css";
import style2 from "./jobs-grid.module.css";
import second from "@/public/img/job_list_banner.webp";
import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useGetOneJobQuery } from "@/store/job/JobService";
import ContactInfo from "../details-page/ContactInfo";
import { Loading } from "../Loading";
import Content from "../card/Content";

function JobsDetails() {
  const { jobId } = useParams();
  const { data: jobDetails, isError, isLoading } = useGetOneJobQuery(jobId);
  if (isLoading) return <Loading />;
  return (
    <>
      <div>
        <div>
          <Banner
            img={second}
            bannerHeading="Job Details"
            bannerContent="Find Your Perfect Fit: Explore Diverse Job Listings"
          />
          <Breadcrumb pagename="Job Specifications" />
        </div>
        <div className="container">
          <Content contentData="Discover exciting career opportunities and explore our latest job listings tailored to your skills and interests. Take the next step in your professional journey with our diverse range of employment opportunities." />
        </div>

        <div>
          <div className={style.profile_hdr_wrap}>
            <div className="container">
              <div className="row">
                <div className="col-lg-9 mb-4">
                  <div className={style.info_itm_wrp}>
                    <div className="card mt-4">
                      <div className={`card-header ${style.card_header}`}>
                        <h3>{jobDetails?.title}</h3>
                      </div>

                      <div>
                        <div className="card-body">
                          <div>
                            <div className={` ${style.card_description}`}>
                              Job Description :
                            </div>
                            <div
                              className={`mb-0 ${style2.content_}`}
                              dangerouslySetInnerHTML={{
                                __html: jobDetails?.description,
                              }}
                            ></div>
                          </div>
                          <div>
                            <div className={` ${style.card_description}`}>
                              Department :
                              <span className={style2.content_}>
                                {jobDetails?.department}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className={` ${style.card_description}`}>
                              Employment Type :
                              <span className={style2.content_}>
                                {jobDetails?.jobType}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className={` ${style.card_description}`}>
                              Qualification :
                              <span className={style2.content_}>
                                {jobDetails?.qualifications}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p
                              className={` ${style.card_description} ${style.collSpacing}`}
                            >
                              Skills Required :
                            </p>
                            <span className="d-flex flex-wrap">
                              {jobDetails?.skills.map((item, index) => (
                                <span
                                  className={`${style.collSpacing} ${style.jb_tb_cl}`}
                                  key={index}
                                >
                                  <span className={style.keylayout}>
                                    {item}
                                  </span>
                                </span>
                              ))}
                            </span>
                          </div>
                          <div>
                            <div className={` ${style.card_description}`}>
                              Company Name :
                              <span className={style2.content_}>
                                {jobDetails?.company}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className={` ${style.card_description}`}>
                              About Company:
                            </div>
                            <div
                              className={`mb-0 ${style2.content_}`}
                              dangerouslySetInnerHTML={{
                                __html: jobDetails?.aboutCompany,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3">
                  <ContactInfo dataInfo={jobDetails} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobsDetails;
