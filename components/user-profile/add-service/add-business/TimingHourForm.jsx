"use client";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
function TimingHourForm({}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState(true);
  return (
    <div className="row">
      <div className="col-6">
        <div className="mb-3">
          <label className="form-label">From</label>
          <div>
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
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
      <div className="col-6">
        <div className="mb-3">
          <label className="form-label">To</label>
          <div>
            <ReactDatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
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
  );
}

export default TimingHourForm;
