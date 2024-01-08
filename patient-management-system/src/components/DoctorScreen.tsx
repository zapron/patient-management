import React, { useEffect, useState } from "react";
import { fetchPatientInfo } from "../utils/firestoreUtils";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import Patientform from "./Patientform";
import SelectedPatient from "./SelectedPatient";

function DoctorScreen({ setType, setViewerType }) {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<any>([]);
  const [selected, setSelected] = useState<any>();
  useEffect(() => {
    async function getPatients() {
      const patients = await fetchPatientInfo();
      console.log(patients);
      setPatients(patients);
    }
    getPatients();
  }, []);

  return (
    <Group align="start">
      <Box p={10} style={{ border: "1px solid red", borderRadius: 8, flex: 2 }}>
        <Stack gap={10} style={{ flexWrap: "nowrap" }}>
          {patients.map((pat) => (
            <Group justify="space-between" key={pat.id}>
              <Text>
                {pat.first} {pat.last}
              </Text>

              <Group>
                <Text color="orange">{pat.status}</Text>
                <Button onClick={() => setSelected(pat)}>See Details</Button>
              </Group>
            </Group>
          ))}
        </Stack>
      </Box>
      <Group justify="center" style={{ flex: 2 }}>
        {selected && (
          <SelectedPatient
            selected={selected}
            key={selected?.id}
            setViewerType={setViewerType}
          />
        )}
      </Group>
    </Group>
  );
}

export default DoctorScreen;
