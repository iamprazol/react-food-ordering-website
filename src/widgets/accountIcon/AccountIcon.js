import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import AccountDrawer from "./accountDrawer/accountDrawer";
import { useAuth } from "../../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

function AccountIcon({ onClick }) {
  const {
    state: { token },
  } = useAuth();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setUserData(null);
      return;
    }

    const abortController = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal: abortController.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const profile = json?.data ?? json;
        setUserData(profile);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching user:", err);
          setUserData(null);
        }
      } finally {
        if (!abortController.signal.aborted) setLoading(false);
      }
    })();

    return () => abortController.abort();
  }, [token]);

  if (userData) {
    return <AccountDrawer userData={userData} />;
  }

  return (
    <IconButton
      aria-label={loading ? "Loading account" : "Open login"}
      icon={<FaRegUser size={30} />}
      variant="ghost"
      fontSize="24px"
      color="brand.500"
      onClick={() => onClick?.("login")}
      isDisabled={loading}
      _hover={{ color: "brand.700" }}
    />
  );
}

export default AccountIcon;
