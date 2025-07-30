"use client";

import { useSelector } from "react-redux";
import { useRemoveBusinessMutation } from "@/store/business/businessService";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ActionsCell = ({ name, category, id }) => {
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.auth);
  const [removeBusiness] = useRemoveBusinessMutation();
  const deleteItem = async () => {
    await removeBusiness(id);
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
                  pathname: "/user-profile/add-business",
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
                href={`/businesses/${category}/${id}`}
                prefetch={false}
              >
                View
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item pointer"
                href={{
                  pathname: "/user-profile/user-reviews",
                  query: { businessId: id },
                }}
                prefetch={false}
              >
                Review
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

export { ActionsCell };
