import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Flex,
  chakra,
  Text,
  IconButton,
  SimpleGrid,
  PopoverFooter,
  Button as ChakraButton,
  useDisclosure,
  Link,
  useToast,
} from "@chakra-ui/react";
import { RiArrowDropDownLine, RiUserFollowLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { useLoginUser } from "../../../../hooks/useLoginUser/useLoginUser";
import { GiSelfLove } from "react-icons/gi";
import { FaRegAddressCard } from "react-icons/fa";

export default function AccountDrawer({ userData }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { toast } = useToast;
  const accountDrawerItems = [
    {
      icon: <RiUserFollowLine size={30} />,
      text: "Account",
      slug: "my-account",
    },
    {
      icon: <IoFastFoodOutline size={30} />,
      text: "Orders",
      slug: "orders",
    },

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

  const { mutate: logout, isPending } = useLoginUser(
    () => {
      toast({
        title: "Logout Successful",
        description: "You have been successfully logged-out from the site.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    },
    (error) => {}
  );

  const LazyImage = chakra("img", {
    baseStyle: {
      loading: "lazy",
    },
  });

  return (
    <Popover
      placement="bottom-end"
      closeOnBlur
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Flex align={"center"} gap={2}>
          <LazyImage
            src={userData.picture}
            borderRadius={"full"}
            boxSize={"35px"}
            alt={userData.first_name}
            border="2px solid red"
          />
          <Flex align={"center"} gap={0}>
            <Text color="#6b6b83" fontWeight={"600"} fontSize={"13px"}>
              Hi, {""}
              {userData?.first_name?.charAt(0).toUpperCase() +
                userData?.first_name?.slice(1)}
            </Text>
            <IconButton
              aria-label="Open Cart"
              icon={<RiArrowDropDownLine size={30} />}
              variant="ghost"
              fontSize="24px"
              color="brand.500"
              p={0}
              m={0}
              _hover={{
                color: "brand.700",
              }}
            />
          </Flex>
        </Flex>
      </PopoverTrigger>
      <PopoverContent width="200px" paddingTop={10}>
        <PopoverArrow />
        <PopoverBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
            {accountDrawerItems.map((items, idx) => (
              <Flex
                direction={"column"}
                gap={3}
                alignItems={"center"}
                role="group"
                cursor="pointer"
                textAlign={"center"}
              >
                <Link href={"/" + items.slug}>
                  <IconButton
                    aria-label="Open Cart"
                    icon={items.icon}
                    variant="ghost"
                    fontSize="24px"
                    color="brand.500"
                    p={0}
                    m={0}
                    key={idx}
                    _groupHover={{ color: "brand.700" }}
                  />
                </Link>
                <Text
                  _groupHover={{ color: "brand.700" }}
                  color="brand.500"
                  fontWeight="500"
                >
                  {items.text}
                </Text>
              </Flex>
            ))}
          </SimpleGrid>
        </PopoverBody>
        <PopoverFooter
          alignItems={"center"}
          display={"flex"}
          flexDir={"column"}
          p={4}
        >
          <Text fontWeight="500">
            Not{" "}
            {userData?.first_name?.charAt(0).toUpperCase() +
              userData?.first_name?.slice(1)}
            ?
            <ChakraButton
              _hover={{ color: "brand.700" }}
              onClick={() => {
                logout();
                onClose();
              }}
              variant={"link"}
              fontSize={"13px"}
              marginLeft={2}
              color={"brand.500"}
            >
              Sign Out
            </ChakraButton>
          </Text>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
