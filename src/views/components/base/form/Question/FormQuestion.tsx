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
import { IQuestion, IQuestionAPI, QUESTION_TYPE } from 'types/question';

import { isNotEmpty } from '@mantine/form';
import { QUESTION_ELEMENT, QUESTION_ELEMENT_BY_TYPE } from 'apps/constants';
import { useEffect, useState } from 'react';
import { PreviewQuestionModal } from 'views/components/modal/previewQuestion';
import Shell from 'views/layout/Shell';
import QuestionCategory from './QuestionCategory';
import QuestionContentInput from './QuestionContentInput';
import { QuestionFormProvider, useQuestionForm } from './form-question-context';

const { padding } = defaultTheme.layout;

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
  const { content, onSaveQuestion } = props;

  const { classes } = useStyle({}, { name: 'QuestionForm' });
  const [type, setType] = useState<QUESTION_TYPE | undefined>();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const form = useQuestionForm({
    initialValues: {
      title: '',
      content: '',
      type: QUESTION_TYPE.SelectOne,
      active: 'N',
      level: 'normal',
      category_id: '',
      audio: null,
      answers: [
        {
          content: '',
          isCorrect: true,
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
          const totalScore = values.answers.reduce((prev, next) => {
            return prev + next.scorePercent;
          }, 0);

          if (totalScore !== 100) {
            return 'Total score percent must be 100%';
          } else if (value === 0) {
            return 'haha';
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
          isCorrect: ans.isCorrect,
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

  const handleChangeIsCorrect = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (form.values.type) {
      case QUESTION_TYPE.SelectOne:
        if (!event.currentTarget.checked) {
          return;
        } else {
          form.setFieldValue(`answers.${index}.isCorrect`, event.currentTarget.checked);
          form.setFieldValue(`answers.${index}.scorePercent`, 100);
          form.setFieldValue(`answers.${index}.penaltyScore`, 0);
          form.values.answers.forEach((ans, idx) => {
            if (idx !== index) {
              form.setFieldValue(`answers.${idx}.isCorrect`, false);
              form.setFieldValue(`answers.${idx}.scorePercent`, 0);
            }
          });
        }
        break;
      case QUESTION_TYPE.SelectMany:
        form.setFieldValue(`answers.${index}.isCorrect`, event.currentTarget.checked);
        break;
      default:
        break;
    }
  };

  const handleChangeType = (value: QUESTION_TYPE) => {
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
    console.log(values);
    // onSaveQuestion({ ...values, active: 'Y' });
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
                value: QUESTION_TYPE.SelectOne,
              },
              {
                label: (
                  <Center>
                    <IconSquareCheck strokeWidth={1.5} />
                    <Box ml={10}>Select Many</Box>
                  </Center>
                ),
                value: QUESTION_TYPE.SelectMany,
              },
              {
                label: (
                  <Center>
                    <IconArrowsShuffle strokeWidth={1.5} />
                    <Box ml={10}>Matching</Box>
                  </Center>
                ),
                value: QUESTION_TYPE.Matching,
              },
              {
                label: (
                  <Center>
                    <IconServer2 strokeWidth={1.5} />
                    <Box ml={10}>Dropdown Select</Box>
                  </Center>
                ),
                value: QUESTION_TYPE.DropdownSelect,
              },
              {
                label: (
                  <Center>
                    <IconForms strokeWidth={1.5} />
                    <Box ml={10}>Fill in the gaps</Box>
                  </Center>
                ),
                value: QUESTION_TYPE.FillInGap,
              },
              {
                label: (
                  <Center>
                    <IconPencil strokeWidth={1.5} />
                    <Box ml={10}>Essay</Box>
                  </Center>
                ),
                value: QUESTION_TYPE.Essay,
              },
              {
                label: (
                  <Center>
                    <IconMicrophone strokeWidth={1.5} />
                    <Box ml={10}>Record</Box>
                  </Center>
                ),
                value: QUESTION_TYPE.Record,
              },
            ]}
          />

          <Box mx="auto" mt="md">
            <Grid>
              {QUESTION_ELEMENT_BY_TYPE[form.values.type].includes(QUESTION_ELEMENT.TITLE) && (
                <Grid.Col span={10}>
                  <TextInput
                    label="Question Title"
                    placeholder="Insert question title here..."
                    radius="xs"
                    withAsterisk
                    {...form.getInputProps('title')}
                  />
                </Grid.Col>
              )}

              {QUESTION_ELEMENT_BY_TYPE[form.values.type].includes(QUESTION_ELEMENT.CATEGORY) && (
                <Grid.Col span={2}>
                  <QuestionCategory />
                </Grid.Col>
              )}

              {QUESTION_ELEMENT_BY_TYPE[form.values.type].includes(QUESTION_ELEMENT.AUDIO) && (
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
              )}

              {QUESTION_ELEMENT_BY_TYPE[form.values.type].includes(QUESTION_ELEMENT.CONTENT) && (
                <Grid.Col span={12}>
                  <QuestionContentInput label="Question Content" />
                </Grid.Col>
              )}

              {QUESTION_ELEMENT_BY_TYPE[form.values.type].includes(QUESTION_ELEMENT.ANSWER) && (
                <Grid.Col span={12}>
                  <Text size="sm">Answers</Text>
                  <Table withBorder withColumnBorders className={classes.answerTable}>
                    <thead>
                      <tr>
                        <th style={{ width: 50 }}>IND</th>
                        <th>
                          Answer Content
                          <span style={{ marginLeft: 5, color: 'red' }}>*</span>
                        </th>
                        <th>Feedback</th>
                        <th style={{ width: 100 }}>
                          Score<span style={{ marginLeft: 5, color: 'red' }}>*</span> (%)
                        </th>
                        <th style={{ width: 100 }}>Penalty Score (-%)</th>
                        <th style={{ width: 50 }}>Correct</th>
                        <th style={{ width: 30 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.values.answers.map((answer, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td style={{ textAlign: 'left' }}>
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
                              readOnly={form.values.type === QUESTION_TYPE.SelectOne}
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
                                {...form.getInputProps(`answers.${index}.isCorrect`, {
                                  type: 'checkbox',
                                })}
                                onChange={handleChangeIsCorrect(index)}
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
              )}
            </Grid>

            <Group position="right" mt="md">
              <Button
                variant="outline"
                rightIcon={<IconEye strokeWidth={1.5} />}
                onClick={() => setIsPreviewModalOpen(true)}
              >
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
      <PreviewQuestionModal
        opened={isPreviewModalOpen}
        data={form.values}
        onClose={() => setIsPreviewModalOpen(false)}
      />
    </Box>
  );
};

QuestionForm.layout = Shell;
QuestionForm.displayName = 'Page.QuestionForm';

export default QuestionForm;
