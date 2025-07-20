import React from "react";
import {
  Input,
  Textarea,
  Select,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import IconContainer from "../iconContainer/IconContainer";
import { MdError } from "react-icons/md";

function InputHandler({ fieldSetting, onChange }) {
  const { type, value, required, placeholder, id, name, error, options, icon } =
    fieldSetting;

  const handleChange = (e) => {
    if (onChange) {
      if (type === "select") {
        onChange(e.target.value);
      } else {
        onChange(e.target.value);
      }
    }
  };

  return (
    <FormControl isInvalid={!!error} isRequired={required} id={id} name={name}>
      {(type === "text" ||
        type === "email" ||
        type === "password" ||
        type === "number") && (
        <InputGroup>
          {icon && (
            <InputLeftElement pointerEvents="none">
              <IconContainer
                icon={icon}
                colorClass={error ? "text-red" : "text-green"}
              />
            </InputLeftElement>
          )}
          <Input
            type={type}
            defaultValue={value || ""}
            isDisabled={required}
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            min={type === "number" ? 1 : undefined}
            step={type === "number" ? 1 : undefined}
          />
          {error && (
            <FormErrorMessage display="flex" alignItems="center" gap={1}>
              <IconContainer
                icon={<MdError />}
                fontSizeClass="icon--small"
                colorClass="text-red"
              />
              {error}
            </FormErrorMessage>
          )}
        </InputGroup>
      )}

      {type === "textarea" && (
        <Textarea
          defaultValue={value || ""}
          isDisabled={required}
          placeholder={placeholder}
          rows={6}
          onChange={handleChange}
          id={id}
          name={name}
        />
      )}

      {type === "select" && (
        <Select
          placeholder={placeholder}
          defaultValue={value || ""}
          isDisabled={required}
          onChange={handleChange}
          name={name}
        >
          {options &&
            Object.entries(options).map(([key, option]) => (
              <option key={key} value={key}>
                {option}
              </option>
            ))}
        </Select>
      )}
    </FormControl>
  );
}

export default InputHandler;
