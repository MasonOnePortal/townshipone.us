// "use client";
// import style from "@/components/forms/auth.module.css";
// import Link from "next/link";
// import { Loading } from "@/components/Loading";
// import { useResendEmailVerificationMutation } from "@/store/auth/authService";
// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";
// const combinedClassName = `btn btn-secondary ${style.button_style}`;
// const ResendEmailVerification = () => {
//   const searchPrams = useSearchParams();
//   const token = searchPrams.get("token");
//   const [
//     resendVerifyEmail,
//     { data: resData, error, isError, isSuccess, isLoading },
//   ] = useResendEmailVerificationMutation();
//   useEffect(() => {
//     if (token) {
//       (async () => {
//         await resendVerifyEmail({ token: token });
//       })();
//     }
//   }, [token]);
//   if (isLoading) return <Loading />;
//   return (
//     <>
//       {isSuccess ? (
//         <>
//           <div className={style.auth_sec_wrap}>
//             <div className="container">
//               <div className={style.auth_inner_data}>
//                 <h2 className="text-center pb-3">Success</h2>
//                 <h5 className="pb-3 text-center">
//                   Your email address{" "}
//                   <b className="highlight">{resData.email}</b> has been
//                   successfully verified! Welcome to the community !.
//                 </h5>
//                 <Link
//                   href="/auth/login"
//                   scroll={false}
//                   className={combinedClassName}
//                 >
//                   Back to Login
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : null}
//       {isError ? (
//         <div className={style.auth_sec_wrap}>
//           <div className="container">
//             <div className={style.auth_inner_data}>
//               <h2 className="text-center pb-3">Failed</h2>
//               <h5 className="pb-3 text-center">{error.data.message}</h5>
//               <Link
//                 href="/auth/login"
//                 scroll={false}
//                 className={combinedClassName}
//               >
//                 Back to Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// };

// export default ResendEmailVerification;
