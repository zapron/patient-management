import React, { useEffect, useRef, useState } from "react";
import { getAllPatients, getSearchPatient } from "../utils/firestoreUtils";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";

import SelectedPatient from "./SelectedPatient";
import {
  IconCalendarTime,
  IconEye,
  IconPrinter,
  IconSearch,
  IconUserCheck,
} from "@tabler/icons-react";

import { useReactToPrint } from "react-to-print";
import PreviewPrintform from "./PreviewPrintForm";
import { PatientData } from "../types";

function OldPatientScreen() {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [selected, setSelected] = useState<any>([]);
  const [printSelected, setPrintSelected] = useState<any>([]);
  const [previewSelected, setPreviewSelected] = useState<any>([]);
  const [value, setValue] = useState("");

  async function getPatients() {
    try {
      setLoading(true);
      const patients = await getSearchPatient(value);
      console.log(patients);
      setPatients(patients);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Stack gap={20}>
      <Group justify="center" mt={50}>
        <TextInput
          size="50px"
          styles={{
            input: {
              width: "60vw",
              border: "none",
              fontSize: 25,
              fontWeight: 500,
              color: "indigo",
              borderBottom: "1px solid gray",
              borderRadius: 0,
            },
          }}
          placeholder=" ENTER FIRSTNAME OR LASTNAME OR PID"
          width="40vw"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        <Button
          disabled={value === ""}
          size="md"
          color="teal"
          variant="filled"
          onClick={getPatients}
        >
          Search
        </Button>
      </Group>
      <Group justify="center">
        {patients.length > 0 ? (
          <Stack
            p={10}
            style={{ border: "1px solid blue", borderRadius: 8, width: "60%" }}
          >
            {patients.map((pat) => (
              <Group justify="space-between" key={pat.pid}>
                <Group>
                  <Text>
                    {pat.first} {pat.last}
                  </Text>
                  {pat.status ? (
                    <Tooltip label="Doctor verified">
                      <IconUserCheck size={16} color="green" />
                    </Tooltip>
                  ) : (
                    <Tooltip label="pending doctor approval">
                      <IconCalendarTime size={16} color="orange" />
                    </Tooltip>
                  )}
                </Group>

                <Group>
                  <ActionIcon
                    aria-label="Preview"
                    aria-labelledby="Preview"
                    variant="transparent"
                    color="indigo"
                    onClick={() => {
                      setPreviewSelected([pat]);
                    }}
                  >
                    <Tooltip label="Preview">
                      <IconEye color="maroon" size={18} />
                    </Tooltip>
                  </ActionIcon>

                  {pat.status ? (
                    <ActionIcon
                      variant="transparent"
                      onClick={() => {
                        setPrintSelected([pat]);
                      }}
                    >
                      <Tooltip label="Print">
                        <IconPrinter size={16} />
                      </Tooltip>
                    </ActionIcon>
                  ) : (
                    <ActionIcon style={{ visibility: "hidden" }} />
                  )}
                  {/* <Button variant="gradient" onClick={() => setSelected([pat])}>
                    See Details
                  </Button> */}
                </Group>
              </Group>
            ))}
            {loading && (
              <Loader
                style={{ alignSelf: "center" }}
                color="blue"
                type="dots"
              />
            )}
          </Stack>
        ) : (
          <Text
            style={{ textAlign: "center", width: "100%" }}
            color="gray"
            size="20px"
          >
            No Patients to show
          </Text>
        )}

        <Group justify="center" style={{ width: "60%" }}>
          {selected.length > 0 && (
            <SelectedPatient
              selected={selected[0]}
              key={selected[0]?.id}
              setViewerType={setViewerType}
            />
          )}
        </Group>
      </Group>
      {printSelected.length > 0 && (
        <Modal
          size="70vw"
          opened={printSelected.length > 0}
          onClose={() => {
            setPrintSelected([]);
          }}
          title="Print"
        >
          <Box
            ref={componentRef}
            style={{
              border: "1px dashed gray",
              borderRadius: 8,
            }}
            p={30}
            m={5}
          >
            <PreviewPrintform mode={"print"} init={printSelected[0]} />

            <Button onClick={handlePrint}>Print</Button>
          </Box>
        </Modal>
      )}
      {previewSelected.length > 0 && (
        <Modal
          size="70vw"
          opened={previewSelected.length > 0}
          onClose={() => {
            setPreviewSelected([]);
          }}
          title="Preview"
        >
          <Box
            ref={componentRef}
            style={{
              border: "1px dashed gray",
              borderRadius: 8,
            }}
            p={30}
            m={5}
          >
            <PreviewPrintform mode={"preview"} init={previewSelected[0]} />
          </Box>
        </Modal>
      )}
    </Stack>
  );
}

export default OldPatientScreen;
