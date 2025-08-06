import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Banner from "@/components/banner/Banner";
import { ServiceWrapper } from "@/components/professional-services/ServiceWrapper";
import second from "@/public/img/new.webp";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import Content from "@/components/card/Content";
import Link from "next/link";
export const metadata = {
  title: {
    absolute:
      "Grow Your Business with Deerfield Township & Symmes Township, OH Us IT solutions in Deerfield Township & Symmes Township, OH city",
  },
  description:
    "Best Professional Services with a comprehensive range of cutting-edge IT solutions tailored to meet your business needs in Deerfield Township & Symmes Township, OH City, Iowa, US explore now",
};
export default async function ProfessionalServices() {
  return (
    <Suspense fallback={<Loading />}>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <Banner
        img={second}
        bannerHeading="Ecommerce integration, Digital Marketing and  AI Chatbot Companies Deerfield Township & Symmes Township, OH City OH"
        bannerContent="Comprehensive IT solutions tailored to your business needs."
      />
      <Breadcrumb pagename="Technology Solutions" />
      <div className="container">
        <h1 className="fs-5">Technical Services Deerfield Township & Symmes Township, OH OH</h1>
        <Content contentData="Welcome to our IT Services page, where we offer a comprehensive range of solutions to cater to your diverse technological needs. Our dedicated team of IT professionals is committed to delivering exceptional services that propel your business forward. Explore our key services below" />
        <ul className="fx-6 contentCss">
          <li>
            Including our specialized, expedited and prime technical services.
          </li>
          <li>Digital Marketing Deerfield Township & Symmes Township, OH OH</li>
          <li>AI Chatbot Deerfield Township & Symmes Township, OH OH</li>
          <li>Ecommerce Integration Deerfield Township & Symmes Township, OH OH</li>
        </ul>
        <div className="web_link_wr">
          <h4>
            Please
            <Link href="contact-us" target="_blank" rel="">
              <b className="ps-1 pe-1">Contact Us </b>
            </Link>
            for any questions or inquiries.
          </h4>
        </div>
      </div>

      <div className="container">
        <ServiceWrapper />
      </div>
    </Suspense>
  );
}
