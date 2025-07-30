"use client";
import { Loading } from "@/components/Loading";
import ProfileBanner from "@/components/user-profile/profile-banner/ProfileBanner";
import { ProfileSidebar } from "@/components/user-profile/profile-sidbar/ProfileSidebar";
import { useGetOnePlanQuery } from "@/store/Plan/PlanService";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { useCurrentUserQuery } from "@/store/auth/authService";

export default function UserLayout({ children }) {
  const { data: userData, isLoading: load, isError } = useCurrentUserQuery();
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetOnePlanQuery(currentUser.plan);
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop()
    ? pathname.split("/").pop()
    : "";
  return (
    <section>
      <ProfileBanner />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-12">
            <div>
              <ProfileSidebar activeTab={currentPage} />
            </div>
          </div>
          <Suspense fallback={<Loading />}>
            <div className="col-lg-9 col-12">
              <div>{children}</div>
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
