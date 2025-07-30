"use client";
import { useRemoveJobMutation } from "@/store/job/JobService";
import { useRouter } from "next/navigation";
import Link from "next/link";
const JobActionCell = ({ id }) => {
  const router = useRouter();
  const [removeJob] = useRemoveJobMutation();

  const deleteItem = async () => {
    await removeJob(id);
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
                  pathname: "/user-profile/add-job",
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
                href={`/Job-Listings-Mason-City-OH/${id}`}
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

export { JobActionCell };
