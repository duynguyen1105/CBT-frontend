import {Box, Radio} from '@mantine/core';
import {FC} from 'react';
import Text from 'views/components/base/Text';
import BadgeQuestion from '../base/BadgeQuestion';
import useStyle from './style';

const OneChoice: FC = () => {
  const {classes} = useStyle({}, {name: 'QuestionComponent'});
  return (
    <Box>
      <Box sx={{display: 'flex', lineHeight: 0, gap: 8}}>
        <BadgeQuestion title="1" variant="question" />
        <Text fz={14} fw={700} sx={{display: 'flex', alignItems: 'center'}}>
          How much will the evening cost?
        </Text>
      </Box>
      <Box pl={18}>
        <Radio.Group className={classes.radioCustom}>
          <Box className="answer">
            <BadgeQuestion title="A" variant="answer" />
            <Radio label="nothing" value="A"></Radio>
          </Box>
          <Box className="answer">
            <BadgeQuestion title="B" variant="answer" />
            <Radio label="nothing" value="B"></Radio>
          </Box>
          <Box className="answer">
            <BadgeQuestion title="C" variant="answer" />
            <Radio label="nothing" value="C"></Radio>
          </Box>
          <Box className="answer">
            <BadgeQuestion title="D" variant="answer" />
            <Radio label="nothing" value="D"></Radio>
          </Box>
        </Radio.Group>
      </Box>
    </Box>
  );
};

export default OneChoice;
