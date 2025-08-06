"use client";
import Slider from "react-slick";
import { formatDistanceToNow } from "date-fns";
import style from "./jobs-grid.module.css";
import { FaClock } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import ViewAll from "../ViewAllBtn/ViewAll";
// import { useGetAllJobsQuery } from "@/store/job/JobService";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import { Loading } from "@/components/Loading";
import Image from "next/image";
import Link from "next/link";
import { useGetAllPromotedJobsQuery } from "@/store/job/JobService";
import { isEmpty } from "lodash";
const removeAboutFromFormattedDate = (formattedDate) => {
  return formattedDate.replace("about", "").trim();
};

function JobsGrid() {
  const { data: getAllJobs, isLoading } = useGetAllPromotedJobsQuery({
    query: 1,
    pageSize: 12,
  });
  const router = useRouter();

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    dots: false,
    infinite: getAllJobs?.length > 2,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) return <Loading />;
  if (isEmpty(getAllJobs)) return null;
  const jobDetailHandler = (jobId) => {
    router.push(`/Job-Listings-Mason-City-OH/${jobId}`);
  };
  return (
    <div className={style.wrap_jobs_grid}>
      <div className="container">
        <div className="section_Heading">
          <h2>
            Current Job Openings in Deerfield Township & Symmes Township, OH
          </h2>
        </div>
        <div className="wrap_job_slider_data">
          <Slider {...settings}>
            {getAllJobs ? (
              getAllJobs?.map((job) => (
                <div
                  onClick={() => jobDetailHandler(job.id)}
                  className="jobs_item"
                  key={job.id}
                >
                  <div className="wrap_jobs_slider">
                    <div className="job_grd_top">
                      <div className="job_left_logo">
                        <Link href={`/Job-Listings-Mason-City-OH/${job.id}`}>
                          <Image
                            src={job.thumbnail ? job.thumbnail : imgPlaceHolder}
                            width={255}
                            height={200}
                            priority={false}
                            placeholder="empty"
                            alt={job.title}
                          />
                        </Link>
                      </div>
                      <div className="job_rght_text text-min-20 w-100">
                        <a href="#">
                          <h3>{job.title}</h3>
                          <div
                            className="des_wrap_jb"
                            dangerouslySetInnerHTML={{
                              __html: job.description,
                            }}
                          ></div>
                        </a>
                      </div>
                    </div>
                    <div className="d-flex jobs_tab  flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span key={index}>{skill}</span>
                      ))}
                    </div>
                    <div className="d-flex justify-content-end verify_tick">
                      <div className="d-flex align-items-center post_time_data">
                        <b>
                          <FaClock /> Time :
                        </b>

                        <span>
                          {removeAboutFromFormattedDate(
                            formatDistanceToNow(new Date(job.createdAt), {
                              addSuffix: true,
                              includeSeconds: true,
                            })
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </Slider>

          <div className="text-center mt-3">
            <ViewAll url="/Job-Listings-Mason-City-OH" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsGrid;
