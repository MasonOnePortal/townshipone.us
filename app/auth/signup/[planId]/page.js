import SignupForm from "@/components/forms/SignupForm";
import style from "@/components/forms/auth.module.css";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
// import { ErrorMessage } from "@/components/ErrorMessage";
// import { isEmpty } from "lodash";
export const metadata = {
  title: {
    absolute: "Join TownshipOne Today ||  TownshipOne US",
  },
  description:
    "Your path to success starts here. Sign up now for exclusive offers and updates.",
};
function SignUp() {
  return (
    <Suspense fallback={<Loading />}>
      <SignupForm />
    </Suspense>
  );
}

export default SignUp;
