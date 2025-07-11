import React from "react";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      {/* Main footer content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Logo and description */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Link href="https://masonone.us">
                  <Image
                    src={"/logo.png"}
                    alt="Logo"
                    height={120}
                    width={180}
                  />
                </Link>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Welcome to the Mason City Portal website, your ultimate hub for
                everything related to our dynamic and exhilarating city!
              </p>

              {/* Social media icons */}
              <div className="flex space-x-3 mt-6">
                {/* Facebook */}
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 cursor-pointer">
                  <Link
                    href="https://www.facebook.com/MasonOne.US"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook size={18} className="text-white" />
                  </Link>
                </div>

                {/* Instagram */}
                <div className="w-10 h-10 bg-pink-500 rounded flex items-center justify-center hover:bg-pink-600 cursor-pointer">
                  <Link
                    href="https://www.instagram.com/masononebiz/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={18} className="text-white" />
                  </Link>
                </div>

                {/* YouTube */}
                <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center hover:bg-red-700 cursor-pointer">
                  <Link
                    href="https://www.youtube.com/channel/UCQnylr3-VOkuJpe9GuEBFgg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Youtube size={18} className="text-white" />
                  </Link>
                </div>

                {/* Twitter */}
                <div className="w-10 h-10 bg-blue-400 rounded flex items-center justify-center hover:bg-blue-500 cursor-pointer">
                  <Link
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter size={18} className="text-white" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Important Pages */}
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                IMPORTANT PAGES
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://masonone.us/news"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Latest News: Local to Global
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/deals-sale"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Mason Deals
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/faq"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    FAQ Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/contact-us"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/blog"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mason Business */}
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                MASON BUSINESS
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://masonone.us/deals-sale"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Mason Online Sale and Promotions
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/deals-sale"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Mason Online Clearance
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/deals-sale"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Savings on Online Purchases
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/businesses"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Mason Online Business Promotion
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/businesses"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Support and Promote Mason Businesses
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mason Listings */}
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                MASON LISTINGS
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://masonone.us/contact-us"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Register Your Mason Business
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/businesses"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Mason Business Listings
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/real-estate"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Mason Property Rentals
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/real-estate"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Buying and Selling Mason Properties
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/jobs"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Mason Jobs and Openings
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/information"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    City of Mason Details
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mason Community */}
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                MASON COMMUNITY
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://masonone.us/lost-and-found"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Lost and Found in Mason
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/community-concern"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Community Q&A Platform
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/news"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Mason News
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/community-blog"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Community Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masonone.us/community-concern"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Ecommerce Support and Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="border-t border-gray-300 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-gray-600">
            Copyright © 2024 Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
