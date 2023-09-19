import {useState, forwardRef, useEffect} from 'react';
import {Select} from '@mantine/core';
import {callApiWithAuth, getApiPath} from 'api/utils';
import {PATHS} from 'api/paths';
import {useQuestionFormContext} from './form-question-context';

interface Option {
  value: string;
  label: string;
}
interface QuestionCategoryProps {}

const QuestionCategory = (props: QuestionCategoryProps) => {
  const [data, setData] = useState<Option[]>([]);
  const form = useQuestionFormContext();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await callApiWithAuth(getApiPath(PATHS.QUESTIONS.CATEGORY), 'GET');

    if (res) {
      const newData = res.data.map((e: any) => ({value: e.id, label: e.name}));
      setData(newData);
    }
  };

  const handleCreateCategory = (query: string) => {
    // const item = {value: query, label: query};

    postCategory({name: query}).then((res) => {
      fetchCategories();
    });

    // setData((current) => [...current, item]);
    return null;
  };

  const postCategory = async (data: {name: string}) => {
    const res = await callApiWithAuth(getApiPath(PATHS.QUESTIONS.CATEGORY), 'POST', {data});

    if (res) {
      return res.data;
    }
  };

  return (
    <Select
      label="Category"
      data={data}
      {...form.getInputProps('category_id')}
      placeholder="Select items"
      nothingFound="Nothing found"
      searchable
      creatable
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={handleCreateCategory}
    />
  );
};

export default QuestionCategory;
