"use client";
import React, { useState } from "react";
import style from "./data_table.module.scss";
import { MdDelete } from "react-icons/md";
import { Button, Popconfirm } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
const RowAction = ({
  row,
  removeHandler,
  updateHandler,
  viewDetailHandler,
  isDeletable = true,
  isEditable = true,
  isViewVisible = false,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const confirm = async (e) => {
    setConfirmLoading(true);
    await removeHandler(e);
    setConfirmLoading(false);
  };
  return (
    <>
      <div className={style.action_section_wrap}>
        {isEditable ? (
          <Button onClick={(e) => updateHandler(row.row.original)} type="text">
            <FaRegEdit size={20} />
          </Button>
        ) : null}
        {isViewVisible ? (
          <Button
            onClick={(e) => viewDetailHandler(row.row.original)}
            type="text"
          >
            <AiOutlineEye size={20} />
          </Button>
        ) : null}
        {isDeletable ? (
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this user?"
            onConfirm={(e) => confirm(row.row.original)}
            okButtonProps={{
              loading: confirmLoading,
            }}
            icon={
              <BsQuestionCircle
                size={20}
                style={{
                  color: "red",
                  paddingRight: "5px",
                }}
              />
            }
          >
            <Button type="text" danger>
              <MdDelete size={20} />
            </Button>
          </Popconfirm>
        ) : null}
      </div>
    </>
  );
};

export default RowAction;
