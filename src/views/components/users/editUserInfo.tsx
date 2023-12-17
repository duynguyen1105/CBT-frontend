import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Modal,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendar } from '@tabler/icons-react';
import { DATE_FORMAT } from 'apps/constants';

type UserValues = {
  name: string;
  birthday: Date;
  address: string;
  email: string;
  gender: string;
  role: {
    user: string[];
    test: string[];
    class: string[];
  };
};

const defaultValues = {
  name: '',
  birthday: new Date(),
  address: '',
  email: '',
  gender: '',
  role: {
    user: [],
    test: [],
    class: [],
  },
};

export const EditUserInfo = () => {
  const form = useForm<UserValues>({
    initialValues: defaultValues,
    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = (values: UserValues) => {};

  return (
    <Modal opened={true} onClose={() => null} title="User Information" centered size="xl">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Box>
          <Text weight="bold">User Information</Text>
          <Flex gap="lg" mt={12}>
            <TextInput
              w="30%"
              label="Full name"
              placeholder="Full name"
              {...form.getInputProps('name')}
            />
            <DateInput
              w="20%"
              rightSection={<IconCalendar />}
              maxDate={new Date()}
              valueFormat={DATE_FORMAT}
              label="Birthday"
              placeholder="Select Date"
              {...form.getInputProps('birthday')}
            />
            <TextInput
              w="50%"
              label="Address"
              placeholder="Address"
              {...form.getInputProps('address')}
            />
          </Flex>

          <Flex gap="lg" mt={12}>
            <TextInput w="30%" label="Email" placeholder="Email" {...form.getInputProps('email')} />
            <Select
              w="20%"
              data={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
              label="Gender"
              placeholder="Gender"
              {...form.getInputProps('gender')}
            />
            <DateInput
              w="20%"
              rightSection={<IconCalendar />}
              maxDate={new Date()}
              valueFormat={DATE_FORMAT}
              label="Birthday"
              placeholder="Select Date"
              {...form.getInputProps('dayJoined')}
            />
            <TextInput
              w="30%"
              label="Phone number"
              placeholder="Phone number"
              {...form.getInputProps('phone')}
            />
          </Flex>
        </Box>
        <Divider my={16} size="sm" />
        <Flex gap="lg" direction="row-reverse">
          <Box w="40%">
            <Text weight="bold">Role</Text>
            <Flex ml={12} direction="column" gap="sm">
              <Checkbox.Group
                label={<Text weight="bolder">User</Text>}
                {...form.getInputProps('role.user')}
              >
                <Flex direction="column" gap="xs" mt="xs">
                  <Checkbox value="add" label="Add user" />
                  <Checkbox value="delete" label="Delete user" />
                  <Checkbox value="change" label="Change user's information" />
                  <Checkbox value="view" label="View user information" />
                </Flex>
              </Checkbox.Group>
              <Checkbox.Group
                label={<Text weight="bolder">Test & Question</Text>}
                {...form.getInputProps('role.test')}
              >
                <Flex direction="column" gap="xs" mt="xs">
                  <Checkbox value="add" label="Add test & question" />
                  <Checkbox value="delete" label="Delete test & question" />
                  <Checkbox value="update" label="Update test & question" />
                </Flex>
              </Checkbox.Group>
              <Checkbox.Group
                label={<Text weight="bolder">User</Text>}
                {...form.getInputProps('role.class')}
              >
                <Flex direction="column" gap="xs" mt="xs">
                  <Checkbox value="create" label="Create class" />
                  <Checkbox value="delete" label="Delete class" />
                  <Checkbox value="add" label="Add user into class" />
                  <Checkbox value="remove" label="Remove user from class" />
                </Flex>
              </Checkbox.Group>
            </Flex>
          </Box>
        </Flex>

        <Group position="right" mt="md">
          <Button type="submit" disabled={!form.isDirty()}>
            Update
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
