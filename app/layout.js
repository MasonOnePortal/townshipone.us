import "./globals.css";
import Head from "next/head";
import { Providers } from "./provider";
import Script from "next/script";
export const metadata = {
  title: {
    absolute: "",
    default:
      "Township, OH Deals, Sales, Jobs, Real Estate Listings | TownshipOne",
    template: "%s",
  },
  alternates: {
    canonical: `https://townshipone.us`,
  },
  verification: {
    google: "ew3hykJZSUbYAz8w2t07b8CPCe_Z1k6NQLRu9XsRYQQ",
  },
  description:
    "Connect with Township, OH's top businesses, jobs, and real estate. Discover local deals or post your listing on TownshipOne!",
  robots: "index, follow",
  author: "TownshipOne US",

  keywords:
    "Township city business, business directories in usa, Township iowa business, categories local listing, Township city iowa real estate, Township city houses for sale, homes for sale Township city iowa, Township Business Listings, Township Property Rentals, Buying Township Properties, Selling Township Properties, Real estate listings in Township City",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="ew3hykJZSUbYAz8w2t07b8CPCe_Z1k6NQLRu9XsRYQQ"
        />
        <link rel="icon" href="./favicon.ico" sizes="any" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-STNV2NTW2L"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-STNV2NTW2L');
        `}
      </Script>
      <body>
        <Providers>
          <main className="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
