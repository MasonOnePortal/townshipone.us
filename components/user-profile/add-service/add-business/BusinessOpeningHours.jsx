import ReactDatePicker from "react-datepicker";
import BaseTab from "@/components/tabs/BaseTab";
import style from "@/components/user-profile/profile.module.css";
import { useCallback, useMemo, useState } from "react";
import { formatTime } from "@/utils/helperFn";
import { setHours, setMinutes } from "date-fns";
function TimingHourForm({ initialValues, day, onTimeChange }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const initialDate = setMinutes(setHours(new Date(), 10), 20);
  const handleTimeChange = (type, date) => {
    if (type === "startDate") {
      setStartDate(date);
      const formattedOpenTime = formatTime(date);
      const formattedCloseTime = formatTime(endDate);
      onTimeChange(day, formattedOpenTime, formattedCloseTime);
    } else if (type === "endDate") {
      setEndDate(date);
      const formattedOpenTime = formatTime(startDate);
      const formattedCloseTime = formatTime(date);
      onTimeChange(day, formattedOpenTime, formattedCloseTime);
    }
  };
  return (
    <div className="row">
      <div className="col-6">
        <div className="mb-3">
          <div className={style.wrap_tmng}>
            <label className="form-label">From</label>
            <div>
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => handleTimeChange("startDate", date)}
                showTimeSelect
                showTimeSelectOnly
                className="form-control"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className={style.wrap_tmng}>
          <div className="mb-3">
            <label className="form-label">To</label>
            <div>
              <ReactDatePicker
                selected={endDate}
                onChange={(date) => handleTimeChange("endDate", date)}
                showTimeSelect
                className="form-control"
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessOpeningHours({ timeTable, updateTimeTable }) {
  const [openingHours, setOpeningHours] = useState(timeTable);
  const handleTimeChange = useCallback(
    (day, from, to) => {
      setOpeningHours((prevOpeningHours) => ({
        ...prevOpeningHours,
        [day]: { from, to },
      }));

      if (day === "AllDays") {
        const weekdays = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        weekdays.forEach((weekday) => {
          if (weekday !== "AllDays") {
            setOpeningHours((prevOpeningHours) => ({
              ...prevOpeningHours,
              [weekday]: { from, to },
            }));
          }
        });
      }
      updateTimeTable(openingHours);
    },
    [openingHours, updateTimeTable]
  );
  const tabs = [
    {
      title: "All Days",
      content: (
        <TimingHourForm
          day="AllDays"
          onTimeChange={handleTimeChange}
          initialValues={openingHours.AllDays}
        />
      ),
    },
    {
      title: "Monday",
      content: (
        <TimingHourForm
          day="Monday"
          onTimeChange={handleTimeChange}
          initialValues={openingHours.Monday}
        />
      ),
    },
    {
      title: "Tuesday",
      content: (
        <TimingHourForm
          day="Tuesday"
          onTimeChange={handleTimeChange}
          initialValues={openingHours.Tuesday}
        />
      ),
    },
    {
      title: "Wednesday",
      content: (
        <TimingHourForm
          day="Wednesday"
          onTimeChange={handleTimeChange}
          initialValues={openingHours.Wednesday}
        />
      ),
    },
    {
      title: "Thursday",
      content: (
        <TimingHourForm
          day="Thursday"
          onTimeChange={handleTimeChange}
          initialValues={openingHours.Thursday}
        />
      ),
    },
    {
      title: "Friday",
      content: (
        <TimingHourForm
          day="Friday"
          onTimeChange={handleTimeChange}
          initialValues={openingHours.Friday}
        />
      ),
    },
    {
      title: "Saturday",
      content: (
        <TimingHourForm
          day="Saturday"
          onTimeChange={handleTimeChange}
          initialValues={openingHours.Saturday}
        />
      ),
    },
    {
      title: "Sunday",
      content: (
        <TimingHourForm
          day="Sunday"
          onTimeChange={handleTimeChange}
          initialValues={openingHours.Sunday}
        />
      ),
    },
  ];

  return <BaseTab tabs={tabs} />;
}

export default BusinessOpeningHours;
