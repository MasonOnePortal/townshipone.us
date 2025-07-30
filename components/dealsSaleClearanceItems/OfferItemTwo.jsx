"use client";
import { FaRegCircleRight } from "react-icons/fa6";
import style from "./dealssaleclearance.module.css";
import Link from "next/link";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import { useRouter } from "next/navigation";
const OfferItemTwo = ({ offer }) => {
  const router = useRouter();

  const offerImage = offer.image ? offer.image : imgPlaceHolder;
  const offerDetailHandler = () => {
    router.push(`/Deals-Discounts-and-Promotions-Mason-City-OH/${offer.id}`);
  };
  return (
    <div
      onClick={offerDetailHandler}
      className={`${style.offer_categoryWrap} ${style.wrap_deals} ${style.wrap_slide_deals}`}
      style={{ backgroundImage: `url(${offerImage})` }}
    >
      <h4>{offer.offerType}</h4>
      <div className={style.overlay_deals}></div>
      <Link href={`/Deals-Discounts-and-Promotions-Mason-City-OH/${offer.id}`}>
        <h5 className="me-2">
          {offer.title ? offer.title : ""}
          <FaRegCircleRight className="ms-2" />
        </h5>
      </Link>
    </div>
  );
};

export default OfferItemTwo;
