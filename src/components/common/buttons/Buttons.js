import React from "react";
import { Button, IconButton, HStack, Text } from "@chakra-ui/react";
import IconContainer from "../iconContainer/IconContainer";
import { MdOutlineClose } from "react-icons/md";

function Buttons({ variant, size, title, onClick, close, onCloseClick, type }) {
  // Map your custom variant to Chakra variant or color scheme
  // You can customize this mapping as needed
  const colorSchemeMap = {
    primary: "green",
    normal: "gray",
    // add more mappings if needed
  };

  // Map your size to Chakra size
  const sizeMap = {
    small: "sm",
    medium: "md",
    large: "lg",
  };

  const chakraColorScheme = colorSchemeMap[variant] || "gray";
  const chakraSize = sizeMap[size] || "md";

  return close ? (
    <HStack spacing={1} align="center" display="inline-flex">
      <Button
        colorScheme={chakraColorScheme}
        size={chakraSize}
        onClick={onClick}
        type={type || "button"}
      >
        <Text>{title}</Text>
      </Button>
      <IconButton
        aria-label="Close"
        icon={<MdOutlineClose />}
        size="xs"
        onClick={onCloseClick}
        colorScheme="red"
        variant="ghost"
      />
    </HStack>
  ) : (
    <Button
      colorScheme={chakraColorScheme}
      size={chakraSize}
      onClick={onClick}
      type={type || "button"}
    >
      {title}
    </Button>
  );
}

export default Buttons;
