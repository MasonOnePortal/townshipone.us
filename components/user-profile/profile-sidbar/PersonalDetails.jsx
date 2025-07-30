"use client";
import { useSelector } from "react-redux";
import "./TabComponent.css";
import style from "@/components/user-profile/profile.module.css";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
const PersonalDetails = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const router = useRouter();
  const handleShow = () => {
    router.push(`update-profile`);
  };
  return (
    <div className="table-responsive">
      <table className="tblcss">
        <tbody>
          <tr>
            <th>Name</th>
            <td>
              <span className={style.namespace}>{currentUser.first_name}</span>
              <span>{currentUser.last_name}</span>
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{currentUser.email}</td>
          </tr>
          <tr>
            <th>Contact No.</th>
            <td>{currentUser.phone}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div className={style.table_top_wrap}>
                <Button
                  className={style.rt_r_cl}
                  variant="primary"
                  type="button"
                  onClick={handleShow}
                >
                  Update Your Profile
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PersonalDetails;
