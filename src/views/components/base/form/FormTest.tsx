import {
  Accordion,
  Box,
  Button,
  Center,
  Checkbox,
  Grid,
  Group,
  NumberInput,
  PasswordInput,
  Select,
  Stepper,
  TextInput,
  createStyles,
} from '@mantine/core';

import defaultTheme from 'apps/theme';
import {LayoutComponent} from 'types/layout';

import {DateTimePicker} from '@mantine/dates';
import {IconArrowRight, IconArticle, IconPageBreak, IconSettings} from '@tabler/icons-react';
import {useState} from 'react';
import Shell from 'views/layout/Shell';
import ModalAddTestContent from '../ModalAddTestContent';
import FormAddContentTest from './FormAddContentTest';

const {padding} = defaultTheme.layout;

const useStyle = createStyles<string, {}>(() => ({
  steps: {
    maxWidth: 500,
    margin: '0px auto 50px',
  },
}));

const FormTest: LayoutComponent = () => {
  const {classes} = useStyle({}, {name: 'FormTest'});
  const [active, setActive] = useState(0);
  const [whenDoingOptions, setWhenDoingOptions] = useState<string[]>([]);
  const [afterSubmit, setAfterSubmit] = useState<string[]>([]);
  const [afterTestClosed, setAfterTestClosed] = useState<string[]>([]);
  const nextStep = () => setActive((current) => (current < 1 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Box pb={padding}>
      <Grid justify="center">
        <Grid.Col>
          <Stepper active={active} onStepClick={setActive} classNames={{steps: classes.steps}}>
            <Stepper.Step label="Setting" icon={<IconSettings size="1.5rem" />}>
              <Accordion
                variant="separated"
                defaultValue={['general', 'time', 'score', 'display-options', 'security']}
                multiple
              >
                <Accordion.Item value="general">
                  <Accordion.Control>General</Accordion.Control>
                  <Accordion.Panel px={20}>
                    <TextInput label="Title" withAsterisk placeholder="Enter here..." />
                    <TextInput label="Description" placeholder="Enter here..." mt={10} />
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="time">
                  <Accordion.Control>Schedule</Accordion.Control>
                  <Accordion.Panel px={20}>
                    <Group align="center">
                      <DateTimePicker
                        label="Start time"
                        placeholder="Pick date and time"
                        miw={185}
                        mx="0"
                      />
                      <Center pt={25}>
                        <IconArrowRight strokeWidth={1} />
                      </Center>
                      <DateTimePicker
                        label="Finish time"
                        placeholder="Pick date and time"
                        miw={185}
                        mx="0"
                      />
                      <NumberInput label="Time Limit" ml={10} placeholder="1" />
                    </Group>
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="score">
                  <Accordion.Control>Score</Accordion.Control>
                  <Accordion.Panel px={20}>
                    <Group>
                      <NumberInput label="Maximum score" placeholder="0" />
                      <NumberInput label="Minimum score" placeholder="0" />
                      <NumberInput label="Submissions limit" placeholder="1" />
                      <Select
                        label="Score method"
                        placeholder="Pick one"
                        data={[
                          {value: 'hightest-score', label: 'Hightest score'},
                          {value: 'last-time', label: 'Last time'},
                          {value: 'average-score', label: 'Average score'},
                        ]}
                      />
                    </Group>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="display-options">
                  <Accordion.Control>Display Options</Accordion.Control>
                  <Accordion.Panel px={20}>
                    <Grid>
                      <Grid.Col span={4}>
                        <Checkbox.Group
                          label="When doing options"
                          value={whenDoingOptions}
                          onChange={setWhenDoingOptions}
                        >
                          <Checkbox mt={10} ml={10} value="answer" label="Answer" />
                          <Checkbox
                            mt={10}
                            ml={10}
                            value="feedback-of-correct-answer"
                            label="Feedback of correct answer"
                          />
                          <Checkbox
                            mt={10}
                            ml={10}
                            value="feedback-of-incorrect-answer"
                            label="Feedback of incorrect answer"
                          />
                          <Checkbox mt={10} ml={10} value="score" label="Score" />
                          <Checkbox mt={10} ml={10} value="take-note" label="Take note" />
                          <Checkbox
                            mt={10}
                            ml={10}
                            value="mark-question-to-review"
                            label="Mark question to review"
                          />
                        </Checkbox.Group>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Checkbox.Group
                          label="After submit"
                          value={afterSubmit}
                          onChange={setAfterSubmit}
                        >
                          <Checkbox mt={10} ml={10} value="answer" label="Answer" />
                          <Checkbox
                            mt={10}
                            ml={10}
                            value="feedback-of-correct-answer"
                            label="Feedback of correct answer"
                          />
                          <Checkbox
                            mt={10}
                            ml={10}
                            value="feedback-of-incorrect-answer"
                            label="Feedback of incorrect answer"
                          />
                          <Checkbox mt={10} ml={10} value="score" label="Score" />
                          <Checkbox mt={10} ml={10} value="test-review" label="Test review" />
                        </Checkbox.Group>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Checkbox.Group
                          label="After test closed"
                          value={afterTestClosed}
                          onChange={setAfterTestClosed}
                        >
                          <Checkbox mt={10} ml={10} value="answer" label="Answer" />
                          <Checkbox
                            mt={10}
                            ml={10}
                            value="feedback-of-correct-answer"
                            label="Feedback of correct answer"
                          />
                          <Checkbox
                            mt={10}
                            ml={10}
                            value="feedback-of-incorrect-answer"
                            label="Feedback of incorrect answer"
                          />
                          <Checkbox mt={10} ml={10} value="score" label="Score" />
                          <Checkbox mt={10} ml={10} value="test-review" label="Test review" />
                        </Checkbox.Group>
                      </Grid.Col>
                    </Grid>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="security">
                  <Accordion.Control>Security</Accordion.Control>
                  <Accordion.Panel px={20}>
                    <PasswordInput
                      label="Password"
                      type="password"
                      maw={200}
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Stepper.Step>
            <Stepper.Step label="Content" icon={<IconArticle size="1.5rem" />}>
              <FormAddContentTest />
              <Button rightIcon={<IconPageBreak />}>New Page</Button>
            </Stepper.Step>
          </Stepper>
        </Grid.Col>
      </Grid>
      <Group position="apart" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>{active === 1 ? 'Finish' : 'Next'}</Button>
      </Group>
    </Box>
  );
};

FormTest.layout = Shell;
FormTest.displayName = 'Page.FormTest';

export default FormTest;
