import MyProfileView from "@/components/user-profile/profile-sidbar/MyProfileView";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
export const metadata = {
  title: {
    absolute: "Profile | TownshipOne, US",
  },
  description:
    "Dive into the meta world of TownshipOne in the US. Explore the intricacies of this professional profile, a gateway to unlocking unparalleled expertise and excellenc",
};
const ProfileSetting = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MyProfileView />
    </Suspense>
  );
};

export default ProfileSetting;
