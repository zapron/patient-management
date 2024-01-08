import { Box, Button, Group, Paper, Text } from "@mantine/core";
import React, { useState } from "react";
import Patientform from "./Patientform";

function VisitorType({ setViewerType }) {
  const [type, setType] = useState<string>();
  return (
    <>
      <Group align="center" justify="center" p={20}>
        <Button size="50px" onClick={() => setType("new")}>
          <Text style={{ padding: 10 }} size="30px">
            New Patient
          </Text>
        </Button>
        <Button size="50px" onClick={() => setType("old")}>
          <Text style={{ padding: 10 }} size="30px">
            Old Patient
          </Text>
        </Button>
      </Group>
      {type === "new" && (
        <Group justify="center">
          <Paper
            shadow="xl"
            radius="lg"
            p="xl"
            withBorder
            style={{ backgroundColor: "#e1d7fc", width: "70%" }}
          >
            <Patientform
              type={type}
              mode="add"
              setType={setType}
              setViewerType={setViewerType}
            />
          </Paper>
        </Group>
      )}
    </>
  );
}

export default VisitorType;
