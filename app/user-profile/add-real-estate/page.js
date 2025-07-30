import React from "react";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { RealEstateFormWrapper } from "@/components/user-profile/add-service/real-estate/RealEstateFormWrapper";
export const metadata = {
  title: {
    absolute: "Real Estate in TownshipOne, US - Find Your Dream Home",
  },
  description:
    "Explore the latest real estate listings in TownshipOne, US. Find your dream home with our expert real estate agents. Browse properties for sale and rent.",
};
export default function AddRealEstate() {
  return (
    <Suspense fallback={<Loading />}>
      <RealEstateFormWrapper />
    </Suspense>
  );
}
