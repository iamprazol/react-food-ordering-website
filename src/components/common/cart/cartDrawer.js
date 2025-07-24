import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  IconButton,
} from "@chakra-ui/react";
import Cart from "./cart";
import { MdShoppingBag } from "react-icons/md";

export default function CartDrawer({ isOpen, onClose }) {
  return (
    <Popover placement="bottom-end" closeOnBlur>
      <PopoverTrigger>
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
