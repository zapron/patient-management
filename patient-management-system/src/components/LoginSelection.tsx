import { Box, Center, Group, Paper, Text } from "@mantine/core";
import classes from "./LoginSelection.module.css";
import { useState } from "react";

import VisitorType from "./VIsitorType";
import DoctorScreen from "./DoctorScreen";

function LoginSelection({ viewertype, setViewerType }) {
  return (
    <Box>
      {viewertype === "" && (
        <Group p="20px" gap="xl">
          {["Compounder", "Doctor"].map((item) => (
            <Paper
              withBorder
              shadow="xl"
              key={item}
              className={classes.loginSelection}
              onClick={() => setViewerType(item)}
            >
              <Center h="100%">
                <Text size="25px" style={{ fontWeight: "500" }}>
                  {item}
                </Text>
              </Center>
            </Paper>
          ))}
        </Group>
      )}

      {viewertype === "Compounder" && (
        <VisitorType setViewerType={setViewerType} />
      )}
      {viewertype === "Doctor" && (
        <DoctorScreen setViewerType={setViewerType} />
      )}
    </Box>
  );
}

export default LoginSelection;
