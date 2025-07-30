"use client";
import { isEmpty } from "lodash";

import { useRouter } from "next/navigation";

export const ModuleResult = ({ moduleName, moduleList }) => {
  const router = useRouter();
  const getPageUrl = (pageName) => {
    return {
      business: "businesses",
      offers: "Deals-Discounts-and-Promotions-Mason-City-OH",
      information: "informations",
      realEstate: "Real-Estate-and-Business-Listings-Mason-City-OH",
      jobs: "jobs",
    }[pageName];
  };
  const navigateHandler = (id, moduleName, category) => {
    if (!isEmpty(category)) {
      const currentUrl = `/${getPageUrl(moduleName)}/${category.id}/${id}`;

      router.push(currentUrl);
    } else {
      const currentUrl = `/${getPageUrl(moduleName)}/${id}`;

      router.push(currentUrl);
    }
  };
  return (
    <div>
      {moduleList.length ? (
        <div className="search_result_module">{moduleName}</div>
      ) : null}
      <ul>
        {moduleList?.map((item) => (
          <li
            key={item.id}
            onClick={() => navigateHandler(item.id, moduleName, item?.category)}
            className="s_r_list"
          >
            <a className="">
              <div className="s_r_container">
                <div className="s_r_content_wrapper">
                  {item?.name ? (
                    <span className="s_r_title">{item?.name}</span>
                  ) : null}
                  {item?.title ? (
                    <span className="s_r_title">{item?.title}</span>
                  ) : null}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
