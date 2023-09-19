import {createStyles} from '@mantine/core';

const useStyle = createStyles<string, {}>(() => ({
  root: {
    height: 'calc(100vh - 200px)',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#1c7ed6',
    height: 58,
    width: '100%',
    lineHeight: 0,
    borderRadius: 5,
  },
  listQuestion: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    height: 40,
  },
  question: {
    display: 'flex',
    gap: 4,
    flexWrap: 'wrap',
    padding: 12,
    width: '100%',
  },
}));

export default useStyle;
