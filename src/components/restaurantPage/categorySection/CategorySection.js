import React from "react";
import { Box, Heading, UnorderedList, ListItem, Text } from "@chakra-ui/react";
import { Link } from "react-scroll";
import { MdWhatshot } from "react-icons/md";
import IconContainer from "../../common/iconContainer/IconContainer";

function CategorySection({ categories }) {
  return (
    <Box py={6}>
      {/* Header */}
      <Box
        borderBottom="2px"
        borderColor="gray.200"
        mb={4}
        pb={2}
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Heading as="h3" size="md" display="flex" alignItems="center">
          <IconContainer
            icon={<MdWhatshot />}
            colorClass="text-yellow"
            fontSizeClass="icon--small"
          />
          <Text ml={2}>Categories</Text>
        </Heading>
      </Box>

      {/* Categories List */}
      <UnorderedList listStyleType="none" m={0} p={0}>
        {categories?.map((category, idx) => (
          <ListItem
            key={idx}
            fontWeight="medium"
            py={2}
            borderBottom="1px"
            borderColor="gray.100"
            color="gray.700"
            cursor="pointer"
            _hover={{ color: "red.500" }}
          >
            <Link to={category.toLowerCase()} smooth>
              {category}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}

export default CategorySection;
