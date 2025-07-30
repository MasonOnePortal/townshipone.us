import { Loading } from "@/components/Loading";
import FaqPage from "@/components/faq-information/FaqPage";
import Head from "next/head";
import React, { Suspense } from "react";
export const metadata = {
  title: "Join Us Today: Sign Up for Exclusive Benefits | TownshipOne US",
  description:
    "Discover exclusive benefits and stay connected with local businesses in Township City. Join now to sign up",
};
function page() {
  return (
    <Suspense fallback={<Loading />}>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <FaqPage />
    </Suspense>
  );
}

export default page;
