// "use client";
// import style from "./footer.module.css";
// import Link from "next/link";
// // import Logo from "../Header/Logo";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaYoutube,
// } from "react-icons/fa6";
// import {
//   useGetAllFooterQuery,
//   useGetAllPostFooterQuery,
// } from "@/store/footer/footerServices";
// import { Loading } from "../Loading";
// import { FaTwitter } from "react-icons/fa";
// import { Logo } from "../Header/Header";

// function Footer() {
//   const { data: pageContent, isError, isLoading } = useGetAllFooterQuery();
//   const { data: footerFooterlLinks } = useGetAllPostFooterQuery();

//   if (isLoading) return <Loading />;
//   if (isError) {
//     return null;
//   }

//   const encounteredCategories = new Set();

//   return (
//     <div className={style.footer_section}>
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-3">
//             <div className={` footer_logo_wrap ${style.footer_logo_area}`}>
//               {/* <Logo logo={pageContent?.logo} /> */}
//               <Logo />
//               <div className={style.footer_intro}>
//                 <p>{pageContent?.companyIntro}</p>
//               </div>

//               <div className="d-flex">
//                 <div>
//                   {pageContent?.facebook && (
//                     <Link
//                       href={`${pageContent?.facebook}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <FaFacebookF />
//                     </Link>
//                   )}
//                 </div>
//                 <div>
//                   {pageContent?.instagram && (
//                     <Link
//                       href={`${pageContent?.instagram}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <FaInstagram />
//                     </Link>
//                   )}
//                 </div>
//                 {/* <div>
//                   {pageContent?.linkedIn && (
//                     <Link
//                       href={pageContent?.linkedIn}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <FaLinkedinIn />
//                     </Link>
//                   )}
//                 </div> */}
//                 <div>
//                   {pageContent?.youtube && (
//                     <Link
//                       href={pageContent?.youtube}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <FaYoutube />
//                     </Link>
//                   )}
//                 </div>
//                 <div>
//                   {pageContent?.twitter && (
//                     <Link
//                       href={pageContent?.twitter}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <FaTwitter />
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-9">
//             <div className="row">
//               <div className="row">
//                 {footerFooterlLinks &&
//                   footerFooterlLinks.map((category, index) => {
//                     const newCategory = !encounteredCategories.has(
//                       category.pageCategory
//                     );

//                     if (newCategory) {
//                       encounteredCategories.add(category.pageCategory);
//                     }

//                     return newCategory ? (
//                       <div className="col-lg-3 col-6" key={index}>
//                         <div className={style.footer_menu_item}>
//                           <h4>{category.pageCategory}</h4>
//                           <ul className={style.menu_list}>
//                             {footerFooterlLinks
//                               .filter(
//                                 (item) =>
//                                   item.pageCategory === category.pageCategory
//                               )
//                               .map((item) => (
//                                 <li key={item._id}>
//                                   <Link href={`${item.pageLink}`}>
//                                     {item.pageName}
//                                   </Link>
//                                 </li>
//                               ))}
//                           </ul>
//                         </div>
//                       </div>
//                     ) : null;
//                   })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={style.copyright_area}>
//         <p>Copyright © 2024 Design. All rights reserved.</p>
//       </div>
//     </div>
//   );
// }

// export default Footer;

"use client";
import style from "./footer.module.css";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { Logo } from "../Header/Header";

function Footer() {
  // Static company intro text
  const companyIntro =
    "Welcome to the City Portal website, your ultimate hub for everything related to our dynamic and exhilarating city!!";

  // Static social media links
  const socialLinks = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    twitter: "https://twitter.com",
  };

  // Static footer menu data
  const footerMenuData = [
    {
      category: "IMPORTANT PAGES",
      links: [
        { name: "Latest News: Local to Global", url: "/news" },
        { name: "Deerfield Township & Symmes Township, OH", url: "/deals-sale" },
        { name: "FAQ Page", url: "/faq-page" },
        { name: "Contact Us", url: "/contact-us" },
        { name: "Blog", url: "/blog" },
      ],
    },
    {
      category: "Deerfield Township & Symmes Township, OH BUSINESS",
      links: [
        { name: "Deerfield Township & Symmes Township, OH Online Sale and Promotions", url: "/deals-sale" },
        { name: "Deerfield Township & Symmes Township, OH Online Clearance", url: "/deals-sale" },
        { name: "Savings on Online Purchases", url: "/deals-sale" },
        { name: "Deerfield Township & Symmes Township, OH Online Business Promotion", url: "/deals-sale" },
        {
          name: "Support and Promote Deerfield Township & Symmes Township, OH Businesses",
          url: "/businesses",
        },
      ],
    },
    {
      category: "Deerfield Township & Symmes Township, OH LISTINGS",
      links: [
        { name: "Register Your Deerfield Township & Symmes Township, OH Business", url: "/contact-us" },
        { name: "Deerfield Township & Symmes Township, OH Business Listings", url: "/businesses" },
        { name: "Deerfield Township & Symmes Township, OH Property Rentals", url: "/real-estate" },
        {
          name: "Buying and Selling Deerfield Township & Symmes Township, OH Properties",
          url: "/real-estate",
        },
        { name: "Deerfield Township & Symmes Township, OH Jobs and Openings", url: "/jobs" },
        { name: "City of Deerfield Township & Symmes Township, OH Details", url: "/informations" },
      ],
    },
    {
      category: "Deerfield Township & Symmes Township, OH COMMUNITY",
      links: [
        { name: "Lost and Found in Deerfield Township & Symmes Township, OH", url: "/community-corners" },
        { name: "Community Q&A Platform", url: "/community-corners" },
        { name: "Deerfield Township & Symmes Township, OH News", url: "/news" },
        { name: "Community Blogs", url: "/blog" },
        {
          name: "Ecommerce Support and Services",
          url: "/professional-services",
        },
      ],
    },
  ];

  return (
    <div className={style.footer_section}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className={` footer_logo_wrap ${style.footer_logo_area}`}>
              <Logo />
              <div className={style.footer_intro}>
                <p>{companyIntro}</p>
              </div>

              <div className="d-flex">
                <div>
                  <Link
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF />
                  </Link>
                </div>
                <div>
                  <Link
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </Link>
                </div>
                <div>
                  <Link
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube />
                  </Link>
                </div>
                <div>
                  <Link
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div className="row">
                {footerMenuData.map((category, index) => (
                  <div className="col-lg-3 col-6" key={index}>
                    <div className={style.footer_menu_item}>
                      <h4>{category.category}</h4>
                      <ul className={style.menu_list}>
                        {category.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <Link href={link.url}>{link.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.copyright_area}>
        <p>Copyright © 2024 Design. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
