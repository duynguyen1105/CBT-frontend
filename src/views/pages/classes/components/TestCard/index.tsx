import {Avatar, Box, Group, RingProgress, Text} from '@mantine/core';
import {FC} from 'react';
import useStyle from './style';
import Button from 'views/components/base/Button';
import {StatusClasses} from '../../util';
import {useNavigate} from 'react-router';

export interface TestCardProps {
  data: any;
}

const TestCard: FC<TestCardProps> = (props) => {
  const {data, ...rest} = props;
  const {classes} = useStyle({}, {name: 'TestCardComponent'});
  const navigate = useNavigate();
  const onChangeMakeTest = (id: string) => {
    navigate(`/classes/make-test/${id}`);
  };
  return (
    <Box {...rest} className={classes.root}>
      <Box w={130}>
        <Box
          className={classes.category}
          sx={{backgroundColor: data.type === StatusClasses.IN_PROGRESS ? '#37854D' : '#F9A95A'}}
        >
          <Text fz={14} fw={400} tt="uppercase" c="#fff">
            {data.category}
          </Text>
        </Box>
        <Box
          className={classes.dateTime}
          sx={{backgroundColor: data.type === StatusClasses.IN_PROGRESS ? '#CFEBD7' : '#FFEECE'}}
        >
          <Text fw={700}>{data.date}</Text>
          <Text fz={12} fw={400}>
            {data.time}
          </Text>

          {data.score && (
            <Group position="center">
              <RingProgress
                sx={{transform: 'rotate(180deg)'}}
                size={68}
                thickness={6}
                label={
                  <Box sx={{transform: 'rotate(180deg)'}}>
                    <Text
                      c={data.score > 5 ? '#3CE460' : '#E1000A'}
                      mx={12}
                      ta="center"
                      sx={{borderBottom: '1px solid #000'}}
                    >
                      {data.score}
                    </Text>
                    <Text ta="center">10</Text>
                  </Box>
                }
                sections={[{value: data.score * 10, color: data.score > 5 ? '#3CE460' : '#E1000A'}]}
              />
            </Group>
          )}
        </Box>
      </Box>
      <Box className={classes.content}>
        <Text fz={14} fw={700}>
          {data.title}
        </Text>

        <Box className={classes.userInfo}>
          <Avatar size={30} sx={{borderRadius: '50%'}} />
          <Box>
            <Text fw={600} fz={13}>
              {data.user.name}
            </Text>
            <Text fz={12}>{data.user.classes}</Text>
          </Box>
        </Box>

        <Box className={classes.control}>
          <Button onClick={() => onChangeMakeTest(data.id)} h={24}>
            Start
          </Button>
          <Button h={24} bg="transparent" variant="light">
            View Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TestCard;
