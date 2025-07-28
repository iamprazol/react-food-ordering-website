import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth-context";
import { FaRegUser } from "react-icons/fa";
import { Box, Flex, Image, Text, IconButton } from "@chakra-ui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import AccountDrawer from "./accountDrawer/accountDrawer";

function AccountIcon({ onClick }) {
  const { token } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (Object.keys(userData).length < 1) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  };
  return Object.keys(userData).length > 0 ? (
    <AccountDrawer userData={userData} />
  ) : (
    <IconButton
      aria-label="Open Cart"
      icon={<FaRegUser size={30} />}
      variant="ghost"
      fontSize="24px"
      color="brand.500"
      onClick={() => onClick("login")}
      _hover={{
        color: "brand.700",
      }}
    />
  );
}

export default AccountIcon;
