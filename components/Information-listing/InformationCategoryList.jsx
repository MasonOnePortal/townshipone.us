"use client";
import Banner from "@/components/banner/Banner";
import second from "@/public/imgs/business-banner.png";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import SearchInPage from "@/components/search-in-page/SearchInPage";
import category_placeholder from "@/public/imgs/PlaceHolder.jpg";
import style from "@/components/all-business-listing/all_business_listing.module.css";
import { useInformationCategoriesQuery } from "@/store/information-list/informationService";
import { Loading } from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Empty } from "../Empty";
import Content from "../card/Content";
export const InformationCategoryList = () => {
  const searchParams = useSearchParams();
  const searchTerms = searchParams.get("searchName")
    ? searchParams.get("searchName")
    : "";
  const {
    data: informationList,
    isLoading,
    isFetching,
  } = useInformationCategoriesQuery(searchTerms);
  const router = useRouter();
  if (isLoading) return <Loading />;
  const contentDatas = (
    <div>
      Deerfield Township & Symmes Township, OH City government diligently serves our community, providing
      essential services and ensuring our city thrives. We strive to provide
      accurate and up-to-date information, ensuring that you can easily access
      the services, institutions, and landmarks that make our city unique.
    </div>
  );

  return (
    <>
      <div>
        <Banner
          img={second}
          bannerHeading="Deerfield Township & Symmes Township, OH City: Important Links and Details"
        />
        <Breadcrumb pagename="Information Listings" />
        <div className="container">
          <div className="row wrap__hed_da">
            <div className="col-md-6 col-12">
              <div className="section_Heading section_mon">
                <h2>City and Town Information Categories</h2>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="styl_css">
                <SearchInPage pagename="Information Listings" />
              </div>
            </div>
            <div>
              <p className="contentCss">
                The local governments of <strong>Deerfield Township & Symmes Township, OH,</strong>{" "}
                diligently serve their communities, providing essential services
                and fostering growth. We strive to offer accurate, up-to-date
                information so you can easily access the services, institutions,
                and landmarks that make each town unique.
              </p>
              <p className="contentCss">
                Our goal is to offer accurate and up-to-date information, making
                it easy for residents and visitors to access vital services,
                local institutions, and unique landmarks that define our vibrant
                city.
              </p>

              {/* <Content contentData={contentDatas} /> */}
            </div>
          </div>
          <div>
            {!isLoading &&
            Array.isArray(informationList) &&
            informationList.length ? (
              <div className={style.all_business_wrap}>
                {informationList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => router.push(`/informations/${item.id}`)}
                    className={style.all_business_wrap_item}
                  >
                    <Link href="#" className={style.business_link}>
                      <Image
                        className={`${style.business_img}`}
                        src={item.avatar ? item.avatar : category_placeholder}
                        alt="image"
                        width={50}
                        height={40}
                      />
                      <h4 className={style.business_name}>{item.name}</h4>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <Empty />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
