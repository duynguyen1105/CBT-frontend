import { Box, Grid, ScrollArea, Text } from '@mantine/core';
import { FC } from 'react';
import Player from '../../components/Player';
import ButtonNotePad from '../../components/base/ButtonNotePad';
import InputDraft from '../../components/base/InputDraft';
import OneChoice from '../../components/Question/OneChoice';
import FillTheGap from '../../components/Question/FillTheGap';
import ManyChoice from '../../components/Question/ManyChoice';
import Button from 'views/components/base/Button';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import LeftBar from '../../components/LeftBar';
import { useNavigate, useParams } from 'react-router';

const ListeningTest: FC = () => {
  const navigate = useNavigate();
  const { test_id } = useParams();

  const onChangeReadingTest = (type: 'next' | 'previous') => {
    if (type === 'next') {
      navigate(`/classes/make-test/${test_id}/reading-test`);
    } else if (type === 'previous') {
      navigate(`/classes/make-test/${test_id}`);
    }
  };
  return (
    <Grid>
      <Grid.Col span={12} bg="#fff" sx={{ borderRadius: 5 }}>
        <Text ta="center" py={4} fz={18} fw={700}>
          GT Writing Test - Informal Letters
        </Text>
      </Grid.Col>

      <Grid.Col mt={12} span={9} pr={6}>
        <Box sx={{ borderRadius: 5 }} bg="#fff">
          <Text fw={600} p={12}>
            Listening Test Part 1
          </Text>
          <Box px={12}>
            <Player />
          </Box>

          <ScrollArea h="calc(100vh - 310px)">
            <Box p={14}>
              <>
                <Box sx={{ display: 'flex', gap: 24 }}>
                  <Text fz={16} fw={600}>
                    Question 1 - 3
                  </Text>
                  <ButtonNotePad />
                </Box>
                <InputDraft />

                <Text fz={14}>
                  Circle the correct letter, A, B, C or D.
                  <br /> Example
                  <br />
                  <span style={{ fontWeight: 600 }}>What is Thomas’s new home phone number?</span>
                  <br /> A 9731 4322 <br />B 9813 4562
                  <br /> <span style={{ fontWeight: 600 }}>(C) 9452 3456</span>
                  <br />D 9340 2367
                </Text>

                <OneChoice />
                <OneChoice />
                <OneChoice />
              </>

              <>
                <Box sx={{ display: 'flex', gap: 24 }}>
                  <Text fz={16} fw={600}>
                    Question 4 - 8
                  </Text>
                  <ButtonNotePad />
                </Box>
                <InputDraft />

                <Text fz={13} fs="italic">
                  Complete the notes below.
                </Text>
                <Text fz={13}>
                  Write
                  <span style={{ color: 'red' }}> NO MORE THAN THREE WORDS AND/OR A NUMBER </span>
                  for each answer.
                </Text>

                <FillTheGap />
              </>

              <>
                <Box mt={4} sx={{ display: 'flex', gap: 24 }}>
                  <Text fz={16} fw={600}>
                    Question 9 - 11
                  </Text>
                  <ButtonNotePad />
                </Box>
                <InputDraft />
                <Text fz={13} fs="italic">
                  Complete the notes below.
                </Text>
                <Text fz={13}>
                  Which
                  <span style={{ color: 'red' }}> THREE </span>
                  things does the speaker mention in relation to a postgraduate's financial
                  situation?
                </Text>

                <ManyChoice />
              </>

              <Box mt={24} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={() => onChangeReadingTest('previous')}
                  leftIcon={<IconArrowNarrowLeft />}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => onChangeReadingTest('next')}
                  rightIcon={<IconArrowNarrowRight />}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </ScrollArea>
        </Box>
      </Grid.Col>
      <Grid.Col mt={12} span={3} pl={6}>
        <LeftBar />
      </Grid.Col>
    </Grid>
  );
};

export default ListeningTest;
