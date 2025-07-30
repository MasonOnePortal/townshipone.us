import style from "@/components/forms/auth.module.css";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import Link from "next/link";
export const metadata = {
  title: {
    absolute: "Password Updated Successfully | Secure | TownshipOne US",
  },
  description:
    "Your password has been successfully updated for enhanced security. Enjoy secure access to your TownshipOne account.",
};
function PasswordUpdated() {
  const combinedClassName = `btn btn-secondary ${style.button_style} {style.auth_btn}`;
  return (
    <Suspense fallback={<Loading />}>
      <div className={style.auth_sec_wrap}>
        <div className="container">
          <div className={style.auth_inner_data}>
            <h2 className="text-center pb-3">Password Updated</h2>
            <h5 className="pb-3 text-center">
              Your Password is updated successfully !
            </h5>
            <Link
              href="/auth/login"
              scroll={false}
              className={combinedClassName}
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default PasswordUpdated;
