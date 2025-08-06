"use client";
import BusinessListing from "@/components/business-listing/BusinessListing";
import BannerSlider from "@/components/slider/BannerSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RealEstateSlider from "@/components/RealEstate/RealEstateSlider";
import JobsGrid from "@/components/job/JobsGrid";
import Search from "@/components/MainSearch/Search";
import MainCategory from "@/components/MainCategory/MainCategory";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import OffersSlider from "@/components/dealsSaleClearanceItems/OffersSlider";
import Content from "@/components/card/Content";
import { InformationPromotedWrapper } from "@/components/Information-listing/InformationPromotedWrapper";

export default function HomeClient() {
  const contentData1 = (
    <div>
      The Deerfield Township & Symmes Township, OH Portal website is your go-to
      resource for exploring everything our city has to offer, from local
      businesses with exclusive deals to a vibrant real estate market and
      comprehensive job listings. It's designed to connect residents and
      visitors alike to the community, ensuring access to the latest promotions,
      discounts, and opportunities in Deerfield Township & Symmes Township, OH.
    </div>
  );

  return (
    <Suspense fallback={<Loading />}>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Township OH Business Directory",
            description:
              "Complete business directory for Township OH, Deerfield Township, Township, West Chester Township, and surrounding areas",
            url: "https://townshipone.us",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://townshipone.us/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
            areaServed: [
              {
                "@type": "City",
                name: "Township",
                addressRegion: "OH",
                addressCountry: "US",
              },
              {
                "@type": "City",
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
            ],
          }),
        }}
      />

      <BannerSlider />
      <Search />

      {/* <div className="container">
        <h1 className="fs-5">Explore Local Listings & Services in Deerfield Township & Symmes Township, OH</h1>

        <h4 className="fs-6">
          Township OH, Deerfield Township OH, Township OH, West Chester Township OH,
          Symmes Township OH, Landen OH, and Township OH.
        </h4>

        <p className="contentCss">
          Welcome to the  Township OH Area Portal, your comprehensive
          resource for exploring everything our vibrant region has to offer.{" "}
        </p>
        <p className="contentCss">
          Discover local deals, business and real estate listings, and job
          opportunities—all in one place. Stay updated on the latest promotions
          and community offers.
        </p>
        <Content contentData={contentData1} />
        <ul className="fx-6 contentCss">
          <li>
            <b>Uncover Exclusive Deals</b>: Discover the best deals and
            discounts from local businesses across the region.
          </li>
          <li>
            <b>Connect with Local Businesses</b>: Explore a diverse selection of
            businesses offering unique products and services near you.
          </li>
          <li>
            <b>Explore a Thriving Real Estate Market</b>: Search for your ideal
            home across Township and surrounding areas.
          </li>
          <li>
            <b>Find Your Perfect Job</b>: Browse a broad range of job
            opportunities suited to your skills across multiple towns.
          </li>
        </ul>
        <p className="contentCss">
          With our portal, connecting with the  Township community has never
          been easier. Whether you're a local resident, newcomer, or visitor,
          find everything you need to stay connected, informed, and engaged with
          the region's dynamic offerings.
        </p>
      </div> */}

      <div className="container">
        <h1 className="fs-5">
          Explore Local Listings & Services in Deerfield Township & Symmes Township, OH
        </h1>

        <p className="contentCss">
          Welcome to the Deerfield Township & Symmes Township, OH Area Portal,
          your comprehensive resource for exploring everything our vibrant
          region has to offer.
        </p>

        <p className="contentCss">
          Discover local deals, business and real estate listings, and job
          opportunities—all in one place. Stay updated on the latest promotions
          and community offers.
        </p>

        <p className="contentCss">
          The Deerfield Township & Symmes Township, OH City Portal website is
          your go-to resource for exploring everything our city has to offer,
          from local businesses with exclusive deals to a vibrant real estate
          market and comprehensive job listings. It's designed to connect
          residents and visitors alike to the community, ensuring access to the
          latest promotions, discounts, and opportunities in Deerfield Township
          & Symmes Township, OH City.
        </p>

        <ul className="fx-6 contentCss">
          <li>
            <b>Uncover Exclusive Deals</b>: Discover the best deals and
            discounts from local businesses across the region.
          </li>
          <li>
            <b>Connect with Local Businesses</b>: Explore a diverse selection of
            businesses offering unique products and services near you.
          </li>
          <li>
            <b>Explore a Thriving Real Estate Market</b>: Search for your ideal
            home across Deerfield Township & Symmes Township, OH and surrounding
            areas.
          </li>
          <li>
            <b>Find Your Perfect Job</b>: Browse a broad range of job
            opportunities suited to your skills across multiple towns.
          </li>
        </ul>

        <p className="contentCss">
          With our portal, connecting with the Deerfield Township & Symmes
          Township, OH community has never been easier. Whether you're a local
          resident, newcomer, or visitor, find everything you need to stay
          connected, informed, and engaged with the region's dynamic offerings.
        </p>
      </div>

      <MainCategory />
      <BusinessListing />
      <OffersSlider />
      <RealEstateSlider />
      <JobsGrid />
      <InformationPromotedWrapper />
    </Suspense>
  );
}
