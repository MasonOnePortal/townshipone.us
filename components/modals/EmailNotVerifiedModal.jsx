"use client";
import React, { useEffect, useState } from "react";
import style from "@/components/forms/auth.module.css";

import { Button, Modal, Spinner } from "react-bootstrap";
import { MdOutlineMailLock } from "react-icons/md";
import { authApi } from "@/store/auth/authService";
import { useDispatch } from "react-redux";
export const EmailNotVerifiedModal = ({ show, email }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(show);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [timer, setTimer] = useState(30);
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
    setLoading(true);
    try {
      const promise = dispatch(
        authApi.endpoints.resendEmailVerification.initiate()
      );
      const { data: failedData, error: errData } = await promise;
      if (errData) {
        throw new Error(errData.data.message);
      }
      if (!isEmpty(failedData)) {
        setModalVisible(false);
      }
      promise.unsubscribe();
    } catch (error) {
      console.log("err", error.message);
    } finally {
    }
  };
  const handleResendVerification = async () => {
    setTimer(30);
    setIsTimerVisible(true);
    sendEmail();
  };
  return (
    <>
      <Modal show={modalVisible}>
        <Modal.Body>
          <div className={style.icon_style}>
            <MdOutlineMailLock className={style.icon_styles} />
          </div>
          <div className={style.icon_style}>
            <h4>Your Email Address is not verified yet</h4>
          </div>
          <div className={style.icon_styless}>
            <p className="text_me_mo ">
              Please verify your email address<b className="ms-1">{email}</b>{" "}
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
              {!isTimerVisible ? (
                <span
                  onClick={handleResendVerification}
                  className="click_resend"
                >
                  Resend Email
                </span>
              ) : (
                isTimerVisible && <span> Time remaining: {timer} seconds.</span>
              )}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
