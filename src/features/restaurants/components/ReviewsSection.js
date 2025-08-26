import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Heading,
  Text,
  Flex,
  chakra,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { MdStar } from "react-icons/md";
import IconContainer from "../../../components/common/iconContainer/IconContainer";
import Foodie from "../../../assets/images/foodie.png";

const LazyImage = chakra("img", { baseStyle: { loading: "lazy" } });

function ReviewsSection() {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const { REACT_APP_API_URL } = process.env;
  const { restaurantId } = useParams();
  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/reviewofrestaurant/${restaurantId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setReviews(data.data);
        }
      })
      .finally(() => setLoading(false)); // Done loading
  }, [REACT_APP_API_URL, restaurantId]);

  return (
    <Flex
      as="section"
      py={10}
      px={{ base: 4, md: 8 }}
      maxW="7xl"
      mx="auto"
      id="reviews"
      direction={"column"}
    >
      <Box py={6} width="100%">
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
          <Heading as="h3" ml={2} fontWeight="600" color={"#000000de"}>
            Reviews
          </Heading>
        </Box>

        {loading
          ? [...Array(3)].map((_, idx) => (
              <Flex
                key={idx}
                fontWeight="medium"
                py={4}
                borderBottom="1px"
                borderColor="gray.100"
                direction="column"
                gap={3}
              >
                <Flex gap={3} align="center">
                  <Skeleton boxSize="40px" borderRadius="full" />
                  <Skeleton height="16px" width="120px" />
                </Flex>
                <Skeleton height="16px" width="80px" />
                <SkeletonText mt="2" noOfLines={2} spacing="2" />
              </Flex>
            ))
          : reviews?.map((review, idx) => (
              <Flex
                key={idx}
                fontWeight="medium"
                py={2}
                borderBottom="1px"
                borderColor="gray.100"
                color="#4A4A4A"
                cursor="pointer"
              >
                <Flex direction="column" flex={1} mb={5} gap={4}>
                  <Flex justifyContent={"space-between"} width="100%">
                    <Flex alignItems={"center"} gap={3}>
                      <LazyImage
                        src={review.reviewer_picture}
                        alt="user"
                        boxSize="40px"
                        objectFit="cover"
                        borderRadius="full"
                      />
                      <Text fontSize="sm" fontWeight="600" color={"#000000de"}>
                        {review.reviewer_name}
                      </Text>
                    </Flex>
                    <Text fontSize="sm" fontWeight="600" color={"#000000de"}>
                      {review.created_at}
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    {[...Array(review.rating)].map((_, i) => (
                      <IconContainer
                        key={i}
                        icon={<MdStar />}
                        colorClass="text-yellow"
                        fontSizeClass="icon--large"
                      />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <IconContainer
                        key={i}
                        icon={<MdStar />}
                        fontSizeClass="icon--large"
                      />
                    ))}
                  </Flex>
                  <Text fontSize={"md"} color="#000000de" fontWeight={400}>
                    {review.review}
                  </Text>
                </Flex>
              </Flex>
            ))}
      </Box>
      <Box
        py={6}
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={6}
      >
        <LazyImage src={Foodie} alt={"foodie"} height="auto" width="20%" />
        <Box
          textAlign="center"
          maxWidth="600px"
          gap={2}
          display="flex"
          flexDirection="column"
        >
          <Heading fontSize={"30px"} color={"#6b6b83"} fontWeight="600">
            Be one of the first to review
          </Heading>
          <Text fontSize={"15px"} color={"#6b6b83"} fontWeight="400">
            Order now and write a review to give others the inside scoop.
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default ReviewsSection;
