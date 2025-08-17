import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  IconButton,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import OrderNotification from "./OrderNotification";
import { useApp } from "../../../context/AppContext";
import { useEffect, useState, useMemo } from "react";

export default function NotificationDrawer() {
  const {
    state: { notifications = [] },
    dispatch,
  } = useApp();

  const activeCount = useMemo(
    () => notifications.filter((notification) => !notification?.is_read).length,
    [notifications]
  );

  const markAllRead = () => {
    if (!notifications.length) return;
    const updated = notifications.map((notification) =>
      notification?.is_read ? notification : { ...notification, is_read: true }
    );

    dispatch?.({
      type: "SET_NOTIFICATIONS",
      payload: updated,
    });
  };

  return (
    <Popover placement="bottom-end" closeOnBlur onClose={markAllRead}>
      <PopoverTrigger>
        <Flex position="relative">
          <IconButton
            aria-label="Open Notifications"
            icon={<MdOutlineNotificationsActive size={40} />}
            variant="ghost"
            fontSize="24px"
            color="brand.500"
            _hover={{ color: "brand.700" }}
          />
          {!!activeCount && (
            <Badge
              bgColor="brand.300"
              variant="solid"
              borderRadius="full"
              px={2}
              position="absolute"
              right="0px"
            >
              {activeCount}
            </Badge>
          )}
        </Flex>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <OrderNotification orderId={"11"} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
