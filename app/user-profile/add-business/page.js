import React from "react";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import AddBusiness from "@/components/user-profile/add-service/add-business/AddBusiness";
export const metadata = {
  title: {
    absolute:
      "Expert Township Services | Township US | Quality Stone and Brickwork",
  },
  description:
    "Elevate your property with Township your trusted choice for premium Township services in the United States. Transform spaces with our skilled craftsmen, delivering excellence in stone and brickwork. Explore tailored solutions for lasting beauty.",
};

export default function AddBusinessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AddBusiness />
    </Suspense>
  );
}
