import { Center, Loader, Stack, Text } from "@mantine/core";
function DevInProgress() {
  return (
    <Stack>
      <Center style={{ height: "25vh" }}>
        <Stack>
          <Text color="orange" size="20px">
            Feature Coming Soon...
          </Text>
          <Loader type="bars" color="orange" style={{ alignSelf: "center" }} />
        </Stack>
      </Center>
    </Stack>
  );
}

export default DevInProgress;
