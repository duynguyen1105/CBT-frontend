import { Button, Flex, Group, Modal, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendar } from '@tabler/icons-react';
import PageURL from 'apps/PageURL';
import { DATE_FORMAT } from 'apps/constants';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

type Props = {
  opened: boolean;
  onClose: () => void;
};

type ClassValues = {
  name: string;
  date_start: string;
  date_end: string;
};

export const CreateClassModal = ({ opened, onClose }: Props) => {
  const navigate = useNavigate();

  const form = useForm<ClassValues>({
    transformValues: (values) => ({
      name: values.name,
      date_start: dayjs(values.date_start).format(DATE_FORMAT),
      date_end: dayjs(values.date_start).format(DATE_FORMAT),
    }),
  });

  const handleSubmit = async (values: ClassValues) => {
    console.log({ values })
    navigate(PageURL.CREATE_CLASSES);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create Class" centered>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap="sm">
          <DateInput
            rightSection={<IconCalendar opacity={0.5} />}
            minDate={new Date()}
            valueFormat={DATE_FORMAT}
            label="Date start"
            placeholder="Date start"
            popoverProps={{ withinPortal: true }}
            {...form.getInputProps('date_start')}
          />
          <DateInput
            rightSection={<IconCalendar opacity={0.5} />}
            minDate={new Date()}
            valueFormat={DATE_FORMAT}
            label="Date end"
            placeholder="Date end"
            popoverProps={{ withinPortal: true }}
            {...form.getInputProps('date_end')}
          />
          <TextInput label="Class name" placeholder="Class name" {...form.getInputProps('name')} />
          <Group position="right" mt="md">
            <Button type="submit">Create</Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  );
};
