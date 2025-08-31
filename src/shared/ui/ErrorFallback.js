import { Box, Text, Button } from "@chakra-ui/react";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Box
      p={4}
      bg="red.50"
      border="1px solid"
      borderColor="red.200"
      borderRadius="md"
    >
      <Text fontWeight="bold" mb={2}>
        Something went wrong.
      </Text>
      <Text fontSize="sm" color="red.600" mb={3}>
        {error?.message || "Please try again."}
      </Text>
      <Button size="sm" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Box>
  );
}
