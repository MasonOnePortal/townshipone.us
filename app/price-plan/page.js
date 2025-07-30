import { Loading } from "@/components/Loading";
import Price from "@/components/price-plan/Price";
import { Suspense } from "react";

export const metadata = {
  title: {
    absolute: "Maximize Your Sales and Growth with Township Promotions |US",
  },
  description:
    "Effortlessly showcase your sales, deals, and promotions to expand your customer reach and drive business growth. Enhance profitability with  promotion |Township",
  robots: "noindex, nofollow",
  alternates: {
    canonical: `https://townshipone.us/price-plan`,
  },
};
const PricePlan = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Price />
    </Suspense>
  );
};

export default PricePlan;
