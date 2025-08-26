import { chakra, Heading, Center } from "@chakra-ui/react";
import TopLayout from "../common/topLayout/TopLayout";
import HungryImage from "../../assets/images/hungry.png";

const LazyImage = chakra("img", { baseStyle: { loading: "lazy" } });

const PageNotFoundBody = () => {
  return (
    <Center flex="1" flexDirection="column" p={8}>
      <LazyImage
        src={HungryImage}
        alt="foodie"
        maxW="300px"
        mb={6}
        objectFit="contain"
      />
      <Heading color="red.500" size="2xl">
        OOPS! Page not found.
      </Heading>
    </Center>
  );
};

const PageNotFound = () => {
  return <TopLayout element={<PageNotFoundBody />}></TopLayout>;
};

export default PageNotFound;
