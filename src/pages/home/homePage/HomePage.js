import { Box, Heading, Text, Button as ChakraButton } from "@chakra-ui/react";

// Components
import BrowseByCategory from "../browseByCategory/BrowseByCategory";
import RestaurantList from "../../../features/restaurants/components/RestaurantList";
import Banner from "../../../widgets/banner/Banner";
import Ads from "../../../components/common/ads/Ads";
import TopLayout from "../../../components/common/topLayout/TopLayout";

const HomeHeader = () => {
  const { REACT_APP_URL } = process.env;
  return (
    <>
      {/* Banner Section */}
      <Banner
        bannerImage={REACT_APP_URL + "images/food/1624721452.jpg"}
        bannerHeight="large"
        bannerContent={
          <Box
            textAlign={{ base: "center", md: "left" }}
            px={{ base: 4, md: 16 }}
            py={{ base: 8, md: 24 }}
            transform="translateY(0)"
          >
            <Heading
              fontSize={{ base: "40px", md: "50px", lg: "60px" }}
              mb={4}
              fontWeight="600"
              lineHeight="1.2"
              width="70%"
            >
              Order your favourite food from anywhere
            </Heading>
            <Text
              fontSize={{ base: "24px", md: "28px" }}
              mb={6}
              fontWeight="400"
            >
              with the largest food ordering platform all over Nepal
            </Text>
            <ChakraButton
              colorScheme="blue"
              ml={4}
              px={8}
              bgColor="brand.500"
              borderColor="brand.500"
              _hover={{ bgColor: "brand.600" }}
            >
              {"Order Now"}
            </ChakraButton>
          </Box>
        }
      />

      <BrowseByCategory />

      <Ads
        adsText={"Get free delivery with Rs.5000"}
        image={REACT_APP_URL + "images/food/1624721452.jpg"}
        link="google.com"
        buttonText="Learn More"
      />

      <RestaurantList searchText="" col="4" />

      <Ads
        adsText={"Get free delivery with Rs.5000"}
        image={REACT_APP_URL + "images/food/1624721452.jpg"}
        link="google.com"
        buttonText="Learn More"
      />
    </>
  );
};

const HomePage = () => {
  return <TopLayout element={<HomeHeader />}></TopLayout>;
};

export default HomePage;
