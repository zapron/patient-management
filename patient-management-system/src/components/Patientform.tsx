import {
  Button,
  Group,
  NumberInput,
  Radio,
  Stack,
  Text,
  TextInput,
  Switch,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import DynamicFindings from "./DynamicFindings";

import {
  addInfoToFirestore,
  updatePatientRecords,
} from "../utils/firestoreUtils";

import Prescriptions from "./Prescriptions";
import { PatientData, PatientDataAPI } from "../types";

type Props = {
  type: string;
  init?: PatientData;
  mode: string;
  setViewerType: any;
};

function Patientform({
  type,
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
    prescription: [],
  },
  mode,
  setViewerType,
}: Props) {
  const form = useForm({
    initialValues: {
      ...init,
    },
    validate: {
      first: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      last: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      age: (value) =>
        parseInt(value) < 10 ? "You must be at least 10 to register" : null,
      sex: (value) => (value === "" ? "Please select a value" : null),
      phn: (value) =>
        parseInt(value) < 10000000000 && parseInt(value) >= 1000000000
          ? null
          : "Enter valid phone",
    },
  });

  return (
    <Stack aria-disabled={true}>
      <form
        onSubmit={form.onSubmit(() => {
          mode === "add"
            ? addInfoToFirestore(form)
            : updatePatientRecords(form, init?.id);
          setViewerType("");
        })}
      >
        <Stack>
          <Group justify="space-between">
            <Text color="maroon" style={{ fontWeight: "bold" }} size="20px">
              Patient KYC
            </Text>
            <Group>
              <Switch
                disabled={mode !== "update"}
                labelPosition="left"
                label={
                  form.values.status ? "Doctor Verified" : "Pending Doctor View"
                }
                checked={form.values.status}
                color="green"
                onChange={() =>
                  form.setFieldValue("status", !form.values.status)
                }
              />
              <Text>PID: {form.values.pid}</Text>
              <Text style={{ fontWeight: "500" }} color="green">
                Visit: {form.values.visit}
              </Text>
            </Group>
          </Group>
          <Stack gap={10}>
            <Group grow>
              <TextInput
                label="First Name"
                placeholder="first Name"
                {...form.getInputProps("first")}
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                {...form.getInputProps("last")}
              />
            </Group>

            <Group grow>
              <TextInput
                label="Age"
                placeholder="Enter Age"
                mt="md"
                {...form.getInputProps("age")}
              />

              <NumberInput
                label="Phn no"
                placeholder="Enter Phone no"
                max={9999999999}
                clampBehavior="strict"
                mt="md"
                {...form.getInputProps("phn")}
              />
            </Group>

            <Radio.Group name="sex" label="Sex" {...form.getInputProps("sex")}>
              <Group mt="xs">
                <Radio value="Male" label="Male" />
                <Radio value="Female" label="Female" />
                <Radio value="other" label="Other" />
              </Group>
            </Radio.Group>
          </Stack>
        </Stack>
        <Stack my={20} gap={10}>
          <DynamicFindings
            key="compounder"
            form={form}
            type="compounder"
            label="Initial Findings"
            canEdit={type === "new" || type === "doctor"}
            initialContent={form?.values?.compounder || ""}
          />

          {type === "doctor" && (
            <DynamicFindings
              key="doctor"
              canEdit={type === "doctor"}
              form={form}
              type="doctor"
              label="Doctor Findings"
              initialContent={form.values.doctor}
            />
          )}
          {type === "doctor" && <Prescriptions form={form} />}
        </Stack>
        <Group justify="right">
          {mode !== "print" && (
            <Button type="submit" mt="sm" disabled={!form.isDirty()}>
              Save
            </Button>
          )}
        </Group>
      </form>
    </Stack>
  );
}

export default Patientform;
