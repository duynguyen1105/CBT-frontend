import {Box, TextInput} from '@mantine/core';
import {FC} from 'react';
import Text from 'views/components/base/Text';
import useStyle from './style';
import BadgeQuestion from '../base/BadgeQuestion';

const FillTheGap: FC = () => {
  const {classes} = useStyle({}, {name: 'QuestionComponent'});
  return (
    <Box mt={8}>
      <Text tt="uppercase" fz={16} fw={600}>
        HOLIDAYING IN GREECE
      </Text>
      <Box w="60%" p={8} sx={{border: '1px #000 solid'}}>
        <Text fz={14}>
          AIRPORT <br />• flying on British Airways <br />• departing Wednesday at{' '}
          <Box sx={{display: 'inline-flex', alignItems: 'flex-end', gap: 4}}>
            <BadgeQuestion title="4" variant="question" />
            <TextInput className={classes.inputFill} />
          </Box>
          <br />• must have all travel documents ready <br />• transport from Athens Airport by{' '}
          <br />
          CITY OF ATHENS <br />• hotel accommodation for{' '}
          <Box sx={{display: 'inline-flex', alignItems: 'flex-end', gap: 4}}>
            <BadgeQuestion title="5" variant="question" />
            <TextInput className={classes.inputFill} />
          </Box>{' '}
          nights <br />• visiting National Archaeological Museum <br />• dinner at Greek restaurant{' '}
          <br />• free time on{' '}
          <Box sx={{display: 'inline-flex', alignItems: 'flex-end', gap: 4}}>
            <BadgeQuestion title="6" variant="question" />
            <TextInput className={classes.inputFill} />
          </Box>{' '}
          evening <br />
          GREEK ISLANDS <br />• travel by{' '}
          <Box sx={{display: 'inline-flex', alignItems: 'flex-end', gap: 4}}>
            <BadgeQuestion title="7" variant="question" />
            <TextInput className={classes.inputFill} />
          </Box>{' '}
          <br />• slopping off at different islands <br />• experience{' '}
          <Box sx={{display: 'inline-flex', alignItems: 'flex-end', gap: 4}}>
            <BadgeQuestion title="8" variant="question" />
            <TextInput className={classes.inputFill} />
          </Box>{' '}
          on board
        </Text>
      </Box>
    </Box>
  );
};

export default FillTheGap;
