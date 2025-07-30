"use client";
import style from "./header.module.css";
import Link from "next/link";
import { FaPlus, FaRightToBracket } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { ProfileDropdown } from "./ProfileDropdown";
import { LoginRegistertwo } from "./LoginRegistertwo";

function LoginRegister() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <div className={style.wrap_login_reg}>
        <div className="d-flex justify-content-end align-items-center">
          {isLoggedIn ? <ProfileDropdown /> : <LoginRegistertwo />}
        </div>
      </div>
    </>
  );
}

export default LoginRegister;
