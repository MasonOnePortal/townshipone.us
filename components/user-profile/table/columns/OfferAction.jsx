"use client";

import Link from "next/link";
import { useRemoveOfferMutation } from "@/store/offers/offerService";
const OfferAction = ({ name, category, id }) => {
  const [removeOffer] = useRemoveOfferMutation();

  const deleteItem = async () => {
    await removeOffer(id);
  };

  return (
    <>
      <div className="action_drp_dwn">
        <div className="dropdown">
          <button
            className="btn  dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Action
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link
                className="dropdown-item pointer"
                href={{
                  pathname: "/user-profile/add-offer",
                  query: { id: id },
                }}
                prefetch={false}
              >
                Edit
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item pointer"
                href={`/Deals-Discounts-and-Promotions-Mason-City-OH/${id}`}
                prefetch={false}
              >
                View
              </Link>
            </li>
            <li>
              <a className="dropdown-item pointer" onClick={deleteItem}>
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export { OfferAction };
