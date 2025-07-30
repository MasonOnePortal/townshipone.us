"use client";
import { useRemoveRealEstateMutation } from "@/store/real-estate/realEstateService";
import Link from "next/link";

const RealEstateAction = ({ id }) => {
  const [removeRealEstate, { isSuccess }] = useRemoveRealEstateMutation();

  const deleteItem = async () => {
    await removeRealEstate(id);
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
                  pathname: "/user-profile/add-real-estate",
                  query: { propertyId: id },
                }}
                prefetch={false}
              >
                Edit
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item pointer"
                href={`/Real-Estate-and-Business-Listings-Mason-City-OH/${id}`}
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

export { RealEstateAction };
