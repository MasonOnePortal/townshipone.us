import Script from "next/script";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Banner from "@/components/banner/Banner";
import DealsSaleClearance from "@/components/dealsSaleClearanceItems/DealsSaleClearance";
import "../../components/dealsSaleClearanceItems/styles.css";
import second from "@/public/imgs/banner_2.svg";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { OfferPageContent } from "@/components/dealsSaleClearanceItems/OfferPageContent";
import Link from "next/link";
import SearchOffersInputs from "@/components/filter-sidebar/SearchOffersInputs";
import Head from "next/head";

export const metadata = {
  title: "Township Ohio Deals & Discounts | Best Local Promotions & Coupons",
  description:
    "Discover the best deals Township OH has to offer! Find exclusive local discounts, promotions, coupons, and shopping offers from businesses in Township Ohio and surrounding areas.",
  keywords: [
    "Township Ohio deals",
    "Best Deals Township OH",
    "Township OH local discounts",
    "Township City promotions",
    "Township Ohio coupons",
    "Local sales Township Ohio",
    "Discounts Township OH",
    "Promotions Township OH",
    "Township OH shopping offers",
    "Discounts and Promotions Township OH",
    "Township Ohio clearance sales",
    "Deerfield Township deals",
    "Township OH promotions",
    "West Chester Township discounts",
    "Symmes Township offers",
    "Landen OH deals",
    "Township OH promotions",
  ],
  alternates: {
    canonical: "https://townshipone.us/deals/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://townshipone.us/deals/",
    title:
      "Township Ohio Deals & Discounts | Best Local Promotions & Coupons",
    description:
      "Discover the best deals Township OH has to offer! Find exclusive local discounts, promotions, and shopping offers from businesses in Township Ohio.",
    siteName: "TownshipOne Deals",
    images: [
      {
        url: "/imgs/banner_2.svg",
        width: 1200,
        height: 630,
        alt: "Township Ohio Deals and Promotions - Local Discounts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Township Ohio Deals & Discounts | Best Local Promotions",
    description:
      "Discover the best deals Township OH has to offer! Find exclusive local discounts and promotions.",
    images: ["/imgs/banner_2.svg"],
  },
  other: {
    "geo.region": "US-OH",
    "geo.placename": "Township, Ohio",
    "geo.position": "39.5151;-84.3983",
    ICBM: "39.5151, -84.3983",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Township Ohio Deals and Promotions",
  description:
    "Exclusive deals, discounts, and promotions from local businesses in Township OH and surrounding areas",
  url: "https://townshipone.us/deals/",
  numberOfItems: "100+",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  areaServed: [
    {
      "@type": "City",
      name: "Township",
      addressRegion: "OH",
      addressCountry: "US",
    },
    {
      "@type": "AdministrativeArea",
      name: "Deerfield Township",
      addressRegion: "OH",
      addressCountry: "US",
    },
    {
      "@type": "City",
      name: "Township",
      addressRegion: "OH",
      addressCountry: "US",
    },
    {
      "@type": "AdministrativeArea",
      name: "West Chester Township",
      addressRegion: "OH",
      addressCountry: "US",
    },
  ],
  provider: {
    "@type": "Organization",
    name: "TownshipOne",
    url: "https://townshipone.us",
    description:
      "Local business directory and deals platform for Township Ohio area",
  },
};

const DealSale = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Script
        id="deals-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Head>
        <title>
          Exciting Deals, Discounts, and Promotions Township OH | Township,
          Ohio US
        </title>
        <meta
          name="description"
          content="Explore exclusive deals and discounts from Township, OH businesses. Find promotions on dining, shopping, services, and more at TownshipOne."
        />
      </Head>
      <div>
        <Banner
          img={second}
          bannerHeading="Township City Savings"
          bannerContent="Save Big with Township's Local Deals and Offers"
        />
        <Breadcrumb pagename="Township City Savings" />
        <div className="container">
          <h1 className="fs-4 mb-3">
            Township, OH Business Deals & Promotions
          </h1>
          <h6>
            Exclusive Deals, Discounts, Promotions, and Clearance in Township
            OH
          </h6>
          {/* <h3 className="fs-6">
            Take advantage of these limited time offers to save big and find
            incredible deals on a wide range of products and services. Don't
            miss out on the opportunity to get more for your money while
            supporting local businesses in our community.
          </h3> */}
          <OfferPageContent />
          <div className="row">
            <div className="col-md-6 col-12"></div>
            <div className="col-md-6 col-12 mb-4">
              <div className="offer_filter_wrapz">
                <Link href="/" className=" add" variant="primary">
                  Back
                </Link>
              </div>
            </div>
          </div>

          <section className="grid_container">
            <div className="row">
              <div className="col-3">
                <SearchOffersInputs />
              </div>
              <div className="col-9">
                <DealsSaleClearance />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Suspense>
  );
};

export default DealSale;
