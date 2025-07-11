import React from "react";
import { LogIn } from "lucide-react";
import Image from "next/image";
import { FaEnvelopeOpenText, FaPhoneAlt } from "react-icons/fa";

const Header = () => {
  const navItems = [
    { name: "Home", url: "https://masonone.us" },
    { name: "Businesses", url: "https://masonone.us/businesses" },
    {
      name: "Deals/Promotions",
      url: "https://masonone.us/Deals-Discounts-and-Promotions-Mason-City-OH",
    },
    { name: "Jobs", url: "https://masonone.us/Job-Listings-Mason-City-OH" },
    {
      name: "Real Estate",
      url: "https://masonone.us/Real-Estate-and-Business-Listings-Mason-City-OH",
    },
    { name: "Community", url: "https://masonone.us/community-corners" },
    { name: "Blogs", url: "https://masonone.us/blog" },
    { name: "Plan", url: "https://masonone.us/price-plan" },
    { name: "Contact Us", url: "https://masonone.us/contact-us" },
    { name: "About Us", url: "https://masonone.us/about-us" },
  ];

  return (
    <header className="w-full">
      {/* Top contact bar */}
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo section */}
          <div className="flex items-center space-x-2">
            <div className="px-20">
              <a href="https://masonone.us">
                <Image src={"/logo.png"} alt="Logo" height={120} width={180} />
              </a>
            </div>
          </div>

          {/* Contact info */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-gray-700">
              <FaPhoneAlt size={28} className="text-[#5f7693]" />
              <div>
                <span className="text-md font-medium">Call Us</span>
                <div className="text-md font-bold">
                  <a href="tel:5134452514">(513) 445-2514</a>
                </div>
              </div>
            </div>

            {/* Vertical line separator */}
            <div className="h-8 w-px bg-gray-300"></div>

            <div className="flex items-center space-x-2 text-gray-700">
              <FaEnvelopeOpenText size={28} className="text-[#5f7693]" />
              <div>
                <span className="text-md font-medium">Email Us</span>
                <div className="text-md font-bold">
                  <a href="mailto:contact@masonone.us">contact@masonone.us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-[#5f7693] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Navigation links */}
            <div className="flex space-x-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  className="semibold py-4 text-white hover:text-[#eb3951] transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Login/Register */}
            <div className="flex items-center space-x-2 py-4">
              <LogIn size={16} />
              <span className="text-white font-semibold cursor-pointer hover:text-[#eb3951]">
                Login
              </span>
              <span className="text-white">/</span>
              <span className="text-white font-semibold cursor-pointer hover:text-[#eb3951]">
                Register
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
