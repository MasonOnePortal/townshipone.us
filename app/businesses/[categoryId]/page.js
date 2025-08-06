import RestaurantListView from "@/components/businesses/RestaurantListView";
// export async function getServerSideProps({params,req,res,query,preview,previewData,resolvedUrl,locale,locales,defaultLocale}) {
import second from "@/public/img/busines_list.webp";
import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import Content from "@/components/card/Content";
import { capitalize } from "lodash";
import Script from "next/script";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.categoryId;
  const { data: business } = await fetch(
    `${apiUrl}/businesses_categories/${id}`
  ).then((res) => res.json());
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: capitalize(business?.name),
    description:
      "Below, our comprehensive business listings will help you find exactly what you need right in your local town.",
    openGraph: {
      images: [business.thumbnail, ...previousImages],
    },
  };
}
async function getBusinessList(id) {
  const { data: business } = await fetch(
    `${apiUrl}/businesses?category=${id}`
  ).then((res) => res.json());
  return business;
}
const BusinessCategoryList = async ({ params: { categoryId } }) => {
  const businessList = await getBusinessList(categoryId);
  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "businessList",
    itemListElement: [],
  };
  const categoryJsonLd = businessList.map((business) => {
    return {
      "@context": "http://schema.org",
      "@type": "LocalBusiness",
      name: capitalize(business?.name),
      description: business?.description ?? `Description of ${business?.name}`,
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
  });
  jsonLd.itemListElement = categoryJsonLd;
  // console.log("sss", jsonLd);
  return (
    <Suspense fallback={<Loading />}>
      <Script
        id={categoryId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <Banner
        img={second}
        bannerHeading="Business Listings"
        bannerContent="Local business guide ensures you can easily find what you're looking for in your area "
      />
      <Breadcrumb pagename="Business Listings" />
      <div className="container">
        <p>
          <p className="contentCss">
            Below, our comprehensive business listings will help you find
            exactly what you need in your local town. These businesses are vital
            contributors to the economy of our region, offering a wide variety
            of products and services to cater to diverse needs.
            <br /> <br />
            <strong>From Deerfield Township & Symmes Township, OH,</strong>, discover unique offerings
            that showcase the essential role these businesses play in enriching
            our vibrant community.
          </p>
        </p>
        {/* <Content contentData="Below, our comprehensive business listings will help you find exactly what you need right in your local town." /> */}
      </div>

      <RestaurantListView />
    </Suspense>
  );
};

export default BusinessCategoryList;
