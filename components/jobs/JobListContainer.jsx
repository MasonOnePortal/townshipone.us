import JobItems from "@/components/job/JobItems";
import Pagination from "@/components/main-listing/Pagination";
import { isEmpty } from "lodash";

export const JobListContainer = ({ jobs }) => {
  return (
    <>
      <div className="">
        <div>
          {jobs?.map((item) => (
            <div key={item.id} className="">
              <JobItems {...jobs} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div>
          {!isEmpty(jobs) ? (
            <Pagination
              currentPage1={jobs.page}
              totalrecord={jobs.totalDocs}
              recordLimit={jobs.limit}
              totalPages={jobs.totalPages}
              prevPage={jobs.prevPage}
              nextPage={jobs.nextPage}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};
