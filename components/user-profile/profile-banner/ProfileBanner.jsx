import style from "@/components/user-profile/profile.module.css";

function ProfileBanner() {
  return (
    <>
      <div
        className={style.user_banner}
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}/img/bannerthird.webp)`,
        }}
      ></div>
    </>
  );
}

export default ProfileBanner;
