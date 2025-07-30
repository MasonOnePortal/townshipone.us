import style from "@/components/forms/auth.module.css";
import { CustomMessage } from "./CustomMessage";
import Link from "next/link";
const combinedClassName = `btn btn-secondary ${style.button_style}`;
export const FreePlanMessage = () => {
  return (
    <div className={style.auth_sec_wrap}>
      <div className="container">
        <div className={style.auth_inner_data}>
          <CustomMessage />
          <Link href="/auth/login" scroll={false} className={combinedClassName}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
