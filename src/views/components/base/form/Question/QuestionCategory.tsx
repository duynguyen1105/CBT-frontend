import { ActionIcon, Flex, Select, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCirclePlus, IconTrash } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { forwardRef, useEffect, useState } from 'react';
import { useQuestionFormContext } from './form-question-context';

interface Option {
  value: string;
  label: string;
  icon: JSX.Element;
  id: string;
}
interface QuestionCategoryProps {}

const QuestionCategory = (props: QuestionCategoryProps) => {
  const { workspace } = useGetUserInfo();

  const [data, setData] = useState<Option[]>([]);
  const form = useQuestionFormContext();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.CATEGORIES.GET_LIST, { workspaceName: workspace }),
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

  const handleCreateCategory = (query: string) => {
    postCategory({ name: query }).then(() => {
      fetchCategories();
    });

    return null;
  };

  const handleDeleteCategory = async (id: string) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.CATEGORIES.DELETE, { workspaceName: workspace, id }),
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

  const postCategory = async (data: { name: string }) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.CATEGORIES.CREATE, { workspaceName: workspace }),
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
        <ActionIcon
          color="red"
          variant="light"
          mx={'auto'}
          onClick={() => handleDeleteCategory(id)}
        >
          <IconTrash size="1.125rem" />
        </ActionIcon>
      </Flex>
    </div>
  ));

  return (
    <Select
      label="Category"
      data={data}
      itemComponent={SelectItem}
      {...form.getInputProps('category')}
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
      onCreate={handleCreateCategory}
    />
  );
};

export default QuestionCategory;
