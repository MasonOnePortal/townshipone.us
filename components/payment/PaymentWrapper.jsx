"use client";
import React, { useEffect, useState } from "react";

import Payment from "./Payment";
import { useRouter } from "next/navigation";
import { useGetPlanDetailQuery } from "@/store/Plan/PlanService";
import { usePaymentInitiateMutation } from "@/store/subscription/subscriptionService";
import { isEmpty } from "lodash";
import { FreePlanMessage } from "../messages/FreePlanMessage";
import { Loading } from "../Loading";
import { removeSessionToken } from "@/utils/token";

export const PaymentWrapper = ({ planId, userId }) => {
  const [isRendered, setIsRendered] = useState(false);
  // const router = useRouter();
  const { data: planDetail, isLoading } = useGetPlanDetailQuery(planId);
  const [paymentInitiate, { data, isSuccess }] = usePaymentInitiateMutation();

  useEffect(() => {
    if (!isEmpty(planDetail) && parseInt(planDetail.price, 10)) {
      setIsRendered(true);
      const metaData = {
        planId: planId,
        userId: userId,
      };
      paymentInitiate(metaData);
    }
    // }, 0);
    // removeSessionToken();
    // return () => clearTimeout(timer);
  }, [planDetail]);
  if (isLoading) return <Loading />;
  if (!isEmpty(planDetail) && !parseInt(planDetail.price, 10))
    return <FreePlanMessage />;
  if (
    isRendered &&
    isSuccess &&
    data !== undefined &&
    !isEmpty(data.paymentIntent.client_secret)
  ) {
    return (
      <Payment
        amount={data.paymentIntent.amount}
        intentId={data.paymentIntent.id}
        openModal={true}
        clientSecretKey={data.paymentIntent.client_secret}
      />
    );
  }
  return null;
};
