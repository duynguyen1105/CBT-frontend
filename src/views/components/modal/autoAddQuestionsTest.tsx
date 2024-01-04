import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Modal,
  MultiSelect,
  NumberInput,
  Text,
} from '@mantine/core';
import { IconCirclePlus, IconTrash } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import defaultTheme from 'apps/theme';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { forwardRef, useEffect, useState } from 'react';
import { QuestionType } from 'types/question';

type Props = {
  opened: boolean;
  onClose: () => void;
  onConfirm: (data: QuestionType[]) => void;
};

const { padding } = defaultTheme.layout;

type Option = {
  value: string;
  label: string;
  icon: JSX.Element;
  id: string;
};

type AutoGenOption = {
  categories: string[];
  labels: string[];
  number: number;
};

const defaultAutoGenOption: AutoGenOption = {
  categories: [],
  labels: [],
  number: 1,
};

export const AutoAddQuestionsTest = ({ opened, onClose, onConfirm }: Props) => {
  const { workspace } = useGetUserInfo();
  const [autoGenOptions, setAutoGenOptions] = useState<AutoGenOption[]>([defaultAutoGenOption]);

  const [listCategory, setListCategory] = useState<Option[]>([]);
  const [listLabel, setListLabel] = useState<Option[]>([]);

  useEffect(() => {
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
        setListCategory(newData);
      }
    };
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
        setListLabel(newData);
      }
    };
    fetchLabels();
    fetchCategories();
  }, []);

  const handleConfirm = async () => {
    // onConfirm(autoGenOptions as QuestionType[]);
    const listQuestions: QuestionType[] = [];
    for (const item of autoGenOptions) {
      const { categories, labels, number } = item;
      const res = await callApiWithAuth(
        getApiPath(PATHS.QUESTIONS.RECOMMEND_QUESTIONS, {
          workspaceName: workspace,
          category: categories.join(','),
          label: labels.join(','),
          size: number,
        }),
        'GET'
      );
      if (res.ok) {
        listQuestions.push(...res.data);
      }
    }
    onConfirm(listQuestions);
    onClose();
  };

  const SelectItem = forwardRef<HTMLDivElement, Option>(({ label, id, ...others }: Option, ref) => (
    <div>
      <Flex justify="space-center" align="center">
        <Text size="sm" w="80%" ref={ref} {...others}>
          {label}
        </Text>
      </Flex>
    </div>
  ));

  return (
    <Modal opened={opened} onClose={onClose} title="Auto add questions for test" size="xl">
      <Box pb={padding} h={500}>
        {autoGenOptions.map((item, index) => (
          <Flex gap="md" m="md" key={index}>
            <MultiSelect
              w="30%"
              label="Category"
              data={listCategory}
              itemComponent={SelectItem}
              placeholder="Select items"
              nothingFound="Nothing found"
              onChange={(value) => {
                const newData = [...autoGenOptions];
                newData[index].categories = value;
                setAutoGenOptions(newData);
              }}
              value={item.categories}
            />
            <MultiSelect
              w="30%"
              label="Label"
              data={listLabel}
              itemComponent={SelectItem}
              placeholder="Select items"
              nothingFound="Nothing found"
              onChange={(value) => {
                const newData = [...autoGenOptions];
                newData[index].labels = value;
                setAutoGenOptions(newData);
              }}
              value={item.labels}
            />
            <NumberInput
              defaultValue={5}
              placeholder="Number of questions"
              label="Number of questions"
              onChange={(value) => {
                const newData = [...autoGenOptions];
                newData[index].number = Number(value);
                setAutoGenOptions(newData);
              }}
              value={item.number}
            />
            <ActionIcon
              color="red"
              variant="light"
              mt="xl"
              onClick={() => {
                const newData = [...autoGenOptions];
                newData.splice(index, 1);
                setAutoGenOptions(newData);
              }}
            >
              <IconTrash size="1.125rem" />
            </ActionIcon>
          </Flex>
        ))}

        <Button
          mx="md"
          variant="outline"
          color="green"
          rightIcon={<IconCirclePlus strokeWidth={1.5} />}
          onClick={() => {
            const newOptions = [...autoGenOptions];
            newOptions.push({
              categories: [],
              labels: [],
              number: 1,
            });
            setAutoGenOptions(newOptions);
          }}
        >
          Add option
        </Button>
        <Flex justify="end">
          <Button
            color="blue"
            variant="light"
            onClick={() => {
              handleConfirm();
              // onClose();
            }}
          >
            Confirm
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
};
