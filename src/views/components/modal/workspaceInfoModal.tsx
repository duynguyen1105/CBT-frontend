import { Button, Group, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { WorkspaceType } from 'types/workspace';

type Props = {
  opened: boolean;
  workspaceData: WorkspaceType | null;
  onClose: () => void;
  onSubmit: (workspace: WorkspaceType) => void;
};

const defaultValues = {
  name: '',
  domain: '',
  email: '',
};

export const WorkspaceInfoModal = ({ opened, workspaceData, onClose, onSubmit }: Props) => {
  const isCreateWorkspaceModal = !workspaceData;

  const form = useForm<WorkspaceType>();

  useEffect(() => {
    if (workspaceData) {
      form.setValues(workspaceData);
    } else {
      form.setValues(defaultValues);
    }
  }, [workspaceData]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isCreateWorkspaceModal ? 'Create Workspace' : 'Workspace Information'}
      centered
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Workspace name"
          placeholder="Workspace name"
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          label="Workspace domain"
          placeholder="ws1"
          {...form.getInputProps('domain')}
        />
        {!workspaceData && (
          <TextInput
            withAsterisk
            label="Admin workspace email"
            placeholder="admin@ws1.com"
            disabled={!!workspaceData}
            {...form.getInputProps('email')}
          />
        )}
        <Group position="right" mt="md">
          <Button type="submit">{isCreateWorkspaceModal ? 'Create' : 'Update'}</Button>
        </Group>
      </form>
    </Modal>
  );
};
