import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  IconButton,
  Text,
} from "@chakra-ui/react";
import Cart from "./cart";
import { MdShoppingBag } from "react-icons/md";
import { useApp } from "../../../context/AppContext";

export default function CartDrawer() {
  const {
    state: { isMobile },
  } = useApp();

  return (
    <Popover isLazy lazyBehavior="unmount" placement="bottom-end" closeOnBlur>
      <PopoverTrigger>
        {isMobile ? (
          <Text fontSize="16px" color="brand.500" fontWeight={"500"}>
            Cart
          </Text>
        ) : (
          <IconButton
            aria-label="Open Cart"
            icon={<MdShoppingBag size={40} />}
            variant="ghost"
            fontSize="24px"
            color="brand.500"
            _hover={{
              color: "brand.700",
            }}
          />
        )}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Cart cartType="drawer" />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
