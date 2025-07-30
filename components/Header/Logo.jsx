import placeholder from "@/public/logo/logo.png";
import style from "./header.module.css";
import Image from "next/image";
import { useState } from "react";
export default function Logo({ logo }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className={style.hdr_logo}>
      <Image
        className="custom_logo"
        src={`logo.png` || imageError ? placeholder : logo || placeholder}
        onError={handleImageError}
        alt="Township.us Logo"
        width={105}
        height={40}
      />
    </div>
  );
}
