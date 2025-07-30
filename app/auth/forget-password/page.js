import ForgetPasswordForm from "@/components/forms/ForgetPasswordForm";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
export const metadata = {
  title: {
    absolute: "Password Recovery - TownshipOne: Securely Regain Account",
  },
  description:
    "Effortlessly reset your forgotten password on TownshipOne. Follow simple steps for a secure password recovery experience and regain access to your account.",
};
function ForgetPassword() {
  return (
    <Suspense fallback={<Loading />}>
      <ForgetPasswordForm />
    </Suspense>
  );
}

export default ForgetPassword;
