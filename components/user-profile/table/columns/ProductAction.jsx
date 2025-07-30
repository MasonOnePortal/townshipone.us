"use client";

import Link from "next/link";
import { useRemoveProductMutation } from "@/store/products/productService";
const ProductAction = ({ name, category, id }) => {
  const [removeProduct] = useRemoveProductMutation();

  const deleteItem = async () => {
    await removeProduct(id);
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
                  pathname: "/user-profile/add-product",
                  query: { id: id },
                }}
                prefetch={false}
              >
                Edit
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

export { ProductAction };
