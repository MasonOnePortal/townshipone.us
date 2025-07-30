"use client";
import { useEffect, useState } from "react";
import style from "./auth.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEnvelope, FaUnlock } from "react-icons/fa6";
import { Spinner } from "react-bootstrap";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { loginForm, loginSchema } from "./auth-validation";
import { useLoginUserMutation } from "@/store/auth/authService";
import { isEmpty, isNull } from "lodash";
import { ErrorMessage } from "../ErrorMessage";
import { EmailNotVerifiedModal } from "../modals/EmailNotVerifiedModal";
import { removeSessionToken } from "@/utils/token";

export const LoginForm = () => {
  const [loginUser, { data: userData, error, isLoading, isSuccess }] =
    useLoginUserMutation();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    removeSessionToken();
  }, []);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: loginForm,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: resData, error: errData } = await loginUser(data);
      if (errData) {
        throw new Error(errData.data.message);
      }
      if (!isEmpty(resData) && resData.ok) {
        reset({});
        if (!isNull(resData.emailVerificationStatus)) {
          router.push("/");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <>
      <div className={style.auth_sec_wrap}>
        <div className="container">
          {!isEmpty(error) && error?.data?.message ? (
            <ErrorMessage message={error.data.message} />
          ) : null}
          <div className={style.auth_inner_data}>
            <h2>Login into account</h2>
            <h5>Use your credentials to access your account.</h5>
            <form className={style.auth_form} onSubmit={handleSubmit(onSubmit)}>
              <div>
                <p>
                  Username or E-mail<span className="required-star">*</span>
                </p>
                <div
                  className={`input-group mb-3 ${
                    errors.email ? style.error : ""
                  } `}
                >
                  <span className={`${style["inpt_icon"]} input-group-text`}>
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    className={`${style["auth_input"]} form-control`}
                    placeholder="Username or E-mail"
                    {...register("email")}
                  />
                </div>
                <div>
                  {errors.email && (
                    <p className={style.textColor}>{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <p>
                  Password<span className="required-star">*</span>
                </p>
                <div
                  className={`input-group mb-3 ${
                    errors.password ? style.error : ""
                  } `}
                >
                  <span className={`${style["inpt_icon"]} input-group-text`}>
                    <FaUnlock />
                  </span>

                  <input
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`${style["auth_input"]} form-control`}
                    placeholder="Password"
                    {...register("password")}
                  />
                  <span className={`${style["inpt_icon"]} input-group-text`}>
                    {showPassword ? (
                      <FaEye onClick={togglePasswordVisibility} />
                    ) : (
                      <FaEyeSlash onClick={togglePasswordVisibility} />
                    )}
                  </span>
                </div>
                <div>
                  {errors.password && (
                    <p className={style.textColor}>{errors.password.message}</p>
                  )}
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between mt-2">
                  <div className={style.login_remember}>
                    <div className="form-check">
                      <input
                        className={`form-check-input  `}
                        type="checkbox"
                        {...register("rememberMe")}
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div className={style.forger_psw}>
                    <Link href="/auth/forget-password" className="alink">
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>

              <div className={style.auth_btn}>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" role="status">
                        <span className="visually-hidden"> Loading... </span>
                      </Spinner>
                      Loading...
                    </>
                  ) : (
                    "Log In"
                  )}
                </button>
              </div>

              <div className={style.register_here}>
                <p>
                  Don't have an account?{" "}
                  <Link href="/price-plan" className="alink">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
      {isSuccess &&
      !isEmpty(userData) &&
      isNull(userData.emailVerificationStatus) ? (
        <EmailNotVerifiedModal show={true} email={userData.email} />
      ) : null}
    </>
  );
};
