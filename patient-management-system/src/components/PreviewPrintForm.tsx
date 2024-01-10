import { Box, Group, Stack, Text, TextInput, Switch } from "@mantine/core";
import { PatientData } from "../types";

type Props = {
  init?: PatientData;
  mode: string;
};

function PreviewPrintform({
  init = {
    pid: `${Date.now()}`,
    visit: 1,
    first: "",
    last: "",
    age: "",
    sex: "",
    status: false,
    compounder: "",
    phn: "",
    doctor: "",
    prescription: [
      {
        medicineName: "",
        dose: "",
        course: "",
      },
    ],
  },
  mode,
}: Props) {
  return (
    <Stack aria-disabled={true}>
      <form>
        <Stack>
          <Group justify="space-between">
            <Text style={{ fontWeight: "bold" }}>Patient KYC</Text>
            <Group>
              <Switch
                disabled={mode !== "update"}
                labelPosition="left"
                label={init.status ? "Doctor Verified" : "Pending Doctor View"}
                checked={init.status}
                color="green"
              />
              <Text style={{ fontWeight: 500 }}>PID: {init.pid}</Text>
              <Text style={{ fontWeight: 500 }}>Visit: {init.visit}</Text>
            </Group>
          </Group>
          <Stack gap={10}>
            <Group gap={30}>
              <Group gap={4}>
                <Text style={{ fontWeight: 500 }}>First Name:</Text>
                {init.first && <Text>{init.first}</Text>}
              </Group>
              <Group gap={4}>
                <Text style={{ fontWeight: 500 }}>Last Name:</Text>
                {init.last && <Text>{init.last}</Text>}
              </Group>
              <Group gap={4}>
                <Text style={{ fontWeight: 500 }}>Age:</Text>
                {init.age && <Text>{init.age}</Text>}
              </Group>
              <Group gap={4}>
                <Text style={{ fontWeight: 500 }}>Sex:</Text>
                {init.sex && <Text>{init.sex}</Text>}
              </Group>
              <Group gap={4}>
                <Text style={{ fontWeight: 500 }}>Phone:</Text>
                {init.phn && <Text>{init.phn}</Text>}
              </Group>
            </Group>
          </Stack>
        </Stack>
        <Group my={20} gap={10} justify="space-between">
          <Group>
            <Text>Initial Findings:</Text>
            {init.compounder && (
              <Box
                p={10}
                style={{ border: "1px dashed black", borderRadius: 8 }}
                dangerouslySetInnerHTML={{ __html: init.compounder }}
              />
            )}
          </Group>
          <Group>
            <Text>Doctor Findings:</Text>
            {init.doctor && (
              <Box
                p={10}
                style={{ border: "1px dashed black", borderRadius: 8 }}
                dangerouslySetInnerHTML={{ __html: init.doctor }}
              />
            )}
          </Group>

          {init.prescription.length > 0 && (
            <Stack
              p={10}
              gap={0}
              mt={8}
              style={{
                border: "1px dashed black",
                width: "100%",
                borderRadius: 8,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Prescriptions</Text>
              {init?.prescription?.map((med) => (
                <Group
                  key={med.medicineName}
                  align="flex-end"
                  justify="space-between"
                >
                  <Group justify="left">
                    <TextInput
                      value={med.medicineName}
                      label="Medicine"
                      placeholder="Medicine Name"
                      mt="md"
                    />
                    <TextInput
                      value={med.dose}
                      label="Dose"
                      placeholder="Dose"
                      mt="md"
                    />

                    <TextInput
                      value={med.course}
                      label="Course"
                      placeholder="Course"
                      mt="md"
                    />
                  </Group>
                </Group>
              ))}
            </Stack>
          )}
        </Group>
      </form>
    </Stack>
  );
}

export default PreviewPrintform;
