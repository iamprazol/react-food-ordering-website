// Import Libraries.
import React from "react";

// Import CSS.
import "./InputHandler.css";

function InputHandler({ fieldSetting, onChange }) {
  const renderInput = (fieldSetting) => {
    switch (fieldSetting.type) {
      case "text":
      case "email":
      case "password":
        return (
          <input
            type={fieldSetting.type}
            defaultValue={fieldSetting.value || ""}
            disabled={fieldSetting.required}
            placeholder={fieldSetting.placeholder}
            className="rfow-field-control rfow-input"
            onChange={(e) => onChange(e)}
            name={fieldSetting.name}
          />
        );
      case "textarea":
        return (
          <textarea
            rows="6"
            cols="20"
            type={fieldSetting.type}
            disabled={fieldSetting.required}
            className="rfow-field-control"
            placeholder={fieldSetting.placeholder}
            id={fieldSetting.id}
          >
            {fieldSetting.value || ""}
          </textarea>
        );
      case "select":
        return (
          <select
            disabled={fieldSetting.required}
            className="rfow-field-control rfow-input"
            onChange={(e) => onChange(e)}
          >
            {fieldSetting.placeholder ? (
              <option value="" disabled selected>
                {fieldSetting.placeholder}
              </option>
            ) : (
              ""
            )}

            {Object.entries(fieldSetting.options).map(([key, option]) => {
              return (
                <option
                  key={key}
                  defaultValue={option}
                  selected={fieldSetting.value === option ? "selected" : ""}
                >
                  {option}
                </option>
              );
            })}
          </select>
        );
      case "number":
        return (
          <input
            type={fieldSetting.type}
            defaultValue={fieldSetting.value || ""}
            disabled={fieldSetting.required}
            placeholder={fieldSetting.placeholder}
            className="rfow-field-control rfow-input"
            min="1"
            step="1"
            onChange={(e) => onChange(e)}
          />
        );
      default:
        return "";
    }
  };
  return renderInput(fieldSetting);
}

export default InputHandler;
