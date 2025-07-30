import style from "../img-galley/our-food-items.module.css";
import ReactPlayer from "react-player";

function SingleVideo({ videos }) {
  return (
    <>
      <div className={style.info_itm_wrp}>
        <div className="card mt-4">
          <div className={`card-header ${style.card_header}`}>
            <h3>Video</h3>
          </div>
          <div>
            <div className="card-body">
              <div className="row">
                {videos ? (
                  <div className="wrap_video_cl">
                    <ReactPlayer className="vdo_cl" url={videos} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleVideo;
