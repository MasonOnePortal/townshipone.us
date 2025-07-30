"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { subscriptionApi } from "@/store/subscription/subscriptionService";
import { isEmpty } from "lodash";
import {useDispatch} from 'react-redux';
const CheckoutForm = ({ confirmPaymentHandler, paymentIntent }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    let successUrl = `${process.env.NEXT_PUBLIC_URL}/payment-success`;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: successUrl,
      },
    });

    if (result.error) {
      const promise = dispatch(subscriptionApi.endpoints.getOnePayment.initiate(paymentIntent))
      const {data:failedData, error:errData} =   await promise
      if(!isEmpty(failedData)){
        router.push("/payment-failed");
      }
    } else {
        setLoading(false);
        confirmPaymentHandler();
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        className="btn btn-primary pay_btn"
        disabled={!stripe}
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" role="status">
              <span className="visually-hidden"> Loading... </span>
            </Spinner>
            processing
          </>
        ) : (
          <div>Submit</div>
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
