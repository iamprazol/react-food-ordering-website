import {
  Box,
  Heading,
  Text,
  Button as ChakraButton,
  Stack,
} from "@chakra-ui/react";

// Components
import BrowseByCategory from "../../features/restaurants/components/restaurant-filters/browse-by-category/BrowseByCategory";
import RestaurantList from "../../features/restaurants/components/restaurant-list/RestaurantList";
import Banner from "../../widgets/banner/Banner";
import Ads from "../../widgets/ads/Ads";
import TopLayout from "../../shared/ui/TopLayout";

const HomeHeader = () => {
  const { REACT_APP_URL } = process.env;
  return (
    <>
      {/* Banner Section */}
      <Banner
        bannerImage={REACT_APP_URL + "/images/food/1624721452.jpg"}
        bannerHeight="large"
        bannerContent={
          <Box
            textAlign={{ base: "center", md: "left" }}
            px={{ base: 4, md: 16 }}
            py={{ base: 8, md: 24 }}
          >
            <Heading
              fontSize={{ base: "20px", sm: "30px", md: "50px", lg: "60px" }}
              mb={4}
              fontWeight="600"
              lineHeight="1.2"
              width={{ base: "100%", md: "80%", lg: "70%" }}
              mx={{ base: "auto", md: "0" }}
            >
              Order your favourite food from anywhere
            </Heading>
            <Text
              fontSize={{ base: "14px", sm: "18px", md: "24px", lg: "28px" }}
              mb={6}
              fontWeight="400"
              width={{ base: "100%", md: "80%" }}
              mx={{ base: "auto", md: "0" }}
            >
              with the largest food ordering platform all over Nepal
            </Text>
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={4}
              justify={{ base: "center", md: "flex-start" }}
            >
              <ChakraButton
                colorScheme="blue"
                px={{ base: 6, md: 8 }}
                py={{ base: 4, md: 6 }}
                bgColor="brand.500"
                borderColor="brand.500"
                _hover={{ bgColor: "brand.600" }}
                as="a"
                href={"#restaurants"}
                fontSize={{ base: "14px", md: "18px" }}
              >
                Order Now
              </ChakraButton>
            </Stack>
          </Box>
        }
      />

      <BrowseByCategory />

      <Ads
        adsText={"Get free delivery with Rs.5000"}
        image={REACT_APP_URL + "/images/food/1624721452.jpg"}
        link="#restaurants"
        buttonText="Learn More"
      />

      <RestaurantList searchText="" col={{ base: 1, sm: 2, md: 3, lg: 4 }} />

      <Ads
        adsText={"Get free delivery with Rs.5000"}
        image={REACT_APP_URL + "/images/food/1624721452.jpg"}
        link="#restaurants"
        buttonText="Learn More"
      />
    </>
  );
};

const HomePage = () => {
  return <TopLayout element={<HomeHeader />} />;
};

export default HomePage;
