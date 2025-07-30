import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import style from "@/components/forms/auth.module.css";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
export const metadata = {
  title: {
    absolute: "Reset Password -  TownshipOne US",
  },
  description:
    "Reset your password to regain access to your account. Secure and easy password recovery process.",
};
function ResetPassword() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}

export default ResetPassword;
