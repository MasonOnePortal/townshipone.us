import { isArrayEmptyOrWhitespace } from "@/utils/helperFn";
import style from "../img-galley/our-food-items.module.css";
import ReactPlayer from "react-player";

function Video({ videos }) {
  return (
    <>
      <div className={style.info_itm_wrp}>
        <div className="card mt-4">
          <div className={`card-header ${style.card_header}`}>
            <h3>Videos</h3>
          </div>
          <div>
            <div className="card-body">
              <div className="row">
                {videos && videos.length ? (
                  videos.map((item) => (
                    <div
                      key={item}
                      className={videos.length > 1 ? "col-md-6" : "col-md-12"}
                    >
                      <div className="wrap_video_cl">
                        <ReactPlayer className="vdo_cl" url={item} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-md-12">
                    <p>Not available yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;
