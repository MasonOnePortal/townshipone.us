import React from "react";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import MyProfile from "@/components/user-profile/profile-sidbar/MyProfile";
export const metadata = {
  title: {
    absolute: "Update Profile | TownshipOne US",
  },
  description:
    "Update your profile on TownshipOne US. Customize your details for a personalized experience. Connect with others and explore opportunities.",
};
export default function UserInfo() {
  return (
    <Suspense fallback={<Loading />}>
      <MyProfile />
    </Suspense>
  );
}
