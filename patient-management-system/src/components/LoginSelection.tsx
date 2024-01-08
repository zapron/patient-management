import { Box, Center, Group, Text } from "@mantine/core";
import classes from "./LoginSelection.module.css";
import { useState } from "react";

import VisitorType from "./VIsitorType";
import DoctorScreen from "./DoctorScreen";

function LoginSelection() {
  const [viewertype, setViewerType] = useState<string>("");
  return (
    <>
      {viewertype === "" && (
        <Group p="20px" gap="xl">
          {["Compounder", "Doctor"].map((item) => (
            <Box
              key={item}
              className={classes.loginSelection}
              onClick={() => setViewerType(item)}
            >
              <Center h="100%">
                <Text size="25px" style={{ fontWeight: "500" }}>
                  {item}
                </Text>
              </Center>
            </Box>
          ))}
        </Group>
      )}

      {viewertype === "Compounder" && (
        <VisitorType setViewerType={setViewerType} />
      )}
      {viewertype === "Doctor" && (
        <DoctorScreen setViewerType={setViewerType} />
      )}
    </>
  );
}

export default LoginSelection;
