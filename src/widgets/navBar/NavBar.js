import { useState } from "react";
import {
  Box,
  Flex,
  chakra,
  Input,
  IconButton,
  Button as ChakraButton,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import CartDrawer from "../../features/carts/components/cartDrawer";
import NotificationDrawer from "../notifications/NotificationDrawer";
import AccountIcon from "../accountIcon/AccountIcon";
import { useAuth } from "../../context/AuthContext";
import { Search } from "../icon/Icon";

const LazyImage = chakra("img", { baseStyle: { loading: "lazy" } });

function NavBar({ onClick, onChange }) {
  const [searchText, setSearchText] = useState("");
  const {
    state: { token },
  } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px={{ base: 4, md: 5 }}
      bg="white"
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex="999"
    >
      <Box>
        <Link href="/">
          <LazyImage
            src={process.env.REACT_APP_URL + "/images/logo/foodie.png"}
            alt="Foodie Logo"
            width={{ base: "140px", md: "160px" }}
            height={{ base: "50px", md: "70px" }}
            objectFit="contain"
          />
        </Link>
      </Box>

      <Flex
        flex="1"
        align="center"
        justify="center"
        maxW="700px"
        px={4}
        display={{ base: "none", md: "flex" }}
      >
        <Flex
          align="center"
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
          bg="gray.50"
          w="100%"
        >
          <IconButton
            aria-label="Search"
            icon={<Search />}
            variant="ghost"
            fontSize="xl"
          />
          <Input
            placeholder="Bajeko Sekuwa"
            border="none"
            focusBorderColor="transparent"
            onChange={(e) => onChange(e)}
            onChange={(e) => setSearchText(e.target.value)}
            bg="white"
            rounded="full"
            shadow="sm"
            _placeholder={{ color: "gray.400" }}
          />
        </Flex>

        <ChakraButton
          colorScheme="blue"
          ml={4}
          px={8}
          bgColor="brand.500"
          borderColor="brand.500"
          _hover={{ bgColor: "brand.600" }}
          onClick={() => onClick("find_restaurant", searchText)}
        >
          Find Restaurant
        </ChakraButton>
      </Flex>

      <Flex align="center" gap={8}>
        <AccountIcon onClick={onClick} />
        <CartDrawer />
        {token ? <NotificationDrawer /> : ""}
      </Flex>
    </Flex>
  );
}

export default NavBar;
