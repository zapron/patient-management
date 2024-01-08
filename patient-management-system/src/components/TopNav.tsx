import { Box, Center, Text } from "@mantine/core";
function TopNav() {
  return (
    <Box>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "red",
          padding: 10,
        }}
        size="30px"
      >
        Patient Management System
      </Text>
    </Box>
  );
}

export default TopNav;
