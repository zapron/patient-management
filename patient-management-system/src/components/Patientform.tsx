import {
  Box,
  Button,
  Group,
  NumberInput,
  Radio,
  Stack,
  Text,
  TextInput,
  Notification,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import DynamicFindings from "./DynamicFindings";
import dayjs from "dayjs";
import { DateInput } from "@mantine/dates";
import {
  addInfoToFirestore,
  updatePatientRecords,
} from "../utils/firestoreUtils";
import { update } from "firebase/database";

type Props = {
  type: string;
  init?: {
    pid: string;
    visit: number;
    name: string;
    age: string;
    sex: string;
    // dob: "",
    status: string;
    compounder: string;
    phn: string;
    doctor: string;
    prescription: {
      medicineName: string;
      dose: string;
    }[];
  };
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
    // dob: "",
    status: "Need Doctors Approval",
    compounder: "",
    phn: "",
    doctor: "",
    prescription: [
      {
        medicineName: "tab",
        dose: "twice",
      },
    ],
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
        value < 10 ? "You must be at least 10 to register" : null,
      sex: (value) => (value === "" ? "Please select a value" : null),
      phn: (value) =>
        value < 10000000000 && value >= 1000000000 ? null : "Enter valid phone",
    },
  });

  return (
    <Stack>
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
              <Text>PID: {form.values.pid}</Text>
              <Text style={{ fontWeight: "bold" }} color="green">
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

            {/* <DateInput
              // minDate={new Date()}
              maxDate={dayjs(new Date()).add(1, "month").toDate()}
              label="Date of Birth"
              placeholder="Date input"
              {...form.getInputProps("dob")}
            /> */}

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

            <TextInput
              label="Status"
              placeholder="Status"
              mt="md"
              {...form.getInputProps("status")}
            />
          </Stack>
        </Stack>
        <Stack my={20} gap={10}>
          <DynamicFindings
            form={form}
            type="compounder"
            label="Initial Findings"
            canEdit={type === "new" || type === "doctor"}
            initialContent={form.values.compounder}
          />
          {type === "doctor" && (
            <DynamicFindings
              canEdit={type === "doctor"}
              form={form}
              type="doctor"
              label="Doctor Findings"
              initialContent={form.values.doctor}
            />
          )}
          {/* {type === "doctor" && (
            <DynamicFindings
              form={form}
              type="prescription"
              label="Prescriptions"
              canEdit={type === "doctor"}
              initialContent={form.values.prescription}
            />
          )} */}
          <Group justify="space-between">
            <Text color="maroon" size="20px" style={{ fontWeight: "bold" }}>
              Prescriptions
            </Text>
            <Button
              color="green"
              onClick={() =>
                form.insertListItem("prescription", {
                  medicineName: "",
                  dose: "",
                })
              }
            >
              Add
            </Button>
          </Group>
          {form.values.prescription.map((med, i) => (
            <Stack gap={2}>
              <Group align="flex-end" justify="space-between">
                <Group justify="left">
                  <TextInput
                    label="Medicine"
                    placeholder="Medicine Name"
                    mt="md"
                    {...form.getInputProps(`prescription.${i}.medicineName`)}
                  />
                  <TextInput
                    label="Dose"
                    placeholder="Dose"
                    mt="md"
                    {...form.getInputProps(`prescription.${i}.dose`)}
                  />
                </Group>
                <Button
                  color="red"
                  onClick={() => form.removeListItem("prescription", i)}
                >
                  Remove
                </Button>
              </Group>
            </Stack>
          ))}
        </Stack>
        <Group justify="right">
          <Button
            type="submit"
            mt="sm"
            // onClick={() => {
            //   console.log(form.values);
            //   // addInfoToFirestore(form);
            // }}
          >
            Save
          </Button>
        </Group>
      </form>
    </Stack>
  );
}

export default Patientform;
