import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Banner from "@/components/banner/Banner";
import second from "@/public/img/new.webp";
import { notFound } from "next/navigation";

import ContactUs from "@/components/contact/ContactUs";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";

export const metadata = {
  title: "Contact Township | Connect with Our Team in Township, OH",
  description:
    "Get in touch with Township for inquiries, support, or feedback. We're here to assist you with all your needs in Township, OH.",
  alternates: {
    canonical: `https://townshipone.us/contact-us`,
  },
};

export default async function ContactPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      {/* <Banner img={second} bannerHeading="Contact Us" /> */}
      <Banner img={second} bannerHeading="Contact Township – We're Here to Help" />
      <Breadcrumb pagename="Contact Us" />
      <ContactUs />
    </Suspense>
  );
}
