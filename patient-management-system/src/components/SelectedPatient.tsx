import React from "react";
import Patientform from "./Patientform";
import { Paper } from "@mantine/core";

type Props = {
  selected: any;
};

function SelectedPatient({ selected, setViewerType }: Props) {
  return (
    <Paper
      shadow="xl"
      radius="xl"
      p="xl"
      withBorder
      style={{ backgroundColor: "#cce6ff", width: "100%" }}
    >
      <Patientform
        type="doctor"
        init={selected}
        mode="update"
        setViewerType={setViewerType}
      />
    </Paper>
  );
}

export default SelectedPatient;
