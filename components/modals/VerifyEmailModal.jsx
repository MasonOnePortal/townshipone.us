"use client";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import style from "@/components/forms/auth.module.css";
import { MdMail } from "react-icons/md";
import {
  authApi,
  useResendEmailVerificationQuery,
} from "@/store/auth/authService";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { isEmpty } from "lodash";

export const VerifyEmailModal = ({ show, userEmail }) => {
  const [modalVisible, setModalVisible] = useState(show);
  const [loading, setLoading] = useState(true);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [timer, setTimer] = useState(30);
  const { data, error, refetch, isFetching } = useResendEmailVerificationQuery(
    "",
    {
      skip: loading,
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    let timerId;

    if (isTimerVisible) {
      if (timer > 0) {
        timerId = setTimeout(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      }

      if (timer === 0) {
        setTimer(30);
        setIsTimerVisible(false);
      }
    }

    return () => clearTimeout(timerId);
  }, [timer, isTimerVisible]);

  const sendEmail = async () => {
    try {
      setLoading(true);
      const promise = dispatch(
        authApi.endpoints.resendEmailVerification.initiate()
      );
      const { data: failedData, error: errData } = await promise;

      if (errData) {
        throw new Error(errData.data.message);
      }

      if (!isEmpty(failedData)) {
        toast.success("Verification link sent");
        setIsTimerVisible(true);
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const resendEmailHandler = async () => {
    setTimer(30);
    sendEmail();
  };

  return (
    <>
      <Modal show={modalVisible}>
        <Modal.Body>
          <div className={style.icon_style}>
            <MdMail className={style.icon_styles} />
          </div>
          <div className={`"mb-3" ${style.icon_style}`}>
            <h4>Verify Your Email Address</h4>
          </div>
          <div className={`mb-3 ${style.icon_styless}`}>
            <p className="mb-3 text_me_mo">
              We have sent an email to <b>{userEmail}</b> to verify your email
              address and activate your account. The Link in email will expire
              in 24 hours
            </p>
          </div>
          <div className="text-center mb-3">
            <button
              type="button"
              className="btn primary_btn"
              onClick={() => setModalVisible(false)}
            >
              Got It
            </button>
          </div>
          <div className="text-center">
            <p className="text_me_mo">
              Make sure to check email to your spam folder.
              <br />
              Click the button below to Resend Email
              <br />
              {!isFetching && !isTimerVisible ? (
                <span onClick={resendEmailHandler} className="click_resend">
                  Resend Email
                </span>
              ) : (
                isTimerVisible && <span> Time remaining: {timer} seconds.</span>
              )}
            </p>
          </div>
        </Modal.Body>
      </Modal>
      <Toaster />
    </>
  );
};
