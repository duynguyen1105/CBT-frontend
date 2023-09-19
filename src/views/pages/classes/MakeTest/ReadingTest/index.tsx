/* eslint-disable jsx-a11y/img-redundant-alt */
import {Box, Button, Grid, ScrollArea} from '@mantine/core';
import {IconArrowNarrowLeft, IconArrowNarrowRight} from '@tabler/icons-react';
import {FC, useState} from 'react';
import Text from 'views/components/base/Text';
import BottomBar from '../../components/BottomBar';
import TrueFalse from '../../components/Question/TrueFalse';
import ButtonNotePad from '../../components/base/ButtonNotePad';
import DropdownSelect from '../../components/Question/DropdownSelect';
import {DataReadingPart1, DataReadingPart2} from '../../util';
import Matching from '../../components/Question/Matching';
import {useNavigate, useParams} from 'react-router';

export enum ReadingPart {
  PART_1 = 'Part1',
  PART_2 = 'Part2',
}

const Content = (data: any) => {
  return (
    <>
      <Text p="8px 8px 0 8px" fw={700}>
        Reading Passage 1
      </Text>
      <Text px={8} fz={13}>
        You should spend about 20 minutes on Questions 1 -13, which are based on Reading Passage 1
        below.
      </Text>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <img src={data.image} alt="reading-image" />
      </Box>
      <Text fz={13} p={4}>
        {data.desc}
      </Text>
    </>
  );
};

const ReadingTest: FC = () => {
  const navigate = useNavigate();
  const {test_id} = useParams();
  const [readingPart, setReadingPart] = useState<ReadingPart>(ReadingPart.PART_1);
  const [data, setData] = useState(DataReadingPart1);

  const handleChangePage = (type: 'next' | 'previous') => {
    if (type === 'next') {
      if (readingPart === ReadingPart.PART_1) {
        setReadingPart(ReadingPart.PART_2);
        setData(DataReadingPart2);
      } else {
        navigate(`/classes/make-test/${test_id}/writing-test`);
      }
    } else if (type === 'previous') {
      if (readingPart === ReadingPart.PART_2) {
        setReadingPart(ReadingPart.PART_1);
        setData(DataReadingPart1);
      } else {
        navigate(`/classes/make-test/${test_id}/listening-test`);
      }
    }
  };
  return (
    <Grid>
      <Grid.Col span={12} bg="#fff" sx={{borderRadius: 5}}>
        <Text ta="center" py={4} fz={18} fw={700}>
          GT Writing Test - Informal Letters
        </Text>
      </Grid.Col>

      <Grid.Col p={8} mt={8} span={12} bg="#fff" sx={{borderRadius: 5}}>
        <Text fw={600}>{DataReadingPart1.title}</Text>
        <Grid mt={2} w="100%" h="calc(100vh - 315px)">
          <Grid.Col p={0} span={6} h="100%" w="100%" bg="#D7E6DC">
            <ScrollArea h="100%">{Content(data)}</ScrollArea>
          </Grid.Col>

          <Grid.Col span={6} h="100%" w="100%">
            <ScrollArea h="100%">
              {readingPart === ReadingPart.PART_1 ? (
                <>
                  <Box sx={{display: 'flex', gap: 12}}>
                    <Text fw={600}>Question 12-14</Text>
                    <ButtonNotePad />
                  </Box>
                  <Text fs="italic" fz={12}>
                    Do the following statements agree with the information given in Reading Passage
                    3? In boxes 36 - 40 on your answer sheet, write
                  </Text>

                  <Box p={18}>
                    <Box fw={400} sx={{border: '1px solid #999', display: 'flex'}}>
                      <Text tt="uppercase" fw={400} w="25%">
                        true
                      </Text>
                      <Text fz={14} fw={400}>
                        if the statement agrees with the information
                      </Text>
                    </Box>
                    <Box
                      fw={400}
                      bg="#EEEEEE"
                      sx={{
                        border: '1px solid #999',
                        display: 'flex',
                        borderBottom: 'none',
                        borderTop: 'none',
                      }}
                    >
                      <Text tt="uppercase" fw={400} w="25%">
                        false
                      </Text>
                      <Text fz={14} fw={400}>
                        if the statement contradicts the information
                      </Text>
                    </Box>
                    <Box fw={400} sx={{border: '1px solid #999', display: 'flex'}}>
                      <Text tt="uppercase" fw={400} w="25%">
                        not given
                      </Text>
                      <Text fz={14} fw={400}>
                        if there is no information on this
                      </Text>
                    </Box>
                  </Box>
                  <>
                    <TrueFalse
                      data={[
                        {value: 'true', label: 'True'},
                        {value: 'false', label: 'False'},
                        {value: 'notGiven', label: 'Not Given'},
                      ]}
                      content="Ganpat Jadhav’s monthly ration of kerosene was insufficient."
                      numberQuestion="12"
                    />
                    <TrueFalse
                      data={[
                        {value: 'true', label: 'True'},
                        {value: 'false', label: 'False'},
                        {value: 'notGiven', label: 'Not Given'},
                      ]}
                      content="Kerosene causes many fires in homes in developing countries."
                      numberQuestion="13"
                    />
                    <TrueFalse
                      data={[
                        {value: 'true', label: 'True'},
                        {value: 'false', label: 'False'},
                        {value: 'notGiven', label: 'Not Given'},
                      ]}
                      content="LED systems could solve the world’s energy problems."
                      numberQuestion="14"
                    />
                  </>
                  <Text fw={600}>Question 15 - 19</Text>
                  <Text fs="italic" fw={400} fz={12}>
                    Complete the following sentences using{' '}
                    <span style={{color: 'red'}}>NO MORE THAN THREE WORDS</span> from the text for
                    each gap.
                  </Text>

                  <DropdownSelect />
                </>
              ) : (
                <>
                  <Text fw={600}>Question 15 - 19</Text>
                  <Text fs="italic" fw={400} fz={12}>
                    Choose the correct answer and move it into gap
                  </Text>

                  <Matching />
                </>
              )}
            </ScrollArea>
          </Grid.Col>
        </Grid>

        <Grid.Col
          p={0}
          w="100%"
          mt={14}
          span={12}
          sx={{display: 'flex', justifyContent: 'space-between'}}
        >
          <Button onClick={() => handleChangePage('previous')} leftIcon={<IconArrowNarrowLeft />}>
            Previous
          </Button>
          <Button onClick={() => handleChangePage('next')} rightIcon={<IconArrowNarrowRight />}>
            Next
          </Button>
        </Grid.Col>
      </Grid.Col>

      <Grid.Col mt={8} span={12} p={0}>
        <BottomBar />
      </Grid.Col>
    </Grid>
  );
};

export default ReadingTest;
