"use client";
import React, { useState } from "react";
import { LogIn, Menu, X, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css"; // Import the CSS module

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      {/* Top contact bar */}
      <div className={styles.topBar}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Logo section */}
            <div className="flex items-center">
              <div className={styles.logoSection}>
                <Link
                  href="https://masonone.us"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/logo.png" alt="Logo" height={120} width={180} />
                </Link>
              </div>
            </div>

            {/* Contact info - Hidden on mobile, visible on tablet+ */}
            <div
              className={`${styles.contactInfoDesktop} space-x-6 lg:space-x-8`}
            >
              <div className="flex items-center space-x-2 text-gray-700">
                <Phone size={24} className="text-[#5f7693]" />
                <div className="text-center lg:text-left">
                  <span
                    className="text-sm lg:text-md font-medium block"
                    style={{ fontFamily: "system-ui" }}
                  >
                    Call Us
                  </span>
                  <div
                    className="text-sm lg:text-md font-bold"
                    style={{ fontFamily: "system-ui" }}
                  >
                    <Link
                      href="tel:5134452514"
                      className="hover:text-[#5f7693] transition-colors"
                      style={{ fontFamily: "system-ui" }}
                    >
                      (513) 445-2514
                    </Link>
                  </div>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-300 hidden lg:block"></div>

              <div className="flex items-center space-x-2 text-gray-700">
                <Mail size={24} className="text-[#5f7693]" />
                <div className="text-center lg:text-left">
                  <span className="text-sm lg:text-md font-medium block">
                    Email Us
                  </span>
                  <div className="text-sm lg:text-md font-bold">
                    <Link
                      href="mailto:contact@masonone.us"
                      className="hover:text-[#5f7693] transition-colors"
                    >
                      contact@masonone.us
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile contact info */}
            <div className={styles.contactInfoMobile}>
              <Link
                href="tel:5134452514"
                className="flex items-center space-x-2 text-[#5f7693] font-semibold"
              >
                <Phone size={16} />
                <span>(513) 445-2514</span>
              </Link>
              <Link
                href="mailto:contact@masonone.us"
                className="flex items-center space-x-2 text-[#5f7693] font-semibold"
              >
                <Mail size={16} />
                <span>Email</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className={styles.navbar}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Desktop Navigation links */}
            <div className="hidden xl:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLink}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Large screen navigation (lg to xl) */}
            <div className="hidden lg:flex xl:hidden flex-wrap justify-center space-x-1 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLink}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile/Tablet hamburger menu */}
            <div className="lg:hidden flex items-center justify-between w-full">
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-[#eb3951] transition-colors duration-200 p-2"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <span className="text-lg font-bold">Menu</span>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <div
            className={`${styles.mobileMenu} ${
              isMobileMenuOpen ? styles.mobileMenuOpen : ""
            }`}
          >
            <div className="border-t border-[#4a5f75] mt-2 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white hover:text-[#eb3951] hover:bg-[#4a5f75] transition-all duration-200 rounded-md font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
