import {
  ActionIcon,
  Box,
  Center,
  Checkbox,
  FileInput,
  Grid,
  Group,
  Modal,
  NumberInput,
  SegmentedControl,
  Select,
  Table,
  TextInput,
  createStyles,
  rem,
} from '@mantine/core';
import {
  IconArrowsShuffle,
  IconBrandTelegram,
  IconCirclePlus,
  IconDeviceFloppy,
  IconEye,
  IconForms,
  IconMicrophone,
  IconPencil,
  IconPlaystationCircle,
  IconServer2,
  IconSquareCheck,
  IconTrash,
  IconUpload,
} from '@tabler/icons-react';

import Text from 'views/components/base/Text';
import Button from '../../Button';

import defaultTheme from 'apps/theme';
import {IQuestion, IQuestionAPI, QUESTIONTYPE} from 'types/question';

import {isNotEmpty} from '@mantine/form';
import {useEffect, useState} from 'react';
import Shell from 'views/layout/Shell';
import QuestionContentInput from './QuestionContentInput';
import {QuestionFormProvider, useQuestionForm} from './form-question-context';
import QuestionCategory from './QuestionCategory';

const {padding} = defaultTheme.layout;

const useStyle = createStyles<string, {}>(() => ({
  answerTable: {
    '& thead tr th, tbody tr td': {
      textAlign: 'center',
    },
  },
}));

