import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const FooterBottom = () => {
  const [foodPics, setFoodPics] = useState([]);

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const LazyImage = chakra("img", {
    baseStyle: {
      loading: "lazy",
    },
  });

  useEffect(() => {
    const { REACT_APP_API_URL } = process.env;
    fetch(REACT_APP_API_URL + "/foods")
      .then((res) => res.json())
      .then((data) => {
        const foodsArray = shuffle(data.data);
        const foodElements = foodsArray
          .slice(0, 7)
          .map((food, idx) => (
            <LazyImage
              key={idx}
              src={`${food.picture}`}
              objectFit={"cover"}
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: "scale(1.1)" }}
              width="60%"
              flex="1"
            />
          ));
        setFoodPics(foodElements);
      });
  }, []);

  const sectionHeading = (text) => (
    <Heading
      fontSize="xl"
      color="white"
      mb={4}
      fontWeight="600"
      fontFamily="heading"
    >
      {text}
    </Heading>
  );

  const linkItem = (text, href = "#") => (
    <Link
      href={href}
      fontWeight="600"
      color="gray.300"
      _hover={{ color: "white" }}
      fontSize="sm"
    >
      {text}
    </Link>
  );

  const infoRow = (label, value) => (
    <Stack spacing={0} fontSize="sm">
      <Text fontWeight="600" color="gray.300">
        {label}
      </Text>
      <Text color="white">{value}</Text>
    </Stack>
  );

  return (
    <Box bg="black" px={{ base: 4, md: 8 }} py={10}>
      <Box bg="black" py={10}>
        <Flex justify="center" maxW="25%" mx="auto" height="200px">
          {foodPics}
        </Flex>
      </Box>

      <Flex justify="space-between" gap={10} maxW="1200px" mx="auto" py={10}>
        {/* Need Help */}
        <Box w={{ base: "100%", md: "45%", lg: "18%" }}>
          {sectionHeading("Need Help")}
          <Stack spacing={3}>
            {infoRow("Call Us", "+(977) 9845690436")}
            {infoRow("Email Us", "demo@domain.com")}
            {infoRow("Join our twitter", "@foodie")}
            {infoRow("Join our instagram", "@foodie")}
          </Stack>
        </Box>

        {/* Get To Know Us */}
        <Box w={{ base: "100%", md: "45%", lg: "18%" }}>
          {sectionHeading("Get To Know Us")}
          <Stack spacing={2}>
            {linkItem("About Us")}
            {linkItem("Blog")}
            {linkItem("Socialize")}
            {linkItem("FooDie")}
            {linkItem("Perks")}
          </Stack>
        </Box>

        {/* Let Us Know You */}
        <Box w={{ base: "100%", md: "45%", lg: "18%" }}>
          {sectionHeading("Let Us Know You")}
          <Stack spacing={2}>
            {linkItem("Account Details")}
            {linkItem("Order History")}
            {linkItem("Find restaurant")}
            {linkItem("Login")}
            {linkItem("Track order")}
          </Stack>
        </Box>

        {/* Doing Business */}
        <Box w={{ base: "100%", md: "45%", lg: "18%" }}>
          {sectionHeading("Doing Business ?")}
          <Stack spacing={2}>
            {linkItem("Suggest an Idea")}
            {linkItem("Be a Partner restaurant")}
            {linkItem("Create an Account")}
            {linkItem("Help")}
          </Stack>
        </Box>

        {/* Download Apps */}
        <Box w={{ base: "100%", md: "45%", lg: "18%" }}>
          {sectionHeading("Download Apps")}
          <Stack spacing={3}>
            <LazyImage
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              maxW="140px"
            />
            <LazyImage
              src="https://markseducation.com/wp-content/uploads/2016/11/link-badge-appstore_2x.png"
              alt="App Store"
              maxW="140px"
            />
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default FooterBottom;
