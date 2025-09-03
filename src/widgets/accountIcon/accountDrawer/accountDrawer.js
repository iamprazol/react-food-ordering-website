import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  Flex,
  Text,
  IconButton,
  SimpleGrid,
  Button as ChakraButton,
  useDisclosure,
  useToast,
  LinkBox,
  LinkOverlay,
  Avatar,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { RiArrowDropDownLine, RiUserFollowLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiSelfLove } from "react-icons/gi";
import { FaRegAddressCard } from "react-icons/fa";
import { useLogoutUser } from "../../../features/auth/hooks/useLogoutUser";

const accountDrawerItems = [
  { icon: <RiUserFollowLine size={30} />, text: "Account", slug: "my-account" },
  { icon: <IoFastFoodOutline size={30} />, text: "Orders", slug: "orders" },
  {
    icon: <FaRegAddressCard size={30} />,
    text: "Saved Address",
    slug: "my-account/address",
  },
  {
    icon: <GiSelfLove size={30} />,
    text: "Favourites",
    slug: "my-account/favourites",
  },
];

export default function AccountDrawer({ userData }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();

  const { logout } = useLogoutUser(() => {
    toast({
      title: "Logout Successful",
      description: "You have been successfully logged-out from the site.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  });

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    onClose();
  };

  const displayName =
    (userData?.first_name?.charAt(0).toUpperCase() || "") +
    (userData?.first_name?.slice(1) || "");

  return (
    <Popover
      placement="bottom-end"
      closeOnBlur
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      isLazy
      lazyBehavior="unmount"
      returnFocusOnClose
    >
      <PopoverTrigger>
        <Flex align="center" gap={2} cursor="pointer">
          <Avatar
            name={displayName}
            src={userData?.picture}
            boxSize="35px"
            border="2px solid"
            borderColor="red.300"
          />
          <Flex align="center" gap={0}>
            <Text color="#6b6b83" fontWeight="600" fontSize="13px">
              Hi, {displayName}
            </Text>
            <IconButton
              aria-label="Open account menu"
              icon={<RiArrowDropDownLine size={30} />}
              variant="ghost"
              fontSize="24px"
              color="brand.500"
              p={0}
              m={0}
              _hover={{ color: "brand.700" }}
            />
          </Flex>
        </Flex>
      </PopoverTrigger>

      <PopoverContent width="220px" pt={10}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <SimpleGrid columns={{ base: 2 }} spacing={4} mb={6}>
            {accountDrawerItems.map((item) => (
              <LinkBox
                key={item.slug}
                as={Flex}
                direction="column"
                gap={2}
                align="center"
                role="group"
                cursor="pointer"
                textAlign="center"
                _hover={{ color: "brand.700" }}
              >
                <IconButton
                  aria-hidden
                  tabIndex={-1}
                  icon={item.icon}
                  variant="ghost"
                  fontSize="24px"
                  color="brand.500"
                  p={0}
                  m={0}
                  _groupHover={{ color: "brand.700" }}
                />
                <Text color="brand.500" fontWeight="500">
                  {item.text}
                </Text>
                <LinkOverlay
                  as={RouterLink}
                  to={`/${item.slug}`}
                  onClick={onClose}
                  aria-label={item.text}
                />
              </LinkBox>
            ))}
          </SimpleGrid>
        </PopoverBody>

        <PopoverFooter
          display="flex"
          flexDir="column"
          alignItems="center"
          p={4}
        >
          <Text fontWeight="500">
            Not {displayName}?{" "}
            <ChakraButton
              onClick={handleLogout}
              variant="link"
              fontSize="13px"
              ml={2}
              color="brand.500"
              _hover={{ color: "brand.700" }}
            >
              Sign Out
            </ChakraButton>
          </Text>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
