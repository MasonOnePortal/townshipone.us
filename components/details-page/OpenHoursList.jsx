import style from "./details.module.css";

import { isEmpty } from "lodash";
import { formatTimeString } from "@/utils/helperFn";

function OpenHoursList({ dataInfo }) {
  if (isEmpty(dataInfo)) return null;
  const { _id, ...filteredData } = dataInfo;
  return (
    <>
      <div>
        <div className={style.info_itm_wrp}>
          <div className="card">
            <div className={`card-header ${style.card_header}`}>
              <h3>Open Hours</h3>
            </div>
            <div>
              <div className={`card-body ${style.open_hours}`}>
                {Object.keys(filteredData).length ? (
                  <table className="table table-striped ">
                    <tbody>
                      {Object.keys(filteredData).map((day) => (
                        <tr key={day}>
                          <td>{day}</td>

                          <td>
                            {filteredData[day].from && filteredData[day].to ? (
                              <>
                                {formatTimeString(filteredData[day].from)} -
                                {formatTimeString(filteredData[day].to)}
                              </>
                            ) : (
                              <>Closed</>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Not available yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpenHoursList;
