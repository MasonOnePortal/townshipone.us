import EmailVerificationSuccess from "@/components/messages/EmailVerificationSuccess";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
export const metadata = {
  title: {
    absolute: "Email Verification: Confirm Your Account with TownshipOne US",
  },
  description:
    "Complete email verification to secure your TownshipOne US account. Confirm your identity and access exclusive features quickly and securely.",
  robots: "noindex, follow",
};
const EmailVerification = () => {
  return (
    <Suspense fallback={<Loading />}>
      <EmailVerificationSuccess />;
    </Suspense>
  );
};

export default EmailVerification;
