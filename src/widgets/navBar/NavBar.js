import { useState } from "react";
import {
  Box,
  Flex,
  chakra,
  Input,
  IconButton,
  Button as ChakraButton,
  Link,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import CartDrawer from "../../features/carts/components/cartDrawer";
import NotificationDrawer from "../notifications/NotificationDrawer";
import AccountIcon from "../accountIcon/AccountIcon";
import { useAuth } from "../../context/AuthContext";
import { Search } from "../icon/Icon";
import { useApp } from "../../context/AppContext";

const LazyImage = chakra("img", { baseStyle: { loading: "lazy" } });

function NavBar({ onClick, onChange }) {
  const [searchText, setSearchText] = useState("");
  const {
    state: { token },
  } = useAuth();
  const {
    state: { isMobile },
  } = useApp();

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      {/* Logo */}
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

      {/* Desktop Search */}
      {!isMobile && (
        <Flex flex="1" align="center" justify="center" maxW="700px" px={4}>
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
              icon={<Search size={6} />}
              variant="ghost"
              fontSize="xl"
            />
            <Input
              placeholder="Bajeko Sekuwa"
              border="none"
              focusBorderColor="transparent"
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
      )}

      {/* Right side */}
      <Flex align="center" gap={8}>
        {isMobile ? (
          <>
            <IconButton
              aria-label="Open Menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="ghost"
            />
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent alignItems={"center"} maxW="75%">
                <DrawerCloseButton />
                <DrawerBody mt={10}>
                  <VStack spacing={6} align="stretch">
                    <AccountIcon onClick={onClick} />
                    <CartDrawer />
                    {token ? <NotificationDrawer /> : null}
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <>
            <AccountIcon onClick={onClick} />
            <CartDrawer />
            {token ? <NotificationDrawer /> : null}
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default NavBar;
