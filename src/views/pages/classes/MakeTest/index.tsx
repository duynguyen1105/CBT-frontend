import {Box, Grid} from '@mantine/core';
import {IconHome2} from '@tabler/icons-react';
import PageURL from 'apps/PageURL';
import {FC} from 'react';
import Breadcrumb, {DataBreadcrumb} from 'views/components/base/Breadcrumb';
import Text from 'views/components/base/Text';
import useStyle from './style';
import Button from 'views/components/base/Button';
import {useNavigate, useParams} from 'react-router';
const breadcrumb: DataBreadcrumb[] = [
  {
    title: <IconHome2 color="#E1000A" size={24} />,
    href: '/',
  },
  {
    title: 'List',
    href: PageURL.CLASSES,
  },
  {
    title: 'IELTS Test 1',
    href: PageURL.CREATE_CLASSES,
  },
];
const MakeTest: FC = () => {
  const {classes} = useStyle({}, {name: 'MakeTest'});
  const navigate = useNavigate();
  const {test_id} = useParams();

  const onStartTest = () => {
    navigate(`/classes/make-test/${test_id}/listening-test`);
  };

  return (
    <Grid>
      <Grid.Col
        h="64px"
        w="100%"
        bg="#fff"
        span={12}
        sx={{display: 'flex', alignItems: 'center', borderRadius: 5}}
      >
        <Text pr={13} fz={20} fw={700} sx={{borderRight: '1px solid #CECECE'}}>
          My Classes
        </Text>

        <Breadcrumb data={breadcrumb} />
      </Grid.Col>

      <Grid.Col className={classes.root} mt={12} span={12} bg="#fff">
        <Text fz={20} fw={700} py={12} mx={36} ta="center" sx={{borderBottom: '1px solid #BDBDBD'}}>
          GT Writing Test - Informal Letters
        </Text>
        <Box lh={1.8}>
          <Text mt={24} mx={36} fz={17} fw={700} c="#666666">
            You should spend about 120 minutes on this test.
            <br /> The graphs below show the enrolments of overseas students and local students in
            Australian universities over a ten year period.
            <br />
            Summarise the information by selecting and reporting the main features, and make
            comparisons where relevant. You should write at least 150 words.
          </Text>
        </Box>
        <Box lh={1.8}>
          <Text ta="center" mt={24} mx={36} fz={17} fw={700} c="#000">
            Number of times to do: 2 <br />
            This test will finish at Satuday, 27 November 2021, 11:00 AM <br />
            Score method: Lastime
          </Text>
        </Box>
        <Box mt={24} sx={{display: 'flex', justifyContent: 'center'}}>
          <Button onClick={onStartTest} h={42} fz={16}>
            Begin The Test
          </Button>
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default MakeTest;
