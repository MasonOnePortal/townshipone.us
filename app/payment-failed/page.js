import { Loading } from "@/components/Loading";
import { PaymentFailed } from "@/components/forms/PaymentFailed";
import { Suspense } from "react";
export const metadata = {
  title: {
    absolute:
      "Payment Failed | Township US - Secure Transactions for Your Peace of Mind",
  },
  description:
    "Encountered a payment failure? Stay calm. Township US ensures secure transactions. Resolve issues swiftly for a seamless shopping experience.",
};
const PaymentFailedPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <PaymentFailed />
    </Suspense>
  );
};

export default PaymentFailedPage;
