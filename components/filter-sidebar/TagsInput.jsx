import React, { useState } from "react";

const TagsInput = ({
  name,
  placeHolder,
  value,
  onChange,
  onBlur,
  onRemoved,
  disabled,
  beforeAddValidate,
  onKeyUp,
  hideRemoveButton,
  classNames,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTag = inputValue.trim();
      if (!beforeAddValidate || beforeAddValidate(newTag, value)) {
        setInputValue("");
        onChange([...value, newTag]);
      }
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = value.filter((tag) => tag !== tagToRemove);
    onChange(updatedTags);
    if (onRemoved) {
      onRemoved(tagToRemove);
    }
  };

  return (
    <div className={classNames?.tagsInputContainer}>
      <div className={classNames?.tagsContainer}>
        {value.map((tag) => (
          <div key={tag} className={classNames?.tag}>
            {tag}
            {!disabled && !hideRemoveButton && (
              <button
                type="button"
                onClick={() => handleTagRemove(tag)}
                disabled={disabled}
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>
      {!disabled && (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={placeHolder}
          name={name}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          disabled={disabled}
          className={classNames?.input}
        />
      )}
    </div>
  );
};

export default TagsInput;
