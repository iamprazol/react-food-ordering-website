import { Box, Heading, Flex } from "@chakra-ui/react";

// Components
import TopLayout from "../../shared/ui/TopLayout";
import SideBar from "../../features/accounts/components/SideBar";

const MyAccountHeader = ({ index }) => {
  return (
    <>
      <Box
        as="section"
        px={{ base: 0, md: 40 }}
        bg="gray.50"
        textAlign="left"
        borderTop="1px solid #E7E7E7"
      >
        <Box px={{ base: 2, md: 8 }} paddingTop={{ base: 4, md: 12 }}>
          <Heading
            fontSize={{ base: "20px", md: "30px", lg: "40px" }}
            mb={4}
            fontWeight="400"
            lineHeight="1.2"
            color={"#4a4a4a"}
          >
            Account Settings
          </Heading>
        </Box>
      </Box>
      <Flex
        as="section"
        py={10}
        px={{ base: 4, md: 8 }}
        maxW="7xl"
        mx={{ base: 0, md: "150px" }}
        direction={"column"}
        align={"left"}
        justifyContent={"flex-start"}
      >
        <SideBar index={index} />
      </Flex>
    </>
  );
};
const MyAccount = ({ index }) => {
  return <TopLayout element={<MyAccountHeader index={index} />}></TopLayout>;
};

export default MyAccount;
