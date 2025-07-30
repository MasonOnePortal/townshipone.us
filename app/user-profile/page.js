import { Dashboard } from "@/components/user-profile/dashboard/Dashboard";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";

const UserDashboard = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
};

export default UserDashboard;
