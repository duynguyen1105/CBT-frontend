import { ActionIcon, Flex, MultiSelect, Select, Text } from '@mantine/core';
import { IconCirclePlus, IconTrash } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { forwardRef, useEffect, useState } from 'react';
import { useQuestionFormContext } from './form-question-context';
import { useSelector } from 'store';
import { notifications } from '@mantine/notifications';

interface Option {
  value: string;
  label: string;
  icon: JSX.Element;
  id: string;
}
interface QuestionLabelProps {}

const QuestionLabel = (props: QuestionLabelProps) => {
  const { workspace } = useSelector((state) => state.app.userInfo);

  const [data, setData] = useState<Option[]>([]);
  const form = useQuestionFormContext();

  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async () => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.LABELS.GET_LIST, { workspaceName: workspace }),
      'GET'
    );

    if (res) {
      const newData = res.data.map(({ name, _id }: { name: string; _id: string }) => ({
        value: name,
        label: name,
        id: _id,
      }));
      setData(newData);
    }
  };

  const handleCreateLabel = (query: string) => {
    postLabel({ name: query }).then(() => {
      fetchLabels();
    });

    return null;
  };

  const handleDeleteLabel = async (id: string) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.LABELS.DELETE, { workspaceName: workspace, id }),
      'DELETE'
    );
    if (res.ok) {
      notifications.show({
        message: 'Delete questions successfully',
        color: 'green',
      });
    }
    const newData = data.filter(({ id: _id }) => _id !== id);
    setData(newData);
  };

  const postLabel = async (data: { name: string }) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.LABELS.CREATE, { workspaceName: workspace }),
      'POST',
      { data }
    );

    if (res) {
      return res.data;
    }
  };

  const SelectItem = forwardRef<HTMLDivElement, Option>(({ label, id, ...others }: Option, ref) => (
    <div>
      <Flex justify="space-center" align="center">
        <Text size="sm" w="80%" ref={ref} {...others}>
          {label}
        </Text>
        <ActionIcon color="red" variant="light" mx={'auto'} onClick={() => handleDeleteLabel(id)}>
          <IconTrash size="1.125rem" />
        </ActionIcon>
      </Flex>
    </div>
  ));

  return (
    <MultiSelect
      label="Label"
      data={data}
      itemComponent={SelectItem}
      {...form.getInputProps('label')}
      placeholder="Select items"
      nothingFound="Nothing found"
      searchable
      creatable
      getCreateLabel={(query) => (
        <Flex justify="space-center" align="center" gap="xs">
          <IconCirclePlus color="green" strokeWidth={1.5} />
          <Text size="sm" w="80%">
            {query}
          </Text>
        </Flex>
      )}
      onCreate={handleCreateLabel}
    />
  );
};

export default QuestionLabel;
