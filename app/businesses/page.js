import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import Banner from "@/components/banner/Banner";
import second from "@/public/imgs/business-banner.png";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import SearchInPage from "@/components/search-in-page/SearchInPage";
import AllBusinessListing from "@/components/all-business-listing/AllBusinessListing";

export const metadata = {
  title:
    "Township OH Business Directory | Complete Business Listings & Local Services",
  description:
    "Comprehensive Township OH business directory featuring local businesses in Township, Deerfield Township, Township, West Chester Township, and surrounding areas. Register your business for increased visibility.",
  keywords: [
    "Township OH Business Directory",
    "Township ohio local business",
    "Township OH Business Listings",
    "Township OH Businesses",
    "Businesses in Township OH",
    "Local Businesses Township OH",
    "Township OH local businesses",
    "Business Listings Township OH",
    "Township OH company listings",
    "Business Directory Township OH",
    " Township Ohio business listings",
    "Township Ohio business registration",
    "Deerfield Township businesses",
    "Township OH business directory",
    "West Chester Township business listings",
    "Symmes Township businesses",
    "Landen OH business directory",
    "Township OH businesses",
  ],
  alternates: {
    canonical: "https://townshipone.us/businesses/",
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
    url: "https://townshipone.us/businesses/",
    title:
      "Township OH Business Directory | Complete Business Listings & Local Services",
    description:
      "Comprehensive Township OH business directory featuring local businesses in Township and surrounding areas. Register your business for increased visibility.",
    siteName: "TownshipOne Business Directory",
    images: [
      {
        url: "/imgs/business-banner.png",
        width: 1200,
        height: 630,
        alt: "Township OH Business Directory - Local Business Listings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Township OH Business Directory | Complete Business Listings",
    description:
      "Comprehensive Township OH business directory featuring local businesses in Township and surrounding areas.",
    images: ["/imgs/business-banner.png"],
  },
  other: {
    "geo.region": "US-OH",
    "geo.placename": "Deerfield Township & Symmes Township, OHio",
    "geo.position": "39.5151;-84.3983", // Updated position for Township
    ICBM: "39.5151, -84.3983",
  },
};

const BusinessList = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* Schema.org structured data for Local Business Directory */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Township OH Business Directory",
            description:
              "Complete directory of local businesses in Township OH, Deerfield Township, Township, West Chester Township, and surrounding areas",
            url: "https://townshipone.us/businesses/",
            numberOfItems: "500+",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
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
            },
          }),
        }}
      />
      <Banner
        img={second}
        bannerHeading="Deerfield Township & Symmes Township, OH Business Directory"
        bannerContent="Discover Business Sectors"
      />

      <Breadcrumb pagename="All Business Categories" />
      <div className="container">
        <div className="row wrap__hed_da">
          <div className="col align-self-end _busi_cat">
            <div className="styl_css">
              <SearchInPage pagename="" />
            </div>
          </div>
        </div>
        {/* <div>
          <h1 className="fs-4 mb-3">Deerfield Township & Symmes Township, OH Business Directory</h1>
          <h1 className="fs-6">
            Business Listings in Township OH and Surrounding Areas
          </h1>

          <div className="contentCss">
            <p>
              Explore a wide range of business listings in{" "}
              <strong>
                Township, Deerfield Township, Township, West Chester Township,
                Symmes Township, Landen, and Township.
              </strong>
              Our community features a diverse array of businesses across
              various categories, offering convenient access to local services,
              shops, and more.
            </p>
            <p>
              Discover what each town has to offer with our comprehensive
              listings designed to connect you with the best of the 
              Township area.
            </p>
          </div>
        </div> */}
        <div className="container">
          <h1 className="fs-5">Deerfield & Symmes Township OH Business Directory: A Premier Commercial Hub</h1>
          {/* <h6>Business Listings in Deerfield Township & Symmes Township, OH and Surrounding Areas</h6> */}
          <p>
            Experience the pinnacle of commerce and convenience with the official Deerfield & Symmes Township OH business directory. From upscale retailers at the Streets of West Chester and corporate headquarters to expert professional services, our listings connect you to a world-class economic center right here in Deerfield & Symmes TownshipOHio.
          </p>
          <p>
            Browse our complete directory to explore the diverse array of national brands and exceptional local Deerfield & Symmes Township OH businesses. Find everything you need to work, shop, and thrive within our prosperous community.
          </p>
        </div>
        <div>
          <AllBusinessListing />
        </div>
      </div>
    </Suspense>
  );
};

export default BusinessList;
