import {createStyles} from '@mantine/core';

const useStyle = createStyles<string, {}>(() => ({
  root: {
    height: 'calc(100vh - 230px)',
    backgroundColor: '#fff',
    marginTop: 12,
    padding: '0px 12px 12px 12px',
  },
  inputDate: {
    display: 'flex',
    gap: 18,
    alignItems: 'center',
    color: '#999',
  },
  description: {
    marginTop: 12,
  },
}));

export default useStyle;
