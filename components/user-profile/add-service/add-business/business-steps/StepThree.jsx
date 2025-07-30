"use client";
import React, { useState } from "react";
import style from "@/components/user-profile/profile.module.css";
import { Controller, useForm } from "react-hook-form";
import { useFormData } from "@/context/FormContext";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { initialTimeTable } from "./businessSchema";
import { isEmpty } from "lodash";
import { WithContext as ReactTags } from "react-tag-input";
import "react-datepicker/dist/react-datepicker.css";
const additionalInfo = {
  amenities: [],
};

export const StepThree = ({ formStep, nextFormStep }) => {
  const { setFormValues, data: infoData } = useFormData();
  const [tags, setTags] = useState([]);
  const [businessEditForm, setBusinessEditForm] = useState({
    ...initialTimeTable,
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: additionalInfo,
  });

  useEffect(() => {
    if (!isEmpty(infoData) && !isEmpty(infoData.timetable)) {
      const { timetable, amenities, ...otherFields } = infoData;
      const initialTags = infoData.amenities.map((item) => {
        return {
          id: item,
          text: item,
        };
      });
      setValue("initialTags", initialTags);
      setTags(initialTags);
      setBusinessEditForm((prevState) => ({
        ...prevState,
        ...timetable,
      }));
    }
  }, [infoData, setValue]);

  const onSubmit = (data) => {
    const { amenities, ...rest } = data;

    const formatData = {
      amenities: tags.map((tag) => tag.text),
      timetable: businessEditForm,
    };
    setFormValues(formatData);
    nextFormStep();
  };

  if (formStep !== 3) {
    return null;
  }
  const handleDelete = (i) => {
    let updatedTags = tags.filter((tag, index) => index !== i);
    setTags(updatedTags);
  };
  const handleAddition = (tag) => {
    let updatedTags = [...tags, tag];
    setTags(updatedTags);
  };
  const handleInputBlur = (tag) => {
    if (tag) {
      setTags([...tags, { text: tag, id: tag }]);
    }
  };
  return (
    <>
      <div className={style.wrpa_add_form_data}>
        <h2 className={style.item_heading_cl}>Additional Information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_wrap_products">
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    Add Amenities
                  </label>

                  <Controller
                    name="amenities"
                    control={control}
                    render={({ field }) => (
                      <ReactTags
                        tags={tags}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        inputFieldPosition="top"
                        autocomplete
                        placeholder="Add  amenities"
                        editable
                        handleInputBlur={handleInputBlur}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12">
                <label className="form-label custom_label">
                  Business Working Hours
                </label>

                {Object.keys(businessEditForm).map((day) => (
                  <div key={day} className="row d-flex align-items-center mb-3">
                    <div className="col-4">
                      <div className={`mt-2 ${style.login_remember}`}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={businessEditForm[day].isOpen}
                            onChange={() => {
                              setBusinessEditForm((prevState) => ({
                                ...prevState,
                                [day]: {
                                  ...prevState[day],
                                  isOpen: !prevState[day].isOpen,
                                },
                              }));
                            }}
                            id={`${day}-check`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`${day}-check`}
                          >
                            {day}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div>
                        <ReactDatePicker
                          placeholderText="from"
                          autoComplete="off"
                          showTimeSelect
                          showTimeSelectOnly
                          className="form-control"
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          disabled={!businessEditForm[day].isOpen}
                          selected={businessEditForm[day].from}
                          onChange={(date) => {
                            setBusinessEditForm((prevState) => ({
                              ...prevState,
                              [day]: {
                                ...prevState[day],
                                from: date,
                              },
                            }));
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-4">
                      <div>
                        <ReactDatePicker
                          minDate={new Date()}
                          placeholderText="To"
                          autoComplete="off"
                          showTimeSelect
                          showTimeSelectOnly
                          className="form-control"
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          disabled={!businessEditForm[day].isOpen}
                          selected={businessEditForm[day].to}
                          onChange={(date) => {
                            setBusinessEditForm((prevState) => ({
                              ...prevState,
                              [day]: {
                                ...prevState[day],
                                to: date,
                              },
                            }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={style.next_btn}>
            <button type="submit">
              Next <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
