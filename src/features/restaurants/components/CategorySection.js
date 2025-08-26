import React from "react";
import { Box, Heading, UnorderedList, ListItem, Text } from "@chakra-ui/react";
import { Link } from "react-scroll";
import { MdWhatshot } from "react-icons/md";
import IconContainer from "../../../components/common/iconContainer/IconContainer";

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
        <Text size="md" display="flex" alignItems="center" color={"#00A145"}>
          <IconContainer icon={<MdWhatshot />} fontSizeClass="icon--small" />
          <Text ml={2}>Categories</Text>
        </Text>
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
            color="#4A4A4A"
            cursor="pointer"
            _hover={{ color: "#00A145" }}
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
