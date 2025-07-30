import style from "./banner.module.css";
import second from "@/public/imgs/about_us.png";

function Banner({
  img = second,
  topHeading = null,
  bannerHeading,
  bannerContent,
}) {
  return (
    <div
      className={style.banner_wrapper}
      style={{ backgroundImage: `url(${img.src})` }}
    >
      <div className="custom_container">
        {topHeading && <h1 className="fs-3">{topHeading}</h1>}
        <h1>{bannerHeading}</h1>
        {!!bannerContent ? (
          <p className={style.banner_txt}>{bannerContent}</p>
        ) : null}
      </div>
      <div className={style.inner_banner_overlay}></div>
    </div>
  );
}

export default Banner;
