import style from "./information-listing.module.css";
import Link from "next/link";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import Image from "next/image";
import { useState } from "react";
function InformationListingItems({ item }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <Link href="/informations" className={style.information_link}>
      <Image
        className="information_img"
        src={imageError ? imgPlaceHolder : item.avatar || imgPlaceHolder}
        onError={handleImageError}
        alt={item.name}
        width={100}
        height={40}
      />
      <h4 className={style.business_name}>{item.name}</h4>
    </Link>
  );
}

export default InformationListingItems;
