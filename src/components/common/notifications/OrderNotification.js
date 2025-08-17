import React, { useState, useEffect } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useApp } from "../../../context/AppContext";
import { Box, VStack, Text, Badge, Flex } from "@chakra-ui/react";

export default function OrderNotification({ orderId, userId = 1 }) {
  const {
    state: { token, notifications, orders },
    dispatch,
  } = useApp();

  useEffect(() => {
    if (!token) {
      return;
    }

    window.Pusher = Pusher;

    const echo = new Echo({
      broadcaster: "pusher",
      key: "456219d73abf6602574f",
      cluster: "mt1",
      forceTLS: true,
      disableStats: true,
      authEndpoint: "http://localhost:8000/broadcasting/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    });

    const channel = echo.private(`App.User.${userId}`);

    channel.notification((notification) => {
      if (notification.type == "OrderStatusUpdatedEvent") {
        const current = Array.isArray(notifications) ? notifications : [];
        let next = [...current, notification];

        dispatch?.({
          type: "SET_NOTIFICATIONS",
          payload: next,
        });

        const updatedOrders = orders.map((item) =>
          item.id === notification.order_id
            ? { ...item, status: notification.status }
            : item
        );

        dispatch?.({
          type: "SET_ORDERS",
          payload: updatedOrders,
        });
      }
    });

    return () => {
      try {
        echo.leave(`private-App.User.${userId}`);
      } catch {}
      echo.disconnect();
    };
  }, [orderId, token, userId]);

  return (
    <Flex direction={"column"} pt={2} pb={4} gap={4}>
      <Box mb={4} fontWeight="bold" fontSize="lg">
        <Text fontSize="16px">NOTIFICATIONS</Text>
      </Box>
      {notifications.length > 0
        ? notifications.map((notification) => (
            <Box
              key={notification.id}
              p={4}
              borderRadius="md"
              shadow="sm"
              bg={notification.is_read ? "gray.50" : "brand.50"}
              border="1px solid"
              borderColor={notification.is_read ? "gray.200" : "brand.300"}
            >
              <VStack align="start" spacing={1}>
                <Text color="#383838" pb={1}>
                  {notification.message}
                </Text>
                {!notification.is_read && (
                  <Badge
                    bgColor="brand.300"
                    variant="solid"
                    borderRadius="full"
                    px={2}
                  >
                    new
                  </Badge>
                )}
              </VStack>
            </Box>
          ))
        : "No new notifications at the moment."}
    </Flex>
  );
}
