"use client";
import style from "@/components/forms/auth.module.css";

import Link from "next/link";
import { Loading } from "@/components/Loading";
import { useVerifyEmailMutation } from "@/store/auth/authService";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import { PaymentWrapper } from "../payment/PaymentWrapper";
import { CustomMessage } from "./CustomMessage";
const combinedClassName = `btn btn-secondary ${style.button_style}`;
const EmailVerificationSuccess = () => {
  const searchPrams = useSearchParams();
  const token = searchPrams.get("token");
  const [verifyEmail, { data: resData, error, isError, isSuccess, isLoading }] =
    useVerifyEmailMutation();
  useEffect(() => {
    if (token) {
      (async () => {
        await verifyEmail({ token: token });
      })();
    }
  }, [token]);
  if (isLoading) return <Loading />;
  return (
    <>
      {isSuccess ? (
        <>
          <PaymentWrapper userId={resData.userId} planId={resData.buyPlan} />
        </>
      ) : null}
      {isError ? (
        <div className={style.auth_sec_wrap}>
          <div className="container">
            <div className={style.auth_inner_data}>
              <h2 className="text-center pb-3">Failed</h2>
              <h5 className="pb-3 text-center">{error.data.message}</h5>
              <Link
                href="/auth/login"
                scroll={false}
                className={combinedClassName}
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EmailVerificationSuccess;
