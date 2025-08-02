import { Box, Text, Icon } from "@chakra-ui/react";

function IconContainer({
  icon,
  colorClass,
  fontSizeClass,
  text,
  tag,
  iconStyle,
  iconPlacement = "center",
  onClick,
}) {
  // Map old class names to Chakra styles (can be expanded)
  const colorMap = {
    "text-yellow": "#fcb71b",
    "text-red": "red.500",
    "text-light-black": "gray.800",
    "text-light-white": "gray.500",
  };

  const fontSizeMap = {
    "icon--small": "16px",
    "icon--medium": "20px",
    "icon--large": "24px",
  };

  const placementMap = {
    center: "center",
    left: "flex-start",
    right: "flex-end",
  };

  return (
    <Box
      as="span"
      display="flex"
      alignItems="center"
      justifyContent={placementMap[iconPlacement] || "center"}
      gap={1}
      color={colorMap[colorClass] || "inherit"}
      fontSize={fontSizeMap[fontSizeClass] || "inherit"}
      cursor={onClick ? "pointer" : "default"}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(true);
      }}
      style={iconStyle}
    >
      {icon && <Icon as={icon.type} />}
      {text && <Text as="span">{text}</Text>}
      {tag && <Text as="span">{tag}</Text>}
    </Box>
  );
}

export default IconContainer;
