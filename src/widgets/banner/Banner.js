import { Box, Flex } from "@chakra-ui/react";

function Banner({ bannerImage, bannerHeight = "medium", bannerContent }) {
  const heightMap = {
    large: { base: "250px", md: "400px", lg: "650px" },
    medium: { base: "150px", md: "250px", lg: "300px" },
    small: { base: "100px", md: "120px", lg: "150px" },
  };

  return (
    <Box
      as="section"
      w="100%"
      h={heightMap[bannerHeight]}
      overflow="hidden"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Flex
        align="center"
        justify="center"
        h="100%"
        w="100%"
        bg={bannerImage ? undefined : "floralwhite"}
        backgroundImage={
          bannerImage
            ? `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${bannerImage})`
            : undefined
        }
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundBlendMode={bannerImage ? "overlay" : undefined}
        color={bannerImage ? "white" : "gray.800"}
        px={{ base: 4, md: 8 }}
        textAlign="center"
      >
        {bannerContent}
      </Flex>
    </Box>
  );
}

export default Banner;
