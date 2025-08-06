import style from "./about.module.css";
import aboutustwo from "@/public/imgs/abt_2.png";
import aboutus from "@/public/img/abt_2.webp";
import Image from "next/image";
import { FaBorderAll, FaMapLocationDot, FaSistrix } from "react-icons/fa6";
import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import second from "@/public/imgs/about_us.png";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import Head from "next/head";

export const metadata = {
  title:
    "About TownshipOne | Empowering Deerfield Township & Symmes Township, OH Communities & Businesses",
  description:
    "Discover TownshipOne's mission to connect and empower the Deerfield Township & Symmes Township, OH community through comprehensive local resources and services.",
  alternates: {
    canonical: `https://townshipone.us/about-us`,
  },
};

function AboutUs() {
  return (
    <Suspense fallback={<Loading />}>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Banner
        img={second}
        bannerHeading="About Us"
        bannerContent="Empowering Communities, Connecting Lives: Discover Your Local Hub with Us!"
      />
      <Breadcrumb pagename="About Deerfield Township & Symmes Township, OH" />
      <div>
        <div className="container">
          <div className={style.wrap_al_data}>
            <div className="row">
              <div className="col-md-6">
                <div className={style.abt_lft_img}>
                  <Image
                    src={aboutus}
                    alt="Township Town Portal - Best Solution"
                    width={0}
                    height={420}
                    sizes="100vw"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={style.abt_rgt_txt}>
                  <h5>About Deerfield Township & Symmes Township, OH</h5>
                  <h2>Community under one Platform</h2>
                  <p>
                    Welcome to our website, where community connection and local
                    empowerment are at the heart of everything we do. We pride
                    ourselves on being a comprehensive platform offering a
                    myriad of resources tailored to enrich the lives of our
                    users.
                  </p>
                  <p>
                    From business listings to government directories and city
                    guides, we aim to be your go-to destination for all things
                    local. Whether you're searching for real estate
                    opportunities or browsing job postings, we've got you
                    covered. Additionally, we're passionate about supporting
                    local businesses and providing them with a platform to
                    showcase their offerings.
                  </p>
                  <p>
                    Through our channels, businesses can highlight their deals
                    and promotions, fostering growth and engagement within our
                    community. Furthermore, we strive to enhance community
                    engagement through features such as lost and found services,
                    Q&A forums, and city announcements, catering to the diverse
                    needs of our residents.
                  </p>
                  <>
                    Join us as we embark on a journey to empower our community
                    and foster connections that enrich lives
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default AboutUs;
