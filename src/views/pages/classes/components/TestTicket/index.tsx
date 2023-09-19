import {Box, Text} from '@mantine/core';
import {IconArrowsMove, IconReceipt} from '@tabler/icons-react';
import {FC} from 'react';
import useStyle from './style';

export interface TestTicketProps {
  data: any;
}

const TestTicket: FC<TestTicketProps> = (props) => {
  const {data} = props;
  const {classes} = useStyle({}, {name: 'TestTicketComponent'});
  return (
    <Box mt={12} w="100%" h={31} className={classes.root}>
      <IconArrowsMove size={24} />
      <Box w="100%" h={31} sx={{display: 'flex'}}>
        <Box h="100%" w={100} c="#fff" className={classes.titleWrap}>
          <IconReceipt size={22} />
          <Text sx={{textTransform: 'uppercase', lineHeight: 0}} fz={14} fw={300}>
            {data.cate}
          </Text>
        </Box>
        <Box h="100%" w="100%" className={classes.contentWrap}>
          <Text fw={600} pl={24}>
            {data.title}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default TestTicket;
