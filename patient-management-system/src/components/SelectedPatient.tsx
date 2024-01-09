import React from "react";
import Patientform from "./Patientform";
import { Paper } from "@mantine/core";
import { PatientData } from "../types";

type Props = {
  selected: PatientData;
  setViewerType: React.Dispatch<React.SetStateAction<string>>;
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
