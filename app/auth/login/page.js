import { LoginForm } from "@/components/forms/LoginForm";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
export const metadata = {
  title: {
    absolute: "Login In - TownshipOne US ",
  },
  description:
    "Expert tips for busy professionals to prioritize wellness in their schedules. Gain valuable insights to maintain a healthy lifestyle while managing a hectic workload",
  alternates: {
    canonical: `https://townshipone.us/auth/login`,
  },
};
function Login() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginForm />
    </Suspense>
  );
}

export default Login;
