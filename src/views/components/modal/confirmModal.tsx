import { Button, Group, Modal, Text } from '@mantine/core';

type Props = {
  opened: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmModal = ({ opened, title, description, onClose, onConfirm }: Props) => {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Text size="md">{description}</Text>
      <Group position="right" mt="md">
        <Button variant="outline" onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="outline" color="red" onClick={onClose}>
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};
