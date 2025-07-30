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
        { name: "Township Deals", url: "/deals-sale" },
        { name: "FAQ Page", url: "/faq-page" },
        { name: "Contact Us", url: "/contact-us" },
        { name: "Blog", url: "/blog" },
      ],
    },
    {
      category: "Township BUSINESS",
      links: [
        { name: "Township Online Sale and Promotions", url: "/deals-sale" },
        { name: "Township Online Clearance", url: "/deals-sale" },
        { name: "Savings on Online Purchases", url: "/deals-sale" },
        { name: "Township Online Business Promotion", url: "/deals-sale" },
        {
          name: "Support and Promote Township Businesses",
          url: "/businesses",
        },
      ],
    },
    {
      category: "Township LISTINGS",
      links: [
        { name: "Register Your Township Business", url: "/contact-us" },
        { name: "Township Business Listings", url: "/businesses" },
        { name: "Township Property Rentals", url: "/real-estate" },
        {
          name: "Buying and Selling Township Properties",
          url: "/real-estate",
        },
        { name: "Township Jobs and Openings", url: "/jobs" },
        { name: "City of Township Details", url: "/informations" },
      ],
    },
    {
      category: "Township COMMUNITY",
      links: [
        { name: "Lost and Found in Township", url: "/community-corners" },
        { name: "Community Q&A Platform", url: "/community-corners" },
        { name: "Township News", url: "/news" },
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
