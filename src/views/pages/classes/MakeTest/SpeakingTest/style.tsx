import {createStyles} from '@mantine/core';

const useStyle = createStyles<string, {}>(() => ({
  recordWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& .audio-recorder': {
      borderRadius: '50%',
      backgroundColor: '#fff',
      visibility: 'hidden',
    },
  },
}));

export default useStyle;
