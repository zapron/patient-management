import React, { useEffect, useRef, useState } from "react";
import { getAllPatients } from "../utils/firestoreUtils";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
} from "@mantine/core";

import SelectedPatient from "./SelectedPatient";
import {
  IconCalendarTime,
  IconEye,
  IconPrinter,
  IconUserCheck,
} from "@tabler/icons-react";

import { useReactToPrint } from "react-to-print";
import PreviewPrintform from "./PreviewPrintForm";
import { PatientData } from "../types";

type Props = {
  setViewerType: React.Dispatch<React.SetStateAction<string>>;
};

function DoctorScreen({ setViewerType }: Props) {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [selected, setSelected] = useState<any>([]);
  const [printSelected, setPrintSelected] = useState<any>([]);
  const [previewSelected, setPreviewSelected] = useState<any>([]);

  useEffect(() => {
    async function getPatients() {
      try {
        setLoading(true);
        const patients = await getAllPatients();
        console.log(patients);
        setPatients(patients);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getPatients();
  }, []);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Group align="start" justify="center">
        {selected.length === 0 && (
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
                    <IconUserCheck size={16} color="green" />
                  ) : (
                    <IconCalendarTime size={16} color="orange" />
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
                    <IconEye color="maroon" size={18} />
                  </ActionIcon>

                  {pat.status && (
                    <ActionIcon
                      variant="transparent"
                      onClick={() => {
                        setPrintSelected([pat]);
                      }}
                    >
                      <IconPrinter size={16} />
                    </ActionIcon>
                  )}
                  <Button variant="gradient" onClick={() => setSelected([pat])}>
                    See Details
                  </Button>
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
    </>
  );
}

export default DoctorScreen;
