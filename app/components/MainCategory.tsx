"use client";
import { useState } from "react";
import style from "./MainCategory.module.css";
import MainCatgoryItem from "./MainCatgoryItem";
import BusinessListing from "@/public/img/business-Listings.webp";
import CommunityCorner from "@/public/img/community-Corner.webp";
import DealSaleClearance from "@/public/img/deals-Sale-Clearance.webp";
import InformationListing from "@/public/img/city_listing.svg";
import JobVacancies from "@/public/img/jobs-and-Vacancies.webp";
import LatestNews from "@/public/img/latest-News.webp";
import RealEstate from "@/public/img/real-Estate-Listings.webp";
import ProfessionalServices from "@/public/img/professional-Services.webp";

const CategoryitemArr = [
  {
    id: 1,
    avatar: BusinessListing,
    name: "Top Businesses",
    URL: "/businesses",
    alt: "Business Listings Directory: Explore a Variety of Companies and Services",
  },
  {
    id: 2,
    avatar: DealSaleClearance,
    name: "Exclusive Deals, Sale, Clearance & Promotions",
    URL: "/Deals-Discounts-and-Promotions-Mason-City-OH",
    alt: "Deals, Sales, and Promotions: Discover Exciting Offers and Savings",
  },

  {
    id: 4,
    avatar: RealEstate,
    name: "Popular Real Estate",
    URL: "/Real-Estate-and-Business-Listings-Mason-City-OH",
    alt: "Real Estate Listings: Explore Available Properties for Sale or Rent",
  },
  {
    id: 5,
    avatar: JobVacancies,
    name: "In-Demand Jobs and Vacancies",
    URL: "/Job-Listings-Mason-City-OH",
    alt: "Jobs and Vacancies: Explore Employment Opportunities",
  },
  {
    id: 3,
    avatar: InformationListing,
    name: "City Listings",
    URL: "/informations",
    alt: "Mason City Information Links: Explore Resources and Services",
  },
  {
    id: 6,
    avatar: CommunityCorner,
    name: "Community Corner",
    URL: "/community-corners",
    alt: "Community Services: Platform to help and Support",
  },
  {
    id: 8,
    avatar: LatestNews,
    name: "Latest News",
    URL: "/news",
    alt: "Latest News: Stay Informed with Up-to-Date Headlines and Stories",
  },
  {
    id: 7,
    avatar: ProfessionalServices,
    name: "Technical Services",
    URL: "/Ecommerce-integration-Digital-Marketing-and-AI-Chatbot-Companies-Mason-City-OH",
    alt: "IT Professional Services: Cutting-Edge Solutions and Support for Technology Needs",
  },
];
function MainCategory() {
  const [list, _] = useState(CategoryitemArr);

  return (
    <div className={style.main_category_wrap}>
      <div className="grid grid-cols-12  max-w-7xl mx-auto">
        {list?.map((item) => (
          <div key={item.id} className="col-span-3">
            <MainCatgoryItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainCategory;
