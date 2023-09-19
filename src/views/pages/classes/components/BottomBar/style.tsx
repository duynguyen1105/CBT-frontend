import {createStyles} from '@mantine/core';

const useStyle = createStyles<string, {}>(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#1c7ed6',
    width: '100%',
    height: 52,
  },
  left: {
    display: 'flex',
    color: '#fff',
    alignItems: 'center',
    gap: 12,
    width: '33.33%',
    marginLeft: 12,
  },
  center: {
    display: 'flex',
    gap: 8,
    width: '33.33%',
    justifyContent: 'center',
  },
  right: {
    display: 'flex',
    gap: 8,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 12,
  },
  btn: {
    fontWeight: 400,
    background: '#fff',
    color: '#1c7ed6',
    width: 100,
    padding: '0 2px',
    '&:hover': {
      border: '1px solid #fff',
      color: '#fff',
    },
  },
}));

export default useStyle;
