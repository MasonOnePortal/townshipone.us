import style from "./details.module.css";

function Description({ description, propertyDescription }) {
  return (
    <>
      <div className={style.info_itm_wrp}>
        <div className="card mt-4">
          <div className={`card-header ${style.card_header}`}>
            <h3 className="">{propertyDescription || "Description"}</h3>
          </div>
          <div>
            <div className="card-body">
              {description ? (
                <p className="text_dess_cri">{description}</p>
              ) : (
                <p className="p-5 text-center">No Content Available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Description;
