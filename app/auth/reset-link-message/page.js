import style from "@/components/forms/auth.module.css";
import Link from "next/link";
function ResetLinkMessage() {
  const combinedClassName = `btn btn-secondary ${style.button_style} ${style.auth_btn}`;

  return (
    <div className={style.auth_sec_wrap}>
      <div className="container">
        <div className={style.auth_inner_data}>
          <h2 className="text-center pb-3">Password Link Sent</h2>
          <h5 className="pb-3 text-center">
            Check your email for a link to reset your password. If it doesn’t
            appear within a few minutes, check your spam folder.
          </h5>
          <Link href="/auth/login" scroll={false} className={combinedClassName}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetLinkMessage;
