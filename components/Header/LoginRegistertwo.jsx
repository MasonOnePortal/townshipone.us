import style from "./header.module.css";
import Link from "next/link";
import { FaRightToBracket } from "react-icons/fa6";

function LoginRegistertwo() {
  return (
    <>
      <div className={`login_Styl ${style.wrap_login_reg}`}>
        <div className={style.login_btn}>
          <Link href={"/auth/login"}>
            <FaRightToBracket /> Login
          </Link>
        </div>
        <div className={style.register_btn}>
          <Link href={"/price-plan"}>Register</Link>
        </div>
      </div>
    </>
  );
}

export { LoginRegistertwo };
