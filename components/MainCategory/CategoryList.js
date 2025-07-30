"use client";
import BusinessListing from "@/public/imgs/business-Listings.svg";
import CommunityCorner from "@/public/imgs/community-Corner.svg";
import DealSaleClearance from "@/public/imgs/deals-Sale-Clearance.svg";
import InformationListing from "@/public/imgs/information-Listings.svg";
import JobVacancies from "@/public/imgs/jobs-and-Vacancies.svg";
import LatestNews from "@/public/imgs/latest-News.svg";
import RealEstate from "@/public/imgs/real-Estate-Listings.svg";
import ProfessionalServices from "@/public/imgs/professional-Services.svg";
const CategoryList = [
  {
    id: 1,
    avatar: BusinessListing,
    name: "Business Listings ",
    URL: "/businesses",
  },
  {
    id: 2,
    avatar: DealSaleClearance,
    name: "Deals, Sale, Clearance & Promotions",
    URL: "/deals-sale-clearance",
  },
  {
    id: 3,
    avatar: InformationListing,
    name: "Information Listings ",
    URL: "/information",
  },
  {
    id: 4,
    avatar: RealEstate,
    name: "Real Estate Listings ",
    URL: "/Real-Estate-and-Business-Listings-Mason-City-OH",
  },
  {
    id: 5,
    avatar: JobVacancies,
    name: "Jobs and Vacancies",
    URL: "/Job-Listings-Mason-City-OH",
  },
  {
    id: 6,
    avatar: CommunityCorner,
    name: "Community Corner",
    URL: "/community-corners",
  },
  {
    id: 7,
    avatar: ProfessionalServices,
    name: "Professional Services",
    URL: "/Ecommerce-integration-Digital-Marketing-and-AI-Chatbot-Companies-Mason-City-OH",
  },
  {
    id: 8,
    avatar: LatestNews,
    name: "Latest News",
    URL: "/news",
  },
];

export default CategoryList;
