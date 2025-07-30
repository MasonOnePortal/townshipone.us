import style from "./rating_raview.module.css";
import user_img from "@/public/imgs/user.png";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import Image from "next/image";
function Comments({ review }) {
  const ratings = review?.rating;

  return (
    <>
      <div className={style.wrap_cmn_items}>
        <div className="row">
          <div className="col-lg-1">
            <div className={`${style.user_img_cl} `}>
              <Image
                src={review?.user?.avatar ? review?.user?.avatar : user_img}
                alt="user avatar"
                width={0}
                height={0}
                className="rounded_full"
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div className="col-lg-11">
            <div className={style.user_cmn_name}>
              <h4>{`${review?.user?.first_name} ${review?.user?.last_name}`}</h4>
            </div>
            <div className="d-flex">
              <div className={style.all_star}>
                <div>
                  <>
                    {ratings != null ? (
                      <span>
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i}>
                            {ratings >= i + 1 ? (
                              <IoIosStar className={style.act_star_cl} />
                            ) : (
                              <IoIosStarOutline className={style.act_star_cl} />
                            )}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <div>No ratings available</div>
                    )}
                  </>
                </div>
              </div>
            </div>
            <div className={style.usr_msg}>
              <p>{review?.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comments;
