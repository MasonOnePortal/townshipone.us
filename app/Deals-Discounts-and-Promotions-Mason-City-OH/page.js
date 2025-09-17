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
    title: "Township Ohio Deals & Discounts | Best Local Promotions & Coupons",
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
    "geo.placename": "Deerfield Township & Symmes Township, OHio",
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
          Exciting Deals, Discounts, and Promotions Township OH | Township, Ohio
          US
        </title>
        <meta
          name="description"
          content="Explore exclusive deals and discounts from Deerfield Township & Symmes Township, OH businesses. Find promotions on dining, shopping, services, and more at Deerfield Township & Symmes Township, OH."
        />
      </Head>
      <div>
        <Banner
          img={second}
          bannerHeading="Deerfield Township & Symmes Township, OH City Savings"
          bannerContent="Save Big with Deerfield Township & Symmes Township, OH's Local Deals and Offers"
        />
        <Breadcrumb pagename="Deerfield Township & Symmes Township, OH City Savings" />
        <div className="container">
          <h1 className="fs-4 mb-3">
            Deerfield Township OH & Symmes Township OH Deals & Promotions
          </h1>

          <p className="contentCss">
            Discover upscale savings with exclusive offers from premier
            <strong> Deerfield Township OH & Symmes Township OH</strong>{" "}
            establishments. Our curated list of discounts and promotions helps
            you enjoy the finer things in life while supporting the
            sophisticated retailers and service providers in our community.
          </p>

          <p className="contentCss">
            Find limited-time promotions and valuable local discounts across a
            variety of premium goods and services. This is your essential guide
            to experiencing the best of
            <strong> Deerfield Township OH & Symmes Township OH</strong>, all
            while enjoying exceptional value.
          </p>

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
              <div className="col-lg-3 col-md-4 col-12 mb-3">
                <SearchOffersInputs />
              </div>
              <div className="col-lg-9 col-md-8 col-12">
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
