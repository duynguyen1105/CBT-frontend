import { Button, Group, Modal, MultiSelect, PasswordInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { UserType } from 'types/user';

type Props = {
  opened: boolean;
  userData: UserType | null;
  onClose: () => void;
  onSubmit: (user: UserType) => void;
};

const defaultValues = {
  name: '',
  email: '',
  gender: '',
  password: '',
  role: [],
};

export const UserInfoModal = ({ opened, userData, onClose, onSubmit }: Props) => {
  const isCreateUserModal = !userData;

  const form = useForm<UserType>({
    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  useEffect(() => {
    if (userData) {
      form.setValues(userData);
    } else {
      form.setValues(defaultValues);
    }
  }, [userData]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isCreateUserModal ? 'Create User' : 'User Information'}
      centered
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="User name"
          placeholder="User name"
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          label="User email"
          placeholder="user@email.com"
          {...form.getInputProps('email')}
        />
        {isCreateUserModal && (
          <PasswordInput
            placeholder="Password"
            label="Password"
            // description="Password must include at least one letter, number and special character"
            withAsterisk
            {...form.getInputProps('password')}
          />
        )}
        <Select
          data={[
            { value: 'MALE', label: 'Male' },
            { value: 'FEMALE', label: 'Female' },
          ]}
          label="Gender"
          placeholder="Gender"
          {...form.getInputProps('gender')}
        />
        <MultiSelect
          data={[
            { value: 'MALE', label: 'Male' },
            { value: 'FEMALE', label: 'Female' },
          ]}
          label="Role"
          placeholder="Role"
          {...form.getInputProps('role')}
        />
        <Group position="right" mt="md">
          <Button type="submit">{isCreateUserModal ? 'Create' : 'Update'}</Button>
        </Group>
      </form>
    </Modal>
  );
};
