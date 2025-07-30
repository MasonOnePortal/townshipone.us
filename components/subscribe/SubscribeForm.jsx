"use client";
import { useState } from "react";
import style from "./subscribe.module.css";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddNewsLetterSubscriberMutation } from "@/store/common api/commonService";
import toast, { Toaster } from "react-hot-toast";

const inquiryForm = {
  email: "",
};
const schema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
});

export const SubscribeForm = ({ onValidated }) => {
  const [loading, setLoading] = useState(false);
  const [addNewsLetterSubscriber] = useAddNewsLetterSubscriberMutation();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: inquiryForm,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      onValidated({
        EMAIL: data.email,
      });

      reset({ email: "" });

      toast.success("Subscribed !");
    } catch (error) {
      toast.error(error.email);
      console.error(" error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={style.subscribe_right}>
        <form>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Email"
              name="email"
              {...register("email")}
            />
            <span className="input-group-btn">
              <button
                onClick={handleSubmit(onSubmit)}
                type="button"
                className="btn btn-secondary"
                disabled={loading}
              >
                Go!
              </button>
            </span>
          </div>
        </form>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};
