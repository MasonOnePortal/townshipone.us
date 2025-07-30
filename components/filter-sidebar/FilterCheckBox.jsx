"use client";
import style from "./filter_sidebar.module.css";

function FilterCheckBox({ name, value, checked, onChange }) {
  return (
    <>
      <div className={style.wrap_checkbox_fltr}>
        <div className="d-flex justify-content-between">
          <div>
            <label className={style.container_lbl}>
              {name}
              <input
                type="checkbox"
                name={name}
                checked={checked}
                value={value}
                onChange={() => onChange(value)}
              />
              <span className={style.checkmark_lbl}></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterCheckBox;
