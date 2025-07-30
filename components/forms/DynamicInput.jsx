"use client";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import style from "../../components/user-profile/profile.module.css";

const DynamicInput = ({ arrData, updateData, hasError }) => {
  const handleInputChange = (index, event) => {
    const values = [...arrData];
    values[index].value = event.target.value;
    updateData(values);
  };

  const handleBlur = (index, event) => {
    const values = [...arrData];
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    values[index].hasError = !urlRegex.test(event.target.value);
    updateData(values);
  };

  const handleAddFields = () => {
    updateData([...arrData, { value: "", hasError: false }]);
  };

  const handleRemoveFields = (index) => {
    if (arrData.length > 1) {
      const values = [...arrData];
      values.splice(index, 1);
      updateData(values);
    }
  };
  return (
    <div className="upload_video_wrap">
      {arrData.map((field, index) => (
        <div key={index} className={`d-flex align-items-center mb-2  `}>
          <input
            type="url"
            autoComplete="off"
            placeholder="Enter URL"
            value={field.value}
            className={`form-control ${
              field.hasError ? style.errorBorder : ""
            }`}
            onChange={(event) => handleInputChange(index, event)}
            onBlur={(event) => handleBlur(index, event)}
          />
          <button
            className="btn"
            type="button"
            onClick={() => handleRemoveFields(index)}
          >
            <FaMinus />
          </button>
        </div>
      ))}
      <button className="btn" type="button" onClick={handleAddFields}>
        <FaPlus />
        Add
      </button>
    </div>
  );
};

export default DynamicInput;
