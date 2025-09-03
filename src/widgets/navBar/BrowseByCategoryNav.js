import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { chakra, Text, LinkBox, LinkOverlay } from "@chakra-ui/react";

const LazyImage = chakra("img", { baseStyle: { loading: "lazy" } });

const MemoBrowseByCategoryNav = ({ image, restaurant_id, title }) => {
  const to = `/restaurant/${encodeURIComponent(restaurant_id)}`;

  return (
    <LinkBox
      as="article"
      role="group"
      cursor="pointer"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      w={36}
      transition="transform 0.2s ease"
      _hover={{ transform: "scale(1.05)" }}
      willChange="transform"
    >
      <LazyImage
        boxSize="130px"
        objectFit="cover"
        borderRadius="full"
        src={image}
        alt={title || "Restaurant"}
        mb={2}
        decoding="async"
      />

      <Text fontSize="sm" noOfLines={1} _groupHover={{ color: "brand.500" }}>
        {title}
      </Text>

      <LinkOverlay
        as={NavLink}
        to={to}
        aria-label={title ? `Open ${title}` : "Open restaurant"}
      />
    </LinkBox>
  );
};

const BrowseByCategoryNav = memo(
  MemoBrowseByCategoryNav,
  (prev, next) =>
    prev.restaurant_id === next.restaurant_id &&
    prev.image === next.image &&
    prev.title === next.title
);

export default BrowseByCategoryNav;
