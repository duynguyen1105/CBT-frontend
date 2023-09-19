import {createStyles} from '@mantine/core';

const useStyle = createStyles<string, {}>(() => ({
  root: {display: 'flex', gap: 28, alignItems: 'center'},
  titleWrap: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #999',
    borderRadius: '5px 0 0 5px',
    backgroundColor: '#37854D',
    justifyContent: 'space-around',
  },
  contentWrap: {
    border: '1px solid #999',
    borderRadius: '0 5px 5px 0',
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useStyle;
