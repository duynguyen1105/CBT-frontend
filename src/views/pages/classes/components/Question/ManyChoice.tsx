import {Box, Checkbox} from '@mantine/core';
import {FC} from 'react';
import BadgeQuestion from '../base/BadgeQuestion';
import useStyle from './style';

const ManyChoice: FC = () => {
  const {classes} = useStyle({}, {name: 'QuestionComponent'});
  return (
    <Box>
      <Box sx={{display: 'flex', gap: 8, alignItems: 'center'}} my={4}>
        <BadgeQuestion title="A" variant="answer" />
        <Checkbox
          className={classes.radioManyChoice}
          label="getting in touch with the student union."
          value={'a'}
        />
      </Box>
      <Box sx={{display: 'flex', gap: 8, alignItems: 'center'}} my={4}>
        <BadgeQuestion title="A" variant="answer" />
        <Checkbox
          className={classes.radioManyChoice}
          label="getting in touch with the student union."
          value={'a'}
        />
      </Box>
      <Box sx={{display: 'flex', gap: 8, alignItems: 'center'}} my={4}>
        <BadgeQuestion title="A" variant="answer" />
        <Checkbox
          className={classes.radioManyChoice}
          label="getting in touch with the student union."
          value={'a'}
        />
      </Box>
      <Box sx={{display: 'flex', gap: 8, alignItems: 'center'}} my={4}>
        <BadgeQuestion title="A" variant="answer" />
        <Checkbox
          className={classes.radioManyChoice}
          label="getting in touch with the student union."
          value={'a'}
        />
      </Box>
      <Box sx={{display: 'flex', gap: 8, alignItems: 'center'}} my={4}>
        <BadgeQuestion title="A" variant="answer" />
        <Checkbox
          className={classes.radioManyChoice}
          label="getting in touch with the student union."
          value={'a'}
        />
      </Box>
      <Box sx={{display: 'flex', gap: 8, alignItems: 'center'}} my={4}>
        <BadgeQuestion title="A" variant="answer" />
        <Checkbox
          className={classes.radioManyChoice}
          label="getting in touch with the student union."
          value={'a'}
        />
      </Box>
      <Box sx={{display: 'flex', gap: 8, alignItems: 'center'}} my={4}>
        <BadgeQuestion title="A" variant="answer" />
        <Checkbox
          className={classes.radioManyChoice}
          label="getting in touch with the student union."
          value={'a'}
        />
      </Box>
      <Box sx={{display: 'flex', gap: 8, alignItems: 'center'}} my={4}>
        <BadgeQuestion title="A" variant="answer" />
        <Checkbox
          className={classes.radioManyChoice}
          label="getting in touch with the student union."
          value={'a'}
        />
      </Box>
    </Box>
  );
};

export default ManyChoice;
