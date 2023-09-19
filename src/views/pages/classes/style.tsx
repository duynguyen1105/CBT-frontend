import {createStyles} from '@mantine/core';

const useStyle = createStyles<string, {}>(() => ({
  input: {
    borderRadius: 10,

    '& >input': {
      height: '100%',
      borderRadius: 20,
      backgroundColor: '#EEF5F9',
      color: '#333333',
    },
  },
  itemDeleteCount: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 0,
    borderRadius: 6,
  },
}));

export default useStyle;
