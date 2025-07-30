"use client";
import style from "../../components/Information-listing/information-listing.module.css";
import Link from "next/link";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import Image from "next/image";
import { usePathname } from "next/navigation";
const InformationCard = ({ itemInfo }) => {
  const pathname = usePathname();
  return (
    <div className={style.info_data_wrap}>
      <div className={style.info_img_wrap}>
        <Link href={`${pathname}/${itemInfo.id}`}>
          <Image
            className={style.main_img_info}
            src={itemInfo.thumbnail ? itemInfo.thumbnail : imgPlaceHolder}
            alt="logo"
            width={260}
            height={245}
          />
        </Link>

        <div className="d-flex">
          <div className={style.category_name}>
            <Image
              src={itemInfo.avatar ? itemInfo.avatar : imgPlaceHolder}
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div className={style.ovrly_cl}></div>
      </div>
      <div className={style.info_text_wrap}>
        <Link href={`informations/${itemInfo.category}/${itemInfo.id}`}>
          <h3>{itemInfo.name}</h3>
        </Link>
        <p>{itemInfo.description}</p>
      </div>
    </div>
  );
};

export { InformationCard };
