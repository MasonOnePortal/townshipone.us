import style from "./proservice.module.css";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import Image from "next/image";
const ServiceCard = ({ item }) => {
  return (
    <div className={`card ${style.card_cstmz}`}>
      <div className={`card_body`}>
        <div className={style.user_profile_wrapper}>
          <Image
            src={item.logo ? item.logo : imgPlaceHolder}
            alt="icon"
            className="mb-2"
            width={80}
            height={80}
          />
        </div>
        <div className={style.info_wrap_}>
          <h3>{item.name}</h3>
        </div>
        <div className={style.des_wrap}>
          <div className="">
            <p>{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
