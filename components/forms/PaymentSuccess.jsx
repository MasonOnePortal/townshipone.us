"use client";
import { SuccessMessage } from "./SuccessMessage";
import { useSearchParams } from "next/navigation";
import { useGetOnePaymentQuery } from "@/store/subscription/subscriptionService";

export const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_intent");
  const { data, isLoading, isSuccess } = useGetOnePaymentQuery(paymentId, {
    skip: paymentId ? false : true,
  });
  if (!paymentId) return null;
  return (
    <>
      <div>
        <SuccessMessage
          heading="Payment Done !"
          message="Your Plan activated successfully !"
        />
      </div>
    </>
  );
};
