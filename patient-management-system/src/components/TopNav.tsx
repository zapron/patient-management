import { ActionIcon, Box, Center, Group, Text } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";

type Props = {
  setViewerType: React.Dispatch<React.SetStateAction<string>>;
};
function TopNav({ setViewerType }: Props) {
  return (
    <Group justify="space-between">
      <Box style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#b14aff",
            padding: 10,
          }}
          size="30px"
        >
          Patient Management System
        </Text>
      </Box>
      <ActionIcon
        onClick={() => setViewerType("")}
        color="red"
        variant="transparent"
        style={{ marginRight: 8 }}
      >
        <IconHome size={30} />
      </ActionIcon>
    </Group>
  );
}

export default TopNav;
