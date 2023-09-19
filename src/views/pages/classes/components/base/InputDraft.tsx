import {TextInput, createStyles} from '@mantine/core';
import {FC} from 'react';

const useStyle = createStyles<string, {}>(() => ({
  inputDraft: {
    width: '100%',
    margin: '8px 0',
    '& .mantine-TextInput-input': {
      height: 50,
      fontSize: 16,
      color: '#000',
      fontWeight: 400,
      border: '1px solid #999',
      backgroundColor: '#FAFAFA',
    },
  },
}));

const InputDraft: FC = (props) => {
  const {...rest} = props;
  const {classes} = useStyle({}, {name: 'InputDraft'});
  return <TextInput {...rest} placeholder="Your draft go here..." className={classes.inputDraft} />;
};

export default InputDraft;
