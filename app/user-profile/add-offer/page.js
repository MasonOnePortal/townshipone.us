import React from "react";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import AddOffers from "@/components/user-profile/add-service/add-offer/AddOffers";
export const metadata = {
  title: {
    absolute: "Special Offers on TownshipOne Products - Exclusive Deals",
  },
  description:
    "Discover exclusive offers on TownshipOne products. Save big with our special deals and discounts. Limited-time promotions on high-quality items. Shop now!",
};
export default function AddOffer() {
  return (
    <Suspense fallback={<Loading />}>
      <AddOffers />
    </Suspense>
  );
}
