import {createStyles} from '@mantine/core';

const useStyle = createStyles<string, {}>(() => ({
  container: {
    marginBottom: 10,
    '& > div': {
      fontSize: 14,
    },
  },
  textTitle: {
    lineHeight: '17px',
    color: '#333333',
    fontSize: 14,
    paddingBottom: 9,
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
}));

export default useStyle;
