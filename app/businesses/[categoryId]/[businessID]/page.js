import Script from "next/script";
import DetailsPage from "@/components/business-listing/DetailsPage";
import { Loading } from "@/components/Loading";
import Head from "next/head";
import { Suspense } from "react";
import { capitalize } from "lodash";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
let jsonLd = {};
export async function generateMetadata({ params, searchParams }, parent) {
  // console.log("parent", parent);
  const id = params.businessID;
  const { data: business } = await fetch(`${apiUrl}/businesses/${id}`).then(
    (res) => res.json()
  );
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: capitalize(business.name),
    description: "Content ",
    openGraph: {
      images: [business.thumbnail, ...previousImages],
    },
  };
}
async function getBusiness(id) {
  const { data: business } = await fetch(`${apiUrl}/businesses/${id}`).then(
    (res) => res.json()
  );
  return business;
}

const BusinessDetail = async ({ params: { businessID } }) => {
  const business = await getBusiness(businessID);
  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "LocalBusiness",
    name: capitalize(business.name),
    description: business?.description ?? `Description of ${business.name}`,
    url: `${process.env.NEXT_PUBLIC_URL}/businesses/${business.category}/${business.id}`,
    image: business?.thumbnail ?? "",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.zipCode,
      addressCountry: business.country ?? "USA",
    },
    // Add additional business details as needed
  };
  return (
    <Suspense fallback={<Loading />}>
      <Script
        id={businessID}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Head>
        {/* <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} /> */}
      </Head>
      <DetailsPage />;
    </Suspense>
  );
};

export default BusinessDetail;
