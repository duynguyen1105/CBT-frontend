import {createStyles} from '@mantine/core';

const useStyle = createStyles<string, {}>(() => ({
  root: {
    height: 'calc(100vh - 190px)',
    backgroundColor: '#fff',
    marginTop: 12,
    padding: '0px 12px 12px 12px',
  },
}));

export default useStyle;
