import {Accordion, ActionIcon, Box, Group, Radio, createStyles} from '@mantine/core';
import {IconBulb} from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import {useId, useState} from 'react';
import {LayoutComponent} from 'types/layout';
import {IQuestion, fakeSelectOne} from 'types/question';
import Text from '../base/Text';

const useStyle = createStyles<string, {}>(() => ({
  description: {
    color: 'teal',
  },
  radioCorrect: {
    borderColor: 'teal',
  },
}));

interface SelectOneProps {
  questionNo?: number;
  question?: IQuestion;
}
const SelectOne: LayoutComponent = (props: SelectOneProps) => {
  const {questionNo = 1, question = fakeSelectOne} = props;
  const [showFeedback, setShowFeedback] = useState(false);
  const {classes} = useStyle({}, {name: 'SelectOne'});
  const localId = useId();

  const questionContent = question?.content ?? 'Question content here...';
  const handleFeedback = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowFeedback(!showFeedback);
  };
  const sanitizedData = () => ({__html: DOMPurify.sanitize(questionContent)});
  return (
    <Accordion defaultValue={localId} miw={'100%'} variant="filled">
      <Accordion.Item value={localId}>
        <Accordion.Control>
          <Group>
            <Text size="md">{`Question ${questionNo} ${
              question?.title ? `: ${question?.title}` : ''
            }`}</Text>
            <ActionIcon color="blue" variant="light" onClick={handleFeedback}>
              <IconBulb size="1.125rem" />
            </ActionIcon>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <Box pl="sm" mt="sm">
            <div dangerouslySetInnerHTML={sanitizedData()} />
            <Radio.Group mt={'sm'}>
              {question?.answers.map((answer, index) => (
                <Radio
                  mt="sm"
                  value={`${answer.order}`}
                  label={answer.content}
                  error={showFeedback && !answer.right ? answer.feedback : null}
                  description={showFeedback && answer.right ? answer.feedback : null}
                  classNames={{
                    description: classes.description,
                    radio: showFeedback && answer.right ? classes.radioCorrect : '',
                  }}
                />
              ))}
            </Radio.Group>
          </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default SelectOne;
