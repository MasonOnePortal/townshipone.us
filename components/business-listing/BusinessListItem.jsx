import style from "./business_listing.module.css";
import Link from "next/link";
import Image from "next/image";
import offerstwo from "@/public/imgs/PlaceHolder.jpg";
import { useState } from "react";
function BusinessListItem({ business }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <Link href="#" className={style.business_link}>
      <Image
        className={`  ${style.business_img}`}
        src={imageError ? offerstwo : business.avatar || offerstwo}
        onError={handleImageError}
        alt="avatar"
        width={80}
        height={40}
      />
      <h4 className={style.business_name}>{business.name}</h4>
    </Link>
  );
}

export default BusinessListItem;
