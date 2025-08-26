import { Box, Flex } from "@chakra-ui/react";

function Banner({ bannerImage, bannerHeight, bannerContent }) {
  const height =
    bannerHeight === "large"
      ? "650px"
      : bannerHeight === "medium"
      ? "300px"
      : "150px";

  return (
    <Box
      as="section"
      w="100%"
      h={height}
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
        color="white"
      >
        {bannerContent}
      </Flex>
    </Box>
  );
}

export default Banner;
