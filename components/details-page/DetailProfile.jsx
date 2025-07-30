import style from "./details.module.css";
import ProfileInfoLogoName from "./ProfileInfoLogoName";
import { isEmpty } from "lodash";

function DetailProfile({ dataInfo }) {
  return (
    <>
      <div>
        <div className="row">
          <div className="col-lg-7">
            {isEmpty(dataInfo) ? null : (
              <div>
                <ProfileInfoLogoName basicInfo={dataInfo} />
              </div>
            )}
          </div>
          <div className="col-lg-5">
            <div className={style.like_share_wrap}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailProfile;
