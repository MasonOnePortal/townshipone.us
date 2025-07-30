"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import style from "@/components/community-corner/community_corners.module.css";
import { useRouter } from "next/navigation";
import { subscriptionApi } from "@/store/subscription/subscriptionService";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment({
  amount,
  clientSecretKey,
  intentId,
  openModal,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const options = {
    clientSecret: clientSecretKey,
  };
  const [show, setModalShow] = useState(openModal);
  const confirmPaymentHandler = async () => {
    try {
      const promise = dispatch(
        subscriptionApi.endpoints.getOnePayment.initiate(intentId)
      );
      const { data: failedData, error: errData } = await promise;
      if (errData) {
        throw new Error(errData.data.message);
      }
      if (!isEmpty(failedData)) {
        setModalShow(false);
        router.push("/payment-failed");
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={confirmPaymentHandler}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={style.post_model_wrapper}
      >
        <Modal.Header closeButton className={style.mdl_hdng}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className={`d-flex align-items-center justify-content-between width_94 ${style.mdl_tll_cl}`}
          >
            <h4>Make Your Payment</h4>
            {amount ? (
              <h4>
                Amount: <b>${amount / 100}.00</b>
              </h4>
            ) : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="payment_page">
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                paymentIntent={intentId}
                confirmPaymentHandler={confirmPaymentHandler}
              />
            </Elements>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
