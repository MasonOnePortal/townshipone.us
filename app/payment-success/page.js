import { PaymentSuccess } from "@/components/forms/PaymentSuccess";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
export const metadata = {
  title: {
    absolute:
      "Payment Success | Township US - Seamless Transactions and Secure Payments",
  },
  description:
    "Experience hassle-free payments with Township in the US. Your transaction is secure, and payment success ensures a smooth shopping experience. Trust in our seamless payment process.",
};
const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <PaymentSuccess />;
    </Suspense>
  );
};

export default PaymentSuccessPage;
