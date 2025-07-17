import type { Metadata } from "next";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainCategory from "./components/MainCategory";
import BannerSlider from "./components/BannerSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner from "./components/Banner";
export const metadata: Metadata = {
  title:
    "Deerfield & Symmes Township OH Portal - Local Business Directory & Services | MasonOne.US",
  description:
    "Discover Deerfield Township OH and Symmes Township OH's premier portal featuring local business directory, exclusive deals, real estate listings, job opportunities, and community services near Mason, OH.",
  keywords: [
    "Township ohio",
    "Township city OH",
    "Township OH city Portal",
    "Township OH Business Directory",
    "Township ohio local business",
    "Township Business Listings",
    "Deals and Promotion in Township OH",
    "real estate listings Township Ohio",
    "Job listings Township OH",
    "City Council Township OH",
    "Township OH News",
    "Schools in Township OH",
    "Deerfield Township OH",
    "Symmes Township OH",
    "Mason OH Townships",
  ],
  openGraph: {
    title:
      "Deerfield & Symmes Township OH Portal - Your Local Community Resource | MasonOne.US",
    description:
      "Connect with Deerfield Township OH and Symmes Township OH communities through our comprehensive portal featuring local businesses, real estate, jobs, and township services.",
    type: "website",
    locale: "en_US",
    url: "https://masonone.us/townships",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deerfield & Symmes Township OH Portal | MasonOne.US",
    description:
      "Your gateway to Deerfield and Symmes Township Ohio's local businesses, real estate, jobs, and community services.",
  },
  alternates: {
    canonical: "https://masonone.us/townships",
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
};

export default function TownshipsPage() {
  const contentData1 = (
    <div>
      The Township Portal website is your go-to resource for exploring
      everything our townships have to offer, from local businesses with
      exclusive deals to a vibrant real estate market and comprehensive job
      listings. It's designed to connect residents and visitors alike to the
      Deerfield Township OH and Symmes Township OH communities, ensuring access
      to the latest promotions, discounts, and opportunities in the Mason area
      townships.
    </div>
  );

  return (
    <>
      <Header />
      {/* <BannerSlider /> */}
      <Banner />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-4">
          <h1 className="text-[24px] font-bold text-gray-900 mb-2">
            Deerfield Township OH,
          </h1>
          <h2 className="text-xxl font-semibold text-gray-700 mb-4">
            {" "}
            Explore Local Listings & Services{" "}
          </h2>
          <h2 className="text-xxl font-semibold text-gray-700 mb-4">
            Your Premier Township OH Portal & Business Directory near Mason, OH
          </h2>
        </header>

        <section className="mb-4">
          <p className="text-lg text-gray-600 mb-2">
            Welcome to the Township Portal near Mason, OH, your comprehensive
            resource for exploring everything Deerfield Township OH and Symmes
            Township OH has to offer.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Discover local deals, business listings, real estate, and job
            opportunities—all in one place. Stay updated on township news,
            government updates, and community offers.
          </p>
        </section>

        <Content contentData={contentData1} />

        <section className="my-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose Our Township OH Business Directory?
          </h3>
          <ul className="space-y-2 text-lg">
            <li>
              <strong>Deals & Promotions:</strong> Discover the best local deals
              and discounts from Deerfield and Symmes Township businesses.
            </li>
            <li>
              <strong>Business Listings:</strong> Explore a directory of trusted
              local businesses.
            </li>
            <li>
              <strong>Real Estate Listings:</strong> Search for homes in both
              townships.
            </li>
            <li>
              <strong>Job Listings:</strong> Find employment opportunities
              across the townships.
            </li>
            <li>
              <strong>Government Updates:</strong> Stay informed on township
              news, trustee meetings, and developments.
            </li>
            <li>
              <strong>School Information:</strong> Learn about educational
              options in both townships.
            </li>
          </ul>
        </section>

        <section className="my-6 bg-gray-50 py-6 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Your Complete Township Ohio Community Resource
          </h3>
          <p className="text-lg text-gray-600">
            Connect with the Deerfield and Symmes Township communities with
            ease. Whether you're a local, newcomer, or visitor, find everything
            you need in our comprehensive Township portal.
          </p>
        </section>
      </main>

      <MainCategory />
      <Footer />
    </>
  );
}