interface QuestionFormProps {
  content?: IQuestionAPI;
  onSaveQuestion: (question: IQuestion) => Promise<void>;
}
const QuestionForm = (props: QuestionFormProps) => {
  const {content, onSaveQuestion} = props;

  const {classes} = useStyle({}, {name: 'QuestionForm'});
  const [type, setType] = useState<QUESTIONTYPE | undefined>();

  const form = useQuestionForm({
    initialValues: {
      title: '',
      content: '',
      type: QUESTIONTYPE.SelectOne,
      active: 'N',
      level: 'normal',
      category_id: '',
      audio: null,
      answers: [
        {
          content: '',
          right: true,
          order: 0,
          scorePercent: 100,
          penaltyScore: 0,
          feedback: '',
        },
      ],
    },
    validate: {
      title: isNotEmpty('Question title is required'),
      content: isNotEmpty('Question content is required'),
      answers: {
        content: isNotEmpty('Answer content is required'),
        scorePercent: (value, values, path) => {
          if (
            values.answers.reduce((prev, next) => {
              return prev + next.scorePercent;
            }, 0) !== 100
          ) {
            return 'Total score percent must be 100%';
          } else if (value === 0) {
          }
          return null;
        },
      },
    },
  });

  useEffect(() => {
    if (!!content) {
      const newQuestion = {
        ...content,
        answers: content.answers.map((ans) => ({
          ...ans,
          right: ans.right === 'Y' ? true : false,
        })),
      };
      form.setValues(newQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const handleRemoveAnswer = (index: number) => () => {
    form.removeListItem('answers', index);
  };

  const handleAddAnswer = () => {
    form.insertListItem('answers', {
      content: '',
      right: false,
      order: 0,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: '',
    });
  };

  const handleChangeRight = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (form.values.type) {
      case QUESTIONTYPE.SelectOne:
        if (!event.currentTarget.checked) {
          return;
        } else {
          form.setFieldValue(`answers.${index}.right`, event.currentTarget.checked);
          form.setFieldValue(`answers.${index}.scorePercent`, 100);
          form.setFieldValue(`answers.${index}.penaltyScore`, 0);
          form.values.answers.forEach((ans, idx) => {
            if (idx !== index) {
              form.setFieldValue(`answers.${idx}.right`, false);
              form.setFieldValue(`answers.${idx}.scorePercent`, 0);
            }
          });
        }
        break;
      case QUESTIONTYPE.SelectMany:
        form.setFieldValue(`answers.${index}.right`, event.currentTarget.checked);
        break;
      default:
        break;
    }
  };
  const handleChangeType = (value: QUESTIONTYPE) => {
    setType(value);
  };
  const handleAcceptChangeType = () => {
    if (type !== undefined) {
      form.reset();
      form.setFieldValue('type', type);
      setType(undefined);
    }
  };
  const handleSubmitQuestion = (values: IQuestion) => {
    onSaveQuestion({...values, active: 'Y'});
  };
  return (
    <Box pb={padding}>
      <QuestionFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmitQuestion)}>
          <Text size={'sm'}>Question Type</Text>
          <SegmentedControl
            {...form.getInputProps('type')}
            onChange={handleChangeType}
            color="teal"
            data={[
              {
                label: (
                  <Center>
                    <IconPlaystationCircle strokeWidth={1.5} />
                    <Box ml={10}>Select One</Box>
                  </Center>
                ),
                value: QUESTIONTYPE.SelectOne,
              },
              {
                label: (
                  <Center>
                    <IconSquareCheck strokeWidth={1.5} />
                    <Box ml={10}>Select Many</Box>
                  </Center>
                ),
                value: QUESTIONTYPE.SelectMany,
              },
              {
                label: (
                  <Center>
                    <IconArrowsShuffle strokeWidth={1.5} />
                    <Box ml={10}>Matching</Box>
                  </Center>
                ),
                value: QUESTIONTYPE.Matching,
              },
              {
                label: (
                  <Center>
                    <IconServer2 strokeWidth={1.5} />
                    <Box ml={10}>Dropdown Select</Box>
                  </Center>
                ),
                value: QUESTIONTYPE.Dropdown,
              },
              {
                label: (
                  <Center>
                    <IconForms strokeWidth={1.5} />
                    <Box ml={10}>Fill in the gaps</Box>
                  </Center>
                ),
                value: QUESTIONTYPE.FillInGap,
              },
              {
                label: (
                  <Center>
                    <IconPencil strokeWidth={1.5} />
                    <Box ml={10}>Essay</Box>
                  </Center>
                ),
                value: QUESTIONTYPE.Essay,
              },
              {
                label: (
                  <Center>
                    <IconMicrophone strokeWidth={1.5} />
                    <Box ml={10}>Record</Box>
                  </Center>
                ),
                value: QUESTIONTYPE.Record,
              },
            ]}
          />

          <Box mx="auto" mt="md">
            <Grid>
              <Grid.Col span={10}>
                <TextInput
                  label="Question Title"
                  placeholder="Insert question title here..."
                  radius="xs"
                  withAsterisk
                  {...form.getInputProps('title')}
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <QuestionCategory />
                {/* <Select
                  label="Category"
                  placeholder="Pick one"
                  data={[
                    {value: 'react', label: 'React'},
                    {value: 'ng', label: 'Angular'},
                    {value: 'svelte', label: 'Svelte'},
                    {value: 'vue', label: 'Vue'},
                  ]}
                  {...form.getInputProps('category_id')}
                /> */}
              </Grid.Col>
              <Grid.Col span={12}>
                <FileInput
                  placeholder="Upload file "
                  accept=".mp3"
                  label="Audio file (.mp3)"
                  clearable
                  radius={'xs'}
                  icon={<IconUpload size={rem(14)} />}
                  {...form.getInputProps('audio')}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <QuestionContentInput label="Question Content" />
              </Grid.Col>
              <Grid.Col span={12}>
                <Text size={'sm'}>Answers</Text>
                <Table withBorder withColumnBorders className={classes.answerTable}>
                  <thead>
                    <tr>
                      <th style={{width: 50}}>IND</th>
                      <th>
                        Answer Content
                        <span style={{marginLeft: 5, color: 'red'}}>*</span>
                      </th>
                      <th>Feedback</th>
                      <th style={{width: 100}}>
                        Score<span style={{marginLeft: 5, color: 'red'}}>*</span> (%)
                      </th>
                      <th style={{width: 100}}>Penalty Score (-%)</th>
                      <th style={{width: 50}}>Correct</th>
                      <th style={{width: 30}}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.values.answers.map((answer, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td style={{textAlign: 'left'}}>
                          <TextInput {...form.getInputProps(`answers.${index}.content`)} />
                        </td>
                        <td>
                          <TextInput {...form.getInputProps(`answers.${index}.feedback`)} />
                        </td>
                        <td>
                          <NumberInput
                            min={0}
                            max={100}
                            maw={80}
                            maxLength={3}
                            readOnly={form.values.type === QUESTIONTYPE.SelectOne}
                            {...form.getInputProps(`answers.${index}.scorePercent`)}
                          />
                        </td>
                        <td>
                          <NumberInput
                            min={0}
                            max={100}
                            maw={80}
                            maxLength={3}
                            {...form.getInputProps(`answers.${index}.penaltyScore`)}
                          />
                        </td>
                        <td>
                          <Center>
                            <Checkbox
                              // checked={form.values.answers[index].right}
                              {...form.getInputProps(`answers.${index}.right`, {type: 'checkbox'})}
                              onChange={handleChangeRight(index)}
                            />
                          </Center>
                        </td>
                        <td>
                          <ActionIcon
                            color="red"
                            variant="light"
                            mx={'auto'}
                            onClick={handleRemoveAnswer(index)}
                          >
                            <IconTrash size="1.125rem" />
                          </ActionIcon>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button
                  variant="outline"
                  mt={10}
                  color="green"
                  rightIcon={<IconCirclePlus strokeWidth={1.5} />}
                  onClick={handleAddAnswer}
                >
                  More Option
                </Button>
              </Grid.Col>
            </Grid>

            <Group position="right" mt="md">
              <Button variant="outline" rightIcon={<IconEye strokeWidth={1.5} />}>
                Preview
              </Button>
              <Button
                color="yellow"
                rightIcon={<IconDeviceFloppy strokeWidth={1.5} />}
                type="submit"
              >
                Save As Draft
              </Button>
              <Button rightIcon={<IconBrandTelegram strokeWidth={1.5} />}>Publish</Button>
            </Group>
          </Box>
        </form>
      </QuestionFormProvider>
      <Modal opened={!!type} onClose={() => setType(undefined)} centered padding="md" size="sm">
        <Text align="center" color="red">
          Change question type will delete all information of your question!!
        </Text>

        <Group mt="md" position="apart">
          <Button variant="outline" onClick={() => setType(undefined)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleAcceptChangeType}>
            Change
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};

QuestionForm.layout = Shell;
QuestionForm.displayName = 'Page.QuestionForm';

export default QuestionForm;
