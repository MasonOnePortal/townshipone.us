'use client';
import style from "./auth.module.css";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { useCurrentUserQuery } from "@/store/auth/authService";

export const SuccessMessage = ({ heading, message }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { data, refetch, isLoading } = useCurrentUserQuery();
  const router = useRouter();
  const combinedClassName = `btn btn-secondary ${style.button_style} {style.auth_btn}`;
  const redirectTo = () => {
    if (!isEmpty(currentUser) && currentUser.id) {
      refetch();
      router.push("/user-profile");
    } else {
      router.push("/auth/login");
    }
  };
  return (
    <div className={style.auth_sec_wrap}>
      <div className="container">
        <div className={style.auth_inner_data}>
          <h2 className="text-center pb-3">{heading}</h2>
          <h5 className="pb-3 text-center">{message}</h5>
          <button
            onClick={redirectTo}
            type="button"
            className={combinedClassName}
          >
            {!isEmpty(currentUser) && currentUser.id
              ? `Back to Profile`
              : `Back to Login`}
          </button>
        </div>
      </div>
    </div>
  );
};

export const LinkSendMessage = () => {
  const writeMessage =
    "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.";
  return <SuccessMessage heading="Password Link Sent" message={writeMessage} />;
};
export const PasswordUpdatedMessage = () => {
  return (
    <SuccessMessage
      heading="Password Updated"
      message="Your Password is updated successfully !"
    />
  );
};
