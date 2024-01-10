import {
  Box,
  Group,
  Button,
  Stack,
  TextInput,
  Text,
  ActionIcon,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

function Prescriptions({ form }: { form: any }) {
  return (
    <Box>
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
              course: "",
            })
          }
        >
          Add
        </Button>
      </Group>
      <Stack gap={0}>
        {form.values.prescription.map((_med: object, i: number) => (
          <Group key={i} align="flex-end" justify="space-between">
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
              <TextInput
                label="Course"
                placeholder="Course"
                mt="md"
                {...form.getInputProps(`prescription.${i}.course`)}
              />
            </Group>

            <ActionIcon
              variant="light"
              color="red"
              onClick={() => form.removeListItem("prescription", i)}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        ))}
      </Stack>
    </Box>
  );
}

export default Prescriptions;
