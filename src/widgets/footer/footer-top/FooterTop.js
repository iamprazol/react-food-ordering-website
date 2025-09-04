import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import {
  PaymentIcon,
  CardGiftIcon,
  AssignmentIcon,
  AppsIcon,
  SupportAgentIcon,
  AccountCircleIcon,
} from "../../icon/Icon";

const IconBox = ({ icon: IconComponent, text }) => {
  const iconColor = useColorModeValue("brand.500", "brand.300");

  return (
    <Flex
      direction="column"
      align="center"
      textAlign="center"
      gap={2}
      flex="1"
      minW={{ base: "40%", sm: "30%", md: "15%" }}
    >
      <IconComponent boxSize="12" color={iconColor} />
      <Text color="white" fontSize="sm">
        {text}
      </Text>
    </Flex>
  );
};

const FooterTop = () => {
  return (
    <Box bg="black" py={10}>
      <Flex
        wrap="wrap"
        justify="center"
        gap={6}
        maxW="7xl"
        mx="auto"
        textAlign="center"
      >
        <IconBox icon={PaymentIcon} text="100% Payment Secured" />
        <IconBox icon={AccountCircleIcon} text="Support lots of Payments" />
        <IconBox icon={SupportAgentIcon} text="24/7 Customer Support" />
        <IconBox icon={CardGiftIcon} text="Free Delivery with Rs.5000" />
        <IconBox icon={AssignmentIcon} text="Best Price Guaranteed" />
        <IconBox icon={AppsIcon} text="Mobile Apps Ready" />
      </Flex>
    </Box>
  );
};

export default FooterTop;
