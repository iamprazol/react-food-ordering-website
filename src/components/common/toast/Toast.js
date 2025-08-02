import { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from "@chakra-ui/react";

function Toast({ title, message, type }) {
  const [showToast, setShowToast] = useState(true);

  if (!showToast) return null;

  return (
    <Alert
      status={type === "success" ? "success" : "error"}
      variant="solid"
      borderRadius="md"
      alignItems="center"
      mb={4}
      position="relative"
      boxShadow="md"
    >
      <AlertIcon boxSize="1.8em" />
      <Box flex="1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription display="block">{message}</AlertDescription>
      </Box>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => setShowToast(false)}
      />
    </Alert>
  );
}

export default Toast;
