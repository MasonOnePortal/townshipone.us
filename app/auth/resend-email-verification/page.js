// import ResendEmailVerification from "@/components/messages/ResendEmailVerification";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
const ResendEmailVerificationPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* <ResendEmailVerification />; */}
      <p>Email Verification done</p>
    </Suspense>
  );
};

export default ResendEmailVerificationPage;
