import {Grid, Image, ScrollArea, Textarea} from '@mantine/core';
import {FC} from 'react';
import Text from 'views/components/base/Text';
import BottomBar from '../../components/BottomBar';
import img from 'assets/images/writing-test.png';
import Button from 'views/components/base/Button';
import {IconArrowNarrowLeft, IconArrowNarrowRight} from '@tabler/icons-react';
import useStyle from './style';
import {useNavigate, useParams} from 'react-router';

const WritingTest: FC = () => {
  const navigate = useNavigate();
  const {test_id} = useParams();
  const {classes} = useStyle({}, {name: 'WritingTest'});

  const onChangePage = (type: 'next' | 'previous') => {
    type === 'next' && navigate(`/classes/make-test/${test_id}/speaking-test`);
    type === 'previous' && navigate(`/classes/make-test/${test_id}/reading-test`);
  };

  return (
    <Grid>
      <Grid.Col span={12} bg="#fff" sx={{borderRadius: 5}}>
        <Text ta="center" py={4} fz={18} fw={700}>
          GT Writing Test - Informal Letters
        </Text>
      </Grid.Col>

      <Grid.Col sx={{borderRadius: 5}} mt={8} span={12} bg="#fff">
        <Text fz={18}>Writing Part</Text>
        <Grid m={4} h="calc(100vh - 360px)">
          <Grid.Col p={0} span={6} h="100%" sx={{border: '1px solid #999'}}>
            <ScrollArea h="100%">
              <Text pl={4} pt={4} c="#FAAA5A" fw={700} fz={16}>
                Writing Test 1
              </Text>
              <Text pl={4} fs="italic" fz={13}>
                You should spend about 20 minutes on this task.
                <br /> The diagram gives information about the process of making carbonated drinks.
                <br />
                Summarize the information by selecting and reporting the main features, and make
                comparisons where relevant. <br />
                You should write at least 150 words.
              </Text>

              <Image className={classes.img} src={img}></Image>
            </ScrollArea>
          </Grid.Col>
          <Grid.Col h="100%" bg="#FEEEDE" span={6}>
            <Text fw={600}>Type your essay below and click Submit for evaluation</Text>
            <Text fz={14}>
              You have 20 minutes to complete Writing task 1. The timer will start when you start
              typing.
            </Text>

            <Textarea pb={0} p={18} autosize minRows={9} />
            <Text fz={14} pl={18}>
              Words Count: 0
            </Text>
          </Grid.Col>
        </Grid>
        <Grid.Col
          p={0}
          w="100%"
          mt={14}
          span={12}
          sx={{display: 'flex', justifyContent: 'space-between'}}
        >
          <Button onClick={() => onChangePage('previous')} leftIcon={<IconArrowNarrowLeft />}>
            Previous
          </Button>
          <Button onClick={() => onChangePage('next')} rightIcon={<IconArrowNarrowRight />}>
            Next
          </Button>
        </Grid.Col>
      </Grid.Col>

      <Grid.Col mt={12} span={12} p={0}>
        <BottomBar />
      </Grid.Col>
    </Grid>
  );
};

export default WritingTest;
