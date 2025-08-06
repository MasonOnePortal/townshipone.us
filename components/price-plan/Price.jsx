"use client";
import React, { useMemo } from "react";
import style from "./price.module.css";
import { useRouter } from "next/navigation";
import { useGetPlansQuery } from "@/store/Plan/PlanService";
import { Loading } from "@/components/Loading";
import { useSelector } from "react-redux";
import { conforms, isArray, isEmpty } from "lodash";
import { usePaymentInitiateMutation } from "@/store/subscription/subscriptionService";
import { useDispatch } from "react-redux";
import { PlanCard } from "./PlanCard";
import Payment from "../payment/Payment";
import { useCurrentUserQuery } from "@/store/auth/authService";
import Content from "../card/Content";
import toast, { Toaster } from "react-hot-toast";
import { planApi } from "@/store/Plan/PlanService";
function Price() {
  const { data: userData, isLoading: load, isError } = useCurrentUserQuery();

  const { data: plansInfo, isLoading } = useGetPlansQuery();
  const { currentPlan } = useSelector((state) => state.plan);
  const { currentUser } = useSelector((state) => state.auth);
  const [paymentInitiate, { data, isSuccess }] = usePaymentInitiateMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const buyPlanHandler = async (id, price) => {
    if (!id) return;

    if (!isEmpty(currentUser) && currentUser.id !== "") {
      const metaData = {
        planId: id,
        userId: currentUser.id,
      };
      try {
        if (parseInt(price, 10)) {
          const { data: resData, error: errData } = await paymentInitiate(
            metaData
          );
          if (errData) {
            throw new Error(errData.data.message);
          }
        } else {
          const { data: response, error: errData } = await paymentInitiate(
            metaData
          );
          if (errData) {
            throw new Error(errData.data.message);
          }
          if (response.ok && !isEmpty(response.data)) {
            const promise = dispatch(
              planApi.endpoints.getOnePlan.initiate(response.data.newPlanId)
            );
            const { data: failedData, error: errData } = await promise;
            if (!isEmpty(failedData)) {
              toast.success("plan updated success fully");
              router.push("/user-profile");
            }
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      router.push(`/auth/signup/${id}`);
    }
  };
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="container my-4">
        <div className={style.price_plan_wrapper}>
          <h1 className={style.price_main_hdng}>Plans & Subscriptions</h1>
          <div className="container">
            <Content contentData="Unlock  business opportunities with our diverse plans and subscription offerings. Showcase your sales, deals, and promotions effortlessly to reach more customers and drive growth to enhence profitability" />
          </div>
          <div className="row">
            {plansInfo?.map((plan, index) => (
              <div key={plan.id} className="col-md-4 mb-3">
                <PlanCard
                  buyPlanHandler={buyPlanHandler}
                  index={index}
                  plan={plan}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isSuccess &&
      data !== undefined &&
      !isEmpty(data) &&
      !isEmpty(data?.paymentIntent?.client_secret) ? (
        <Payment
          amount={data.paymentIntent.amount}
          intentId={data.paymentIntent.id}
          openModal={true}
          buyPlanHandler={buyPlanHandler}
          clientSecretKey={data.paymentIntent.client_secret}
        />
      ) : null}
      <Toaster position="bottom-right" />
    </>
  );
}

export default Price;
